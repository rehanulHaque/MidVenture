import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { loginAction } from "@/action/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth()
    if (session){
        redirect("/dashboard")
    }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Auth Card */}
      <div className="flex-1 flex items-center justify-center">
        <form className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6" action={loginAction}>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Sign in to your account</h2>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              className="bg-gray-100"
            />
            <Input
              type="password"
              placeholder="Password"
              className="bg-gray-100"
            />
          </div>
          <Button className="" disabled>
            Sign In
          </Button>
          <div className="flex items-center justify-center">
            or
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-base font-medium"
          >
            <Image src={"/google-logo.svg"} height={26} width={26} alt="Google Logo"/>
            Continue with Google
          </Button>
          <div className="text-xs text-gray-400 text-center">Email and password login is currently disabled.</div>
        </form>
      </div>
    </div>
  );
}