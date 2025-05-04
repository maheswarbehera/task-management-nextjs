"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react"; 
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotifyService } from "@/lib/shared/service/notifyService";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/UserService";

export function SignUpForm({ className, ...props }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = useNotifyService(); 
  const router = useRouter();

  useEffect(() => {
    document.title = "Sign up";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await UserService.UserSignup({
        email,
        username,
        password,
      });
      if(res.error) return notify.error(res.error)
      notify.success(res.message);
      notify.info("We are redirecting to login page, please login to continue");

      setTimeout(() => {
        router.push("/login");
      }, 2000); 
    } catch (error) {
      notify.error(error?.response?.data?.message || "Signup failed");
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Fill in the details below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form> 
        </CardContent>
      </Card>
    </div>
  );
}
