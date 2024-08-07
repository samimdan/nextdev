import { auth } from "@/auth";

import WhiteLogo from "@/public/whitelogo.svg"
import DarkLogo from "@/public/darklogo.svg"
import { LogIn } from "lucide-react";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useTheme } from "next-themes"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider } from "../provider/theme-provider";
import { resolve } from "path";
export default async function Nav({...pageProps}) {
  const session = await auth();

  return (
    <header className="py-8 px-4">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            
            <Link href="/" >
            <Image src={DarkLogo} 
              alt="logo"
              width={100}
              height={100} /></Link>
          </li>
          {!session ? (
            <li>
              <Button asChild>
                <Link href="/auth/login" className="flex gap-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton expires={session?.expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
