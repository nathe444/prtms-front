import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
// import { useResetPasswordMutation } from "@/store/apis/staff/staffApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    token: location.state?.token || "",
  });

  const isLoading = true;
  console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await resetPassword(formData).unwrap();
      toast.success("Password reset successfully!", {
        icon: <CheckCircle className="text-teal-600" />,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 w-full">
      <Card className="w-full md:w-1/3 border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-teal-600 flex items-center">
            <Lock className="mr-2 h-6 w-6" />
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-600">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <Input type="hidden" name="token" value={formData.token} />

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 mt-6 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center text-white/90 gap-2">
                  <Loader2 className="animate-spin" />
                  Resetting...
                </span>
              ) : (
                <span className="flex items-center text-white/90 cursor-pointer">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Reset Password
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
