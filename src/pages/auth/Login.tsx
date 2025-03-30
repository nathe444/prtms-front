import { useState } from "react"
import { Lock, Mail, Eye, EyeOff, Stethoscope, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-teal-500/10 p-3">
                <Stethoscope className="h-8 w-8 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              የጤና መዝገብ | Health Records
            </h1>
            <p className="text-muted-foreground">
              ደህንነቱ የተጠበቀ የህክምና መረጃ ስርዓት | Secure Medical Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                  <Mail className="h-4 w-4 text-teal-600" />
                  ኢሜይል | Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-slate-700">
                  <Lock className="h-4 w-4 text-teal-600" />
                  የይለፍ ቃል | Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-200 focus:border-teal-500 focus:ring-teal-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-slate-200 text-teal-600 focus:ring-teal-500"
                  />
                  <Label htmlFor="remember" className="text-slate-600">አስታውሰኝ | Remember me</Label>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="px-0 text-sm text-teal-600 hover:text-teal-700"
                >
                  የይለፍ ቃል ረሳሁ | Forgot password?
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className={cn(
                "w-full bg-teal-600 hover:bg-teal-700",
                "transition-all duration-200 ease-in-out",
                "shadow-lg hover:shadow-xl hover:shadow-teal-100"
              )}
            >
              ግባ | Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-slate-600">
            መለያ የለዎትም? | Don't have an account?{" "}
            <Button 
              variant="link" 
              size="sm" 
              className="px-0 text-sm text-teal-600 hover:text-teal-700"
            >
              አስተዳዳሪውን ያግኙ | Contact administrator
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Image & Info */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-teal-600 to-teal-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-8 max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-12 w-12" />
              <div className="text-2xl font-semibold">የተጠበቀ የመረጃ ስርዓት | Secure System</div>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              የጤና መረጃዎ በደህንነት | Your Health Data, Protected
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-teal-50 leading-relaxed">
                በዘመናዊ የመረጃ ጥበቃ ስርዓት የታገዘ፣ ለኢትዮጵያ ሆስፒታሎችና ክሊኒኮች የተዘጋጀ።
                Modern secure platform designed for Ethiopian hospitals and clinics.
              </p>
              <ul className="space-y-3">
                {[
                  "የተሟላ የመረጃ ጥበቃ | Complete data protection",
                  "ባለሙያዎች ብቻ የሚደርሱበት | Authorized access only",
                  "24/7 የቴክኒክ ድጋፍ | 24/7 technical support",
                  "የተቀናጀ የመረጃ አያያዝ | Integrated record keeping"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-teal-50">
                    <div className="h-2 w-2 rounded-full bg-teal-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

