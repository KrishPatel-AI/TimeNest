"use client";

import Link from "next/link";

import { ModeToggle } from "../components/ModeToggle";
import { Button } from "../components/ui/button";


export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-background border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
        
          <span className="text-xl font-bold text-foreground">
            Time Nest
          </span>
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
          <Link
            href="/register"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
          <Button className="bg-primary text-white text-sm font-medium px-6 py-2 rounded hover:bg-primary-dark transition">
            Get Started
          </Button>
        </Link>
        </div>
      </div>
    </header>
  );
}
