import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

const EditDialog = ({ capsule, open, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    unlockDate: "",
    unlockHour: "",
    unlockMinute: "",
    unlockAmPm: "AM",
    category: "",
    createdAt: "",
    createdBy: "",
    sharedWith: [],
    userId: ""
  });

  useEffect(() => {
    if (capsule) {
      const [hour, minute] = capsule.unlockTime ? capsule.unlockTime.split(/[: ]/) : ["", ""];
      const amPm = capsule.unlockTime?.includes("PM") ? "PM" : "AM";
      setFormData({
        title: capsule.title || "",
        message: capsule.message || "",
        unlockDate: capsule.unlockDate || "",
        unlockHour: hour || "",
        unlockMinute: minute || "",
        unlockAmPm: amPm,
        category: capsule.category || "",
        createdAt: capsule.createdAt || "",
        createdBy: capsule.createdBy || "",
        sharedWith: capsule.sharedWith || [],
        userId: capsule.userId || ""
      });
    }
  }, [capsule]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (!capsule || !formData.title.trim() || !formData.message.trim() || !formData.unlockDate) return;
    
    try {
      const capsuleRef = doc(db, "capsules", capsule.id);
      const unlockTime = `${formData.unlockHour}:${formData.unlockMinute} ${formData.unlockAmPm}`;
      await updateDoc(capsuleRef, { ...formData, unlockTime });
      alert("Capsule updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating capsule:", error);
      alert("Failed to update capsule.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Capsule</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Label>Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} />
          
          <Label>Message</Label>
          <Textarea name="message" value={formData.message} onChange={handleChange} />
          
          <Label>Unlock Date</Label>
          <Input type="date" name="unlockDate" value={formData.unlockDate} onChange={handleChange} />
          
          <Label>Unlock Time</Label>
          <div className="flex gap-2">
            <Select value={formData.unlockHour} onValueChange={(value) => setFormData({ ...formData, unlockHour: value })}>
              <SelectTrigger>
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={formData.unlockMinute} onValueChange={(value) => setFormData({ ...formData, unlockMinute: value })}>
              <SelectTrigger>
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={formData.unlockAmPm} onValueChange={(value) => setFormData({ ...formData, unlockAmPm: value })}>
              <SelectTrigger>
                <SelectValue placeholder="AM/PM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="PM">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Label>Category</Label>
          <Input name="category" value={formData.category} onChange={handleChange} />
          
        
        </div>

        <DialogFooter className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges} className="ml-2">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;