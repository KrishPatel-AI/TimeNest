"use client";

import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Calendar } from "lucide-react";
import { db, auth } from "@/lib/firebaseConfig"; // Ensure Firebase is properly configured
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ViewDialog from "@/components/ViewDialog";

const ViewCapsules = () => {
  const [user] = useAuthState(auth);
  const [capsules, setCapsules] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // Ensure user is logged in

    const fetchCapsules = async () => {
      try {
        const capsulesRef = collection(db, "capsules");

        // Query: Fetch capsules where the user is either the creator OR in sharedWith
        const q = query(
          capsulesRef,
          where("sharedWith", "array-contains", user.email)
        );

        const querySnapshot = await getDocs(q);
        let fetchedCapsules = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Also fetch capsules the user created
        const q2 = query(capsulesRef, where("userId", "==", user.uid));
        const querySnapshot2 = await getDocs(q2);
        const createdCapsules = querySnapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Merge both results and remove duplicates
        const uniqueCapsules = [...fetchedCapsules, ...createdCapsules].reduce(
          (acc, capsule) => {
            if (!acc.find(item => item.id === capsule.id)) {
              acc.push(capsule);
            }
            return acc;
          },
          []
        );

        setCapsules(uniqueCapsules);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching capsules:", error);
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [user]);

  if (loading) {
    return <p className="text-center">Loading capsules...</p>;
  }

  const filteredCapsules = capsules.filter(capsule =>
    capsule.title.toLowerCase().includes(search.toLowerCase())
  );

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
              <Badge variant={capsule.unlockDate > new Date().toISOString() ? "destructive" : "default"}>
                {capsule.unlockDate > new Date().toISOString() ? "Locked" : "Opened"}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{capsule.message}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Unlocks: {capsule.unlockDate}
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

      {/* ViewDialog Component */}
      <ViewDialog
        capsule={selectedCapsule}
        open={selectedCapsule !== null}
        onClose={() => setSelectedCapsule(null)}
      />
    </div>
  );
};

export default ViewCapsules;