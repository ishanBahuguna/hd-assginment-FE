import React from 'react';
import fluidBg from '@/assets/fluid-bg.png';
import logo from '@/assets/logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

 const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="HD Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {children}
        </div>
      </div>

      {/* Right side - Fluid Background - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden lg:min-h-screen">
        <div 
          className="absolute inset-0 bg-gradient-fluid"
          style={{
            backgroundImage: `url(${fluidBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-deep/80 via-blue-dark/60 to-blue-bright/40" />
      </div>
    </div>
  );
};

export default AuthLayout;
