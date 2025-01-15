import SiteLogo from "@/components/SiteLogo";
import SocialAuth from "@/components/SocialAuth";
import registerImage from "@/assets/images/register-banner-image.jpg";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/auth-form/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src={registerImage}
          alt="banner image"
          width={600}
          height={1200}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <SiteLogo className="ml-auto" />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Login your account</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Fill all required fields to login your account
              </p>
            </div>
            <LoginForm />
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <SocialAuth />
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
