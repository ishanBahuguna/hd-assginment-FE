import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import { Loader } from "@/components/ui/loader";


const BACKEND_URL = import.meta.env.VITE_API_URL

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
        email: "",
        otp: "",
    });
    const [step, setStep] = useState<"form" | "otp">("form");
    const [loading, setLoading] = useState<boolean>(false);
    const [showOtp, setShowOtp] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleGetOtp = async () => {
        try {
            if (!formData.name || !formData.email || !formData.dateOfBirth) {
                toast({
                    title: "Missing Information",
                    description: "Please fill in all required fields.",
                    variant: "destructive",
                });
                return;
            }

            const response = await axios.post(
                `${BACKEND_URL}/user/otp`,
                formData
            );

            if (response.data.success) {
                setStep("otp");
                toast({
                    title: "OTP Sent",
                    description:
                        "We've sent a verification code to your email.",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Something went wrong.",
                    variant: "destructive",
                });
                return;
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const handleSignUp = async () => {
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
                `${BACKEND_URL}/user/signup`,
                formData
            );

            if (response.data.success) {
                setLoading(false);
                localStorage.setItem("token", response.data.token);
                toast({
                    title: "Account Created",
                    description:
                    "Welcome to HD! Your account has been created successfully.",
                });
                
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        } catch (error: any) {
               setLoading(false);
        if (error.response) {
            // Backend error
            toast({
                title: "Error",
                description: error.response.data.message || "Something went wrong.",
                variant: "destructive",
            });
        } else {
            // Network / unexpected error
            toast({
                title: "Error",
                description: "Unable to connect to server.",
                variant: "destructive",
            });
        }
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <AuthLayout>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        Sign up
                    </h1>
                    <p className="text-muted-foreground">
                        Sign up to enjoy the feature of HD
                    </p>
                </div>

                <div className="space-y-4">
                    <FormField
                        label="Your Name"
                        placeholder="Jonas Khanwald"
                        value={formData.name}
                        onChange={(value) => handleInputChange("name", value)}
                    />

                    <FormField
                        label="Date of Birth"
                        type="date"
                        placeholder="11 December 1997"
                        value={formData.dateOfBirth}
                        onChange={(value) =>
                            handleInputChange("dateOfBirth", value)
                        }
                    />

                    <FormField
                        label="Email"
                        type="email"
                        placeholder="jonas_kahnwald@gmail.com"
                        value={formData.email}
                        onChange={(value) => handleInputChange("email", value)}
                    />

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
                    onClick={step === "form" ? handleGetOtp : handleSignUp}
                >
                    {step === "form" ? "Get OTP" : "Sign up"}
                </Button>

                <div className="text-center">
                    <span className="text-muted-foreground">
                        Already have an account??{" "}
                    </span>
                    <Link
                        to="/signin"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
