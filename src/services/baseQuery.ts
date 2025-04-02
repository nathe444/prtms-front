import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { RootState } from "../store/store";
import { clearUser, setUser } from "../store/apis/auth/authSlice";


// Create a mutex to prevent multiple refresh token requests
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl : '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Wait if there's a refresh token request in progress
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    // Try to get a new token if we have a mutex lock
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        
        if (!refreshToken) {
          api.dispatch(clearUser());
          return result;
        }
        
        // Try to refresh the token
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        
        if (refreshResult.data) {
          // Type assertion to handle the response data
          const responseData = refreshResult.data as any;
          
          const userData = {
            staff: responseData.staff,
            access_token: responseData.access_token,
            refreshToken: responseData.refreshToken
          };
          
          // Store the new token
          api.dispatch(setUser(userData));
          
          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token failed - clear all auth data
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          api.dispatch(clearUser());
          window.location.href = '/login'; // Force redirect to login
        }
      } finally {
        // Release the mutex
        release();
      }
    } else {
      // Wait for the mutex to be released and try again
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  
  return result;
};