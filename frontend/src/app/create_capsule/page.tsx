"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card";
import {Popover,PopoverTrigger,PopoverContent,} from "@/components/ui/popover";

import {Select,SelectTrigger,SelectContent,SelectItem,} from "@/components/ui/select";
import { uploadFile } from "@/lib/api";
export default function CreateCapsule() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [unlockDate, setUnlockDate] = useState<Date | undefined>();
  const [manualDate, setManualDate] = useState("");
  const [unlockHour, setUnlockHour] = useState("");
  const [unlockMinute, setUnlockMinute] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [file, setFile] = useState<File | null>(null);
  const [timer, setTimer] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (unlockDate) {
      setManualDate(unlockDate.toLocaleDateString("en-GB"));
    }

    if (unlockDate && unlockHour && unlockMinute) {
      let adjustedHours =
        timePeriod === "PM" && Number(unlockHour) < 12
          ? Number(unlockHour) + 12
          : Number(unlockHour);

      adjustedHours =
        timePeriod === "AM" && Number(unlockHour) === 12 ? 0 : adjustedHours;

      const fullDate = new Date(unlockDate);

      fullDate.setHours(adjustedHours, Number(unlockMinute));

      const interval = setInterval(() => {
        const now = new Date().getTime();

        const timeDiff = fullDate.getTime() - now;

        if (timeDiff <= 0) {
          clearInterval(interval);

          setTimer("Unlocked");
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );

          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );

          setTimer(`${days}d ${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [unlockDate, unlockHour, unlockMinute, timePeriod]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !unlockDate || !unlockHour || !unlockMinute) {
      alert("Title, unlock date, and unlock time are required!");

      return;
    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append("content", content);

    formData.append(
      "unlockDate",

      `${manualDate} ${unlockHour}:${unlockMinute} ${timePeriod}`
    );

    if (file) formData.append("file", file);

    try {
      await uploadFile(formData);

      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error saving capsule:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Create Your Digital Capsule</h1>

          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Write your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Choose Date</Button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={unlockDate}
                  onSelect={setUnlockDate}
                />
              </PopoverContent>
            </Popover>

            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              value={manualDate}
              readOnly
            />

            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="HH"
                min="1"
                max="12"
                value={unlockHour}
                onChange={(e) => setUnlockHour(e.target.value)}
              />

              <Input
                type="number"
                placeholder="MM"
                min="0"
                max="59"
                value={unlockMinute}
                onChange={(e) => setUnlockMinute(e.target.value)}
              />

              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-20">{timePeriod}</SelectTrigger>

                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>

                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {unlockDate && unlockHour && unlockMinute && (
              <p className="text-sm text-gray-600">
                Time until unlock: {timer}
              </p>
            )}
          </div>

          <Input type="file" onChange={handleFileUpload} />

          <Button onClick={handleSubmit}>Save Capsule</Button>
        </CardContent>
      </Card>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          Capsule Created Successfully!
        </div>
      )}
    </div>
  );
}
