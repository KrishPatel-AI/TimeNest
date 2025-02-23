import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const EditDialog = ({ capsule, open, onClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Update fields when capsule changes
  useEffect(() => {
    if (capsule) {
      setTitle(capsule.title || "");
      setMessage(capsule.message || "");
      setUnlockDate(capsule.unlockDate ? new Date(capsule.unlockDate).toISOString().split("T")[0] : "");
    }
  }, [capsule]); // Runs whenever capsule changes

  const handleSaveChanges = async () => {
    if (!capsule || !title.trim() || !message.trim() || !unlockDate) return;
    
    setLoading(true);
    try {
      const capsuleRef = doc(db, "capsules", capsule.id);
      await updateDoc(capsuleRef, { title, message, unlockDate });
      alert("Capsule updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating capsule:", error);
      alert("Failed to update capsule.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="">Edit Capsule</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Message Input */}
          <div>
            <Label>Message</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          {/* Unlock Date Input */}
          <div>
            <Label>Unlock Date</Label>
            <Input type="date" value={unlockDate} onChange={(e) => setUnlockDate(e.target.value)} />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} disabled={loading} className="ml-2">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
