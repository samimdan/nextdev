import { auth } from "@/auth";
import Logo from "./logo";
import { LogIn } from "lucide-react";
import { UserButton } from "./user-button";
import Link from "next/link";
import { Button } from "../ui/button";
export default async function Nav() {
  const session = await auth();

  return (
    <header className="bg-slate-500 py-8 px-4">
      <nav>
        <ul className="flex justify-between">
          <li>logo</li>
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
