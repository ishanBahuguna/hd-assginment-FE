


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import fluidBg from "@/assets/fluid-bg.png";
import logo from "@/assets/logo.png";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
                {/* Logo aligned left */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Right side nav/actions */}
                <nav className="flex items-center gap-4">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Button variant="custom">Sign In</Button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Section */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                    Welcome to{" "}
                                    <span className="bg-primary bg-clip-text text-transparent">
                                        HD
                                    </span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Write today, remember tomorrow.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup">
                                    <Button
                                        variant="custom"
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-8"
                                    >
                                        Signup
                                    </Button>
                                </Link>
                                <Link to="/signin">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-8"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>Secure & Reliable</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative order-1 lg:order-2">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-form">
                                <img
                                    src={fluidBg}
                                    alt="HD Platform Preview"
                                    className="w-full h-96 lg:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-deep/20 via-transparent to-blue-bright/20" />
                            </div>
                            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-button opacity-20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                            Why Choose HD?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover the features that make HD the preferred
                            choice for modern users
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Lightning Fast",
                                description:
                                    "Experience blazing fast performance with our optimized infrastructure",
                            },
                            {
                                title: "Secure by Design",
                                description:
                                    "Your data is protected with enterprise-grade security measures",
                            },
                            {
                                title: "Always Available",
                                description:
                                    "99.9% uptime guarantee with 24/7 monitoring and support",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-card p-8 rounded-xl shadow-soft border border-border hover:shadow-form transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center mb-6">
                                    <div className="w-6 h-6 bg-primary-foreground rounded"></div>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-fluid rounded-2xl p-12 text-center text-primary-foreground shadow-form">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                            Join the HD community today and experience the
                            difference
                        </p>
                        <Link to="/signup">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="text-base px-8"
                            >
                                Create Your Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Index;
