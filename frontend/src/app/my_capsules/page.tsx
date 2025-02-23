"use client";

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

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const MyCapsules = () => {
  const [search, setSearch] = useState("");
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.uid;
      const q = query(
        collection(db, "capsules"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const userCapsules = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCapsules(userCapsules);
      setLoading(false);
    };
    fetchCapsules();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this capsule?")) return;
    try {
      await deleteDoc(doc(db, "capsules", id));
      setCapsules(capsules.filter((capsule) => capsule.id !== id));
    } catch (error) {
      console.error("Error deleting capsule:", error);
    }
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tabs defaultValue="locked">
          <TabsList>
            <TabsTrigger value="locked">Locked Capsules</TabsTrigger>

            <TabsTrigger value="opened">Opened Capsules</TabsTrigger>
          </TabsList>

          <TabsContent value="locked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCapsules
                .filter((c) => new Date(c.unlockDate) > new Date())
                .map((capsule) => (
                  <Card key={capsule.id}>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{capsule.title}</h2>
                      <Badge variant="destructive">Locked</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Unlocks on {new Date(capsule.unlockDate).toDateString()}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(capsule.id)}
                      >
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
                .filter((c) => new Date(c.unlockDate) <= new Date())
                .map((capsule) => (
                  <Card key={capsule.id}>
                    <CardHeader className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{capsule.title}</h2>
                      <Badge>Opened</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Opened on {new Date(capsule.unlockDate).toDateString()}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(capsule.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MyCapsules;
