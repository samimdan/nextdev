import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect } from "next/dist/server/api-utils";
import { FcGoogle } from "react-icons/fc";

export default function Socials() {
  return (
    <div className="flex flex-col items-center w-full">
      <Button
        variant={"outline"}
        className="flex gap-2"
        onClick={() => {
          signIn("google", { redirect: false, callbackUrl: "/" });
        }}
      >
        <p>Sign in with Google</p>
        <FcGoogle size={24} />
      </Button>
    </div>
  );
}
