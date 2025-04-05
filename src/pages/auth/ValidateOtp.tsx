import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useValidateOtpMutation } from "@/store/apis/staff/staffApi";

const ValidateOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [validateOtp, { isLoading }] = useValidateOtpMutation();
  const [formData, setFormData] = useState({
    otp: "",
    token: location.state?.token || "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      token: location.state?.token || prev.token,
    }));
  }, [location.state?.token]);

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validateOtp(formData).unwrap();
      toast.success("OTP verified successfully!", {
        icon: <CheckCircle className="text-teal-600" />,
      });
      navigate("/reset-password", { state: { token: formData.token } });
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 w-full">
      <Card className="w-full md:w-1/3 border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-teal-600 flex items-center">
            <Lock className="mr-2 h-6 w-6" />
            Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-slate-600">
                Enter OTP
              </Label>
              <div className="relative">
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-teal-500"
                  placeholder="e.g. 784337"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <Input type="hidden" name="token" value={formData.token} />

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 mt-6 cursor-pointer text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="items-center flex gap-2 justify-center">
                  <Loader2 className="animate-spin" /> <span>Verifying</span>
                </div>
              ) : (
                <span className="flex items-center text-white/90 cursor-pointer">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify OTP
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidateOtp;
