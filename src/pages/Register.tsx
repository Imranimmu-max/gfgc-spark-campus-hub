
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    course: '',
    semester: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "Your account has been created. You can now sign in.",
      });
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
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
              Create an Account
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join the GFGC Chikkaballpur community
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) => handleSelectChange('course', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bcom">B.Com</SelectItem>
                      <SelectItem value="bsc-physics">B.Sc Physics</SelectItem>
                      <SelectItem value="bsc-chemistry">B.Sc Chemistry</SelectItem>
                      <SelectItem value="ba-english">B.A English</SelectItem>
                      <SelectItem value="ba-economics">B.A Economics</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) => handleSelectChange('semester', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
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
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center">
                  <UserPlus className="mr-2" size={18} />
                  Register
                </span>
              )}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-college-600 hover:text-college-500 dark:text-college-400 dark:hover:text-college-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Image & Content */}
      <div className="hidden md:block w-1/2 bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-college-600 to-college-800 opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Campus"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Campus+Image";
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Join Our Community</h2>
          <p className="text-lg text-center max-w-md">
            Register to become a part of our diverse academic community and access all student resources and facilities.
          </p>
          <div className="mt-8 space-y-4 max-w-md">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-college-600 font-bold text-sm">1</div>
              <p className="ml-3 text-sm">Create your student account with your personal details</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-college-600 font-bold text-sm">2</div>
              <p className="ml-3 text-sm">Verify your email address to activate your account</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 bg-white rounded-full flex items-center justify-center text-college-600 font-bold text-sm">3</div>
              <p className="ml-3 text-sm">Start accessing all student features and resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
