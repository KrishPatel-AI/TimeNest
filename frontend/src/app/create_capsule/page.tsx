"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { auth, db, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Badge } from "@/components/ui/badge";

const categories = ["Personal", "Family", "Travel", "Career", "Milestone"];
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sharedEmails, setSharedEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedAmPm, setSelectedAmPm] = useState("AM");
  // const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddEmail = () => {
    if (emailInput.trim() === "") return;
    if (!sharedEmails.includes(emailInput)) {
      setSharedEmails([...sharedEmails, emailInput]);
    }
    setEmailInput("");
  };
  const handleRemoveEmail = (email: string) => {
    setSharedEmails(sharedEmails.filter((e) => e !== email));
  };

  const handleCreateCapsule = async () => {
    if (!auth.currentUser) {
      alert("Please login first.");
      return;
    }

    if (
      !title ||
      !category ||
      !message ||
      !selectedDate ||
      !selectedHour ||
      !selectedMinute
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Convert selected date and time to a Date object
    const now = new Date();
    const selectedDateTime = new Date(selectedDate!);
    const hour = parseInt(selectedHour, 10);
    const minute = parseInt(selectedMinute, 10);

    // Convert to 24-hour format
    const finalHour =
      selectedAmPm === "PM" && hour !== 12
        ? hour + 12
        : selectedAmPm === "AM" && hour === 12
        ? 0
        : hour;

    selectedDateTime.setHours(finalHour);
    selectedDateTime.setMinutes(minute);
    selectedDateTime.setSeconds(0);

    // Ensure the selected date-time is at least 2 minutes after the current time
    const twoMinutesLater = new Date(now.getTime() + 2 * 60 * 1000);

    if (selectedDateTime <= twoMinutesLater) {
      alert(
        "Unlock date and time must be at least 2 minutes after the current time."
      );
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const userEmail = auth.currentUser.email;
      const unlockTime = `${selectedHour}:${selectedMinute} ${selectedAmPm}`;

      await addDoc(collection(db, "capsules"), {
        userId,
        title,
        category,
        message,
        unlockDate: selectedDateTime.toISOString(),
        unlockTime,
        sharedWith: sharedEmails,
        createdBy: userEmail,
        createdAt: serverTimestamp(),
      });

      // Reset form fields
      setTitle("");
      setCategory("");
      setMessage("");
      setSelectedDate(null);
      setSelectedHour("");
      setSelectedMinute("");
      setSelectedAmPm("AM");
      setSharedEmails([]);

      alert("Capsule created successfully!");
    } catch (error) {
      console.error("Error creating capsule:", error);
      alert("Failed to create capsule. Check console for details.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Time Capsule</CardTitle>
          <CardDescription>
            Preserve your memories for the future
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
            />

            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
            />
            <Label>Share with (Enter Emails)</Label>
            <div className="flex gap-2">
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email..."
              />
              <Button onClick={handleAddEmail}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {sharedEmails.map((email, index) => (
                <Badge key={index} variant="secondary">
                  {email} <span className="cursor-pointer ml-2" onClick={() => handleRemoveEmail(email)}>✕</span>
                </Badge>
              ))}
            </div>
            <Label>Unlock Date & Time</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? selectedDate.toDateString() : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const now = new Date();
                      const twoMinutesLater = new Date(
                        now.getTime() + 2 * 60 * 1000
                      );
                      return date < new Date(now.setHours(0, 0, 0, 0)); // Disable past dates
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedHour} onValueChange={setSelectedHour}>
                <SelectTrigger>
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAmPm} onValueChange={setSelectedAmPm}>
                <SelectTrigger>
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <Label>Media</Label>
            <Input type="file" onChange={handleFileUpload} accept="image/*,video/*" /> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleCreateCapsule} disabled={loading}>
            {loading ? "Creating..." : "Create Capsule"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCapsule;
