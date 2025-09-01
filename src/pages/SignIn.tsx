


import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";
import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_API_URL

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    });
    const [step, setStep] = useState<"form" | "otp">("form");
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Step 1: Send OTP
    const handleGetOtp = async () => {
        try {
            if (!formData.email) {
                toast({
                    title: "Missing Information",
                    description: "Please enter your email.",
                    variant: "destructive",
                });
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/user/otp`,
                { email: formData.email }
            );

            if (response.data.success) {
                setStep("otp");
                toast({
                    title: "OTP Sent",
                    description: "We've sent a verification code to your email.",
                });
            } else {
                toast({
                    title: "Error",
                    description: response.data.message || "Something went wrong.",
                    variant: "destructive",
                });
            }
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Server error",
                variant: "destructive",
            });
        }
    };

    // Step 2: Verify OTP + Sign In
    const handleSignIn = async () => {
        try {
            setLoading(true);
            if (!formData.otp) {
                setLoading(false);
                toast({
                    title: "OTP Required",
                    description: "Please enter the verification code.",
                    variant: "destructive",
                });
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/user/signin`,
                formData
            );

            setLoading(false);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                toast({
                    title: "Welcome Back",
                    description: "You have been signed in successfully.",
                });
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (error: any) {
            setLoading(false);
            toast({
                title: "Error",
                description:
                    error.response?.data?.message || "Unable to sign in.",
                variant: "destructive",
            });
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        Sign in
                    </h1>
                    <p className="text-muted-foreground">
                        Sign in with your email and OTP
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Email */}
                    <FormField
                        label="Email"
                        type="email"
                        placeholder="jonas_kahnwald@gmail.com"
                        value={formData.email}
                        onChange={(value) => handleInputChange("email", value)}
                    />

                    {/* OTP field only visible after step 1 */}
                    {step === "otp" && (
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">
                                OTP
                            </label>
                            <div className="relative">
                                <input
                                    type={showOtp ? "text" : "password"}
                                    placeholder="Enter verification code"
                                    value={formData.otp}
                                    onChange={(e) =>
                                        handleInputChange("otp", e.target.value)
                                    }
                                    className="w-full h-12 px-4 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOtp(!showOtp)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showOtp ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    variant="custom"
                    size="lg"
                    className="w-full h-12 text-base"
                    onClick={step === "form" ? handleGetOtp : handleSignIn}
                >
                    {step === "form" ? "Send OTP" : "Sign in"}
                </Button>

                <div className="text-center">
                    <span className="text-muted-foreground">
                        Don't have an account?{" "}
                    </span>
                    <Link
                        to="/signup"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignIn;




