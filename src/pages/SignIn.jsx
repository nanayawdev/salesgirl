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
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success('Successfully signed in!');
      navigate('/create-invoice');
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen auth-page flex items-center justify-center bg-codGray-50 dark:bg-background-dark px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" richColors />
      <Card className="w-full max-w-md border-0 shadow-none dark:bg-background-dark">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl phone:text-xl tablet:text-xl laptop:text-xl desktop:text-xl text-codGray-900 dark:text-codGray-50 font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-codGray-900 dark:text-codGray-50">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <Label htmlFor="remember" className="text-xs text-codGray-900 dark:text-codGray-50 font-normal">
                Remember me for 30 days
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-algaeGreen-400 hover:bg-algaeGreen-600 text-white text-xs dark:bg-algaeGreen-400 dark:text-black dark:hover:bg-gray-200"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center text-xs">
              <a href="/forgot-password" className="text-codGray-500 dark:text-codGray-200 hover:text-codGray-900 dark:hover:text-codGray-200">
                Forgot password?
              </a>
            </div>
            <div className="text-center text-xs text-codGray-900 dark:text-codGray-50">
              Don't have an account?{' '}
              <a href="/signup" className="text-codGray-500 dark:text-codGray-200 hover:text-codGray-900 dark:hover:text-codGray-200">
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn; 