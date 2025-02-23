"use client";

import Link from "next/link";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { ModeToggle } from "../components/ModeToggle";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "../../public/logo.png";

export function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <header className="fixed top-0 left-0 w-full bg-background border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
        <Image
            src={logo} // Change to your actual logo path
            alt="Time Nest Logo"
            width={35}
            height={35}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-foreground">Time Nest</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Home
          </Link>

          <Link
            href="/create_capsule"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Create Capsule
          </Link>

          <Link
            href="/my_capsules"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            My Capsules
          </Link>

          <Link
            href="/view_capsule"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            View Capsule
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.photoURL || "/default-avatar.png"} alt="User Avatar" />
                  <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem disabled>{user.displayName || "User"}</DropdownMenuItem> */}
                <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={() => signOut(auth)}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/register">
              <Button className="bg-primary text-white text-sm font-medium px-6 py-2 rounded hover:bg-primary-dark transition">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
