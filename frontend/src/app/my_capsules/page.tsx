"use client";

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

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import CapsuleCard from "@/components/CapsuleCard";
import ViewDialog from "@/components/ViewDialog";
import EditDialog from "@/components/EditDialog";

const MyCapsules = () => {
  const [search, setSearch] = useState("");
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCapsules = async () => {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.uid;
      const q = query(collection(db, "capsules"), where("userId", "==", userId));
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

      {/* Search Bar */}
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

      {/* Tabs for Locked & Opened Capsules */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tabs defaultValue="locked">
          <TabsList>
            <TabsTrigger value="locked">Locked Capsules</TabsTrigger>
            <TabsTrigger value="opened">Opened Capsules</TabsTrigger>
          </TabsList>

          {/* Locked Capsules */}
          <TabsContent value="locked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCapsules
                .filter((c) => new Date(c.unlockDate) > new Date())
                .map((capsule) => (
                  <CapsuleCard
                    key={capsule.id}
                    capsule={capsule}
                    onView={() => {
                      setSelectedCapsule(capsule);
                      setIsViewDialogOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedCapsule(capsule);
                      setIsEditDialogOpen(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>

          {/* Opened Capsules */}
          <TabsContent value="opened">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCapsules
                .filter((c) => new Date(c.unlockDate) <= new Date())
                .map((capsule) => (
                  <CapsuleCard
                    key={capsule.id}
                    capsule={capsule}
                    onView={() => {
                      setSelectedCapsule(capsule);
                      setIsViewDialogOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedCapsule(capsule);
                      setIsEditDialogOpen(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* View & Edit Dialogs */}
      <ViewDialog capsule={selectedCapsule} open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} />
      <EditDialog capsule={selectedCapsule} open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} />
    </div>
  );
};

export default MyCapsules;
