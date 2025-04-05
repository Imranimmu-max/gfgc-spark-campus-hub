
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // For demo, we'll use a simple check
      if (email === 'student@example.com' && password === 'password') {
        toast({
          title: "Login successful!",
          description: "Welcome back to GFGC Chikkaballpur.",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-block">
              <img
                className="h-16 w-auto mx-auto"
                src="/college-logo.png"
                alt="GFGC Logo"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/64x64?text=GFGC";
                }}
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember-me" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-college-600 hover:text-college-500 dark:text-college-400 dark:hover:text-college-300">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-college-600 hover:bg-college-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2" size={18} />
                  Sign in
                </span>
              )}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-college-600 hover:text-college-500 dark:text-college-400 dark:hover:text-college-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Demo credentials:</p>
            <p>Email: student@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image & Content */}
      <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-college-800 to-college-600 opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Campus"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Campus+Image";
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Empowering Education</h2>
          <p className="text-lg text-center max-w-md">
            Login to access your student dashboard, course materials, and participate in campus activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
