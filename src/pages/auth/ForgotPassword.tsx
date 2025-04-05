import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/store/apis/staff/staffApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(formData);
      if (response.data && response.data.success == true) {
        toast.success("Password reset link sent to your email");
        navigate("/validate-otp", { state: response.data });
        return;
      }
      console.log(response);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 w-full">
      <Card className="w-full md:w-1/3 border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-teal-600">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-600">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            <Button
              type="submit"
              className={`text-white cursor-pointer w-full bg-teal-600 hover:bg-teal-700 mt-6 ${
                isLoading && `cursor-not-allowed`
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" /> <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
