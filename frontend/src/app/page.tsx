import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideLock, LucideGlobe, LucideUsers, LucideShield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-6">
      
      <section className="text-center max-w-3xl mt-12">
        <h1 className="text-4xl font-bold">Preserve Your Memories with Digital Time Capsules</h1>
        <p className="text-lg text-muted-foreground mt-4">Create, store, and unlock digital memories at a future date, securely and collaboratively.</p>
        <Link href="/create_capsule">
         <Button className="mt-6">Create Your Capsule</Button>
        </Link>
      </section>

      
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <LucideLock size={40} className="text-primary" />
            <h3 className="text-lg font-semibold mt-4">Future Unlock</h3>
            <p className="text-muted-foreground">Set a date for your capsule to be revealed.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <LucideGlobe size={40} className="text-primary" />
            <h3 className="text-lg font-semibold mt-4">Global Sharing</h3>
            <p className="text-muted-foreground">Share memories with communities worldwide.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <LucideUsers size={40} className="text-primary" />
            <h3 className="text-lg font-semibold mt-4">Collaborative Capsules</h3>
            <p className="text-muted-foreground">Invite others to contribute to shared memories.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <LucideShield size={40} className="text-primary" />
            <h3 className="text-lg font-semibold mt-4">Secure & Private</h3>
            <p className="text-muted-foreground">End-to-end encryption for complete privacy.</p>
          </CardContent>
        </Card>
      </section>

      
      <section className="mt-16 max-w-5xl w-full">
        <h2 className="text-2xl font-bold text-center">Recent Public Capsules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">John's 2024 Reflections</h3>
              <p className="text-muted-foreground text-sm">Unlocks on Jan 1, 2026</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Festival Memories</h3>
              <p className="text-muted-foreground text-sm">Unlocks on Dec 25, 2030</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">Time Capsule for Future Me</h3>
              <p className="text-muted-foreground text-sm">Unlocks on May 15, 2040</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
