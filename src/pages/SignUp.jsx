import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        toast.success('Registration successful! Please check your email to verify your account.', {
          duration: 5000,
          position: 'top-center',
        });
        
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen auth-page flex items-center justify-center bg-codGray-50 dark:bg-background-dark px-4 sm:px-6 lg:px-8">
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-md border-0 shadow-none dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl phone:text-xl tablet:text-xl laptop:text-xl desktop:text-xl text-codGray-900 dark:text-codGray-50 font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center text-codGray-900 dark:text-codGray-50">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs text-codGray-900 dark:text-codGray-50">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="pl-10 text-xs placeholder:text-xs placeholder:text-codGray-300 dark:placeholder:text-codGray-700 dark:text-codGray-50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs text-codGray-900 dark:text-codGray-50">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 text-xs placeholder:text-xs placeholder:text-codGray-300 dark:placeholder:text-codGray-700 dark:text-codGray-50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs text-codGray-900 dark:text-codGray-50">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 text-xs placeholder:text-xs placeholder:text-codGray-300 dark:placeholder:text-codGray-700 dark:text-codGray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs text-codGray-900 dark:text-codGray-50">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="pl-10 text-xs placeholder:text-xs placeholder:text-codGray-300 dark:placeholder:text-codGray-700 dark:text-codGray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-algaeGreen-400 hover:bg-algaeGreen-600 text-white text-xs dark:bg-algaeGreen-400 dark:text-black dark:hover:bg-gray-200"
            >
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center text-xs text-codGray-900 dark:text-codGray-50">
              Already have an account?{' '}
              <a href="/signin" className="text-codGray-500 dark:text-codGray-200 hover:text-codGray-900 dark:hover:text-codGray-200">
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp; 