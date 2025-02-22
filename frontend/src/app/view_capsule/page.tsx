"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Lock, Calendar, Share2 } from "lucide-react";

const ViewCapsules = () => {
  const [search, setSearch] = useState("");
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  // Sample data - would come from your API
  const capsules = [
    {
      id: 1,
      title: "Trip to Paris",
      content: "Amazing memories from our family trip to Paris! We visited the Eiffel Tower, enjoyed amazing French cuisine, and made unforgettable memories together.",
      status: "Locked",
      unlockDate: "2025-12-25",
      createdAt: "2024-02-15",
      mediaUrls: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      contributors: ["John Doe", "Jane Smith"],
      category: "Travel"
    },
    {
      id: 2,
      title: "Graduation Day",
      content: "Finally graduated from university! Four years of hard work paid off. The ceremony was beautiful and having all my family there made it extra special.",
      status: "Opened",
      unlockDate: "2024-01-01",
      createdAt: "2023-12-15",
      mediaUrls: ["/api/placeholder/400/300"],
      contributors: ["John Doe"],
      category: "Milestone"
    },
    {
      id: 3,
      title: "First Job",
      content: "Started my dream job at Tech Corp! The team is amazing and I'm learning so much already.",
      status: "Locked",
      unlockDate: "2026-06-15",
      createdAt: "2024-01-20",
      mediaUrls: ["/api/placeholder/400/300"],
      contributors: ["John Doe"],
      category: "Career"
    }
  ];

  const filteredCapsules = capsules.filter((capsule) =>
    capsule.title.toLowerCase().includes(search.toLowerCase())
  );

  const getDaysUntilUnlock = (unlockDate) => {
    const currentDate = new Date();
    const unlock = new Date(unlockDate);
    return Math.ceil((unlock - currentDate) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">View Capsules</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search capsules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCapsules.map((capsule) => (
          <Card key={capsule.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h2 className="font-semibold">{capsule.title}</h2>
              <Badge variant={capsule.status === "Locked" ? "destructive" : "default"}>
                {capsule.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{capsule.content}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {capsule.status === "Locked" ? `Unlocks: ${capsule.unlockDate}` : `Opened: ${capsule.unlockDate}`}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Badge variant="outline">{capsule.category}</Badge>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCapsule(capsule)}>
                <Eye className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={selectedCapsule !== null} onOpenChange={() => setSelectedCapsule(null)}>
        {selectedCapsule && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedCapsule.title}</span>
                <Badge variant={selectedCapsule.status === "Locked" ? "destructive" : "default"}>
                  {selectedCapsule.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Created: {selectedCapsule.createdAt}
                </div>
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  {selectedCapsule.status === "Locked" ? "Unlocks:" : "Opened:"} {selectedCapsule.unlockDate}
                </div>
              </div>

              {selectedCapsule.status === "Locked" ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h2 className="text-xl font-semibold mb-2">
                    This capsule is locked
                  </h2>
                  <p className="text-gray-500">
                    {getDaysUntilUnlock(selectedCapsule.unlockDate)} days until this capsule unlocks
                  </p>
                </div>
              ) : (
                <>
                  <div className="prose max-w-none">
                    <p>{selectedCapsule.content}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCapsule.mediaUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Capsule media ${index + 1}`}
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Contributors</h3>
                    <div className="flex gap-2">
                      {selectedCapsule.contributors.map((contributor, index) => (
                        <Badge key={index} variant="secondary">
                          {contributor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <Badge variant="outline">{selectedCapsule.category}</Badge>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ViewCapsules;