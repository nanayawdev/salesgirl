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
import { ArrowRight, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast, Toaster } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset instructions sent to your email!');
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
            Reset password
          </CardTitle>
          <CardDescription className="text-center text-codGray-900 dark:text-codGray-50">
            Enter your email address and we'll send you a link to reset your password
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 text-xs placeholder:text-xs placeholder:text-codGray-300 dark:placeholder:text-codGray-700 dark:text-codGray-50"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-algaeGreen-400 hover:bg-algaeGreen-600 text-white text-xs dark:bg-algaeGreen-400 dark:text-black dark:hover:bg-gray-200"
            >
              Send reset link
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center text-xs text-codGray-900 dark:text-codGray-50">
              <a href="/signin" className="text-codGray-500 dark:text-codGray-200 hover:text-codGray-900 dark:hover:text-codGray-200">
                Back to sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword; 