"use client"
import { cn } from "@/lib/utils" 
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotifyService } from "@/lib/shared/service/notifyService";
import { UserService } from "@/services/UserService";

export function LoginForm({
  className,
  ...props
}) {

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
const notify = useNotifyService();

  useEffect(() => {
    document.title = "Login"; 
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await UserService.UserLogin( { username, password });
      if(res.error) return notify.error(res.error) 
      login(res.data.accessToken); 
      notify.success(res.message)
    } catch (error) { 
      notify.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
    
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your Username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text"value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form> 
        </CardContent>
      </Card>
    </div>
  );
}
