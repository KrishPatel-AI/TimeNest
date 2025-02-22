"use client";

import { useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Search, Eye, Trash2, Edit } from "lucide-react";

const MyCapsules = () => {
  const [search, setSearch] = useState("");

  const capsules = [
    {
      id: 1,
      title: "Trip to Paris",
      content: "Amazing memories!",
      status: "Locked",
      unlockDate: "2025-12-25",
    },

    {
      id: 2,
      title: "Graduation Day",
      content: "Proud moment!",
      status: "Opened",
      unlockDate: "2024-01-01",
    },

    {
      id: 3,
      title: "Startup Launch",
      content: "Big milestone!",
      status: "Locked",
      unlockDate: "2026-06-15",
    },
  ];

  const filteredCapsules = capsules.filter((capsule) =>
    capsule.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Capsules</h1>

      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search capsules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />

        <Button variant="outline">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <Tabs defaultValue="locked">
        <TabsList>
          <TabsTrigger value="locked">Locked Capsules</TabsTrigger>

          <TabsTrigger value="opened">Opened Capsules</TabsTrigger>
        </TabsList>

        <TabsContent value="locked">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCapsules
              .filter((c) => c.status === "Locked")
              .map((capsule) => (
                <Card key={capsule.id}>
                  <CardHeader className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{capsule.title}</h2>

                    <Badge variant="destructive">Locked</Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Unlocks on {capsule.unlockDate}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="opened">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCapsules
              .filter((c) => c.status === "Opened")
              .map((capsule) => (
                <Card key={capsule.id}>
                  <CardHeader className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{capsule.title}</h2>

                    <Badge>Opened</Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Opened on {capsule.unlockDate}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>

                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCapsules;
