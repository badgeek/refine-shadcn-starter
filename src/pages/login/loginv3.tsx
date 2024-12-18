import { useLogin } from "@refinedev/core";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Login = () => {
  const { mutate: login } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    login({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <section className="grid w-full grid-cols-1 md:min-h-screen md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary px-4 py-12 text-primary-foreground">
        <div className="mx-auto grid w-full max-w-md gap-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-light tracking-tight leading-tight">You're one step away from your dream.</h1>
            <p className="text-lg opacity-90">A beautifully designed interface that is fine-tuned to get out of your way and make your work as fast as possible.</p>
          </div>
        </div>
      </div>
      <div className="order-first flex items-center justify-center px-4 py-12 md:order-last bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto grid w-full max-w-[400px] gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your details to continue</p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <Label className="text-sm font-medium leading-none" htmlFor="email">Email</Label>
              <Input 
                className="flex h-11 w-full rounded-lg border border-input/50 bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:border-input"
                required
                id="email"
                name="email"
                placeholder="demo@refine.dev"
                type="email"
                autoComplete="username"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium leading-none" htmlFor="password">Password</Label>
              <Input
                className="flex h-11 w-full rounded-lg border border-input/50 bg-background/50 px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:border-input"
                required
                id="password"
                name="password"
                placeholder="••••••••" 
                type="password"
                autoComplete="current-password"
              />
            </div>
            <Button className="inline-flex items-center justify-center h-11 rounded-lg bg-primary font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" type="submit">
              Sign in
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="inline-flex items-center justify-center gap-2 h-11 rounded-lg border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Google
            </Button>
          </form>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            <p>Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link></p>
            <Link to="/forgot-password" className="hover:text-foreground transition-colors">Forgot your password?</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
