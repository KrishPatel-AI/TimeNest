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
import { Calendar as CalendarIcon, Upload, X, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

const CreateCapsule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedAmPm, setSelectedAmPm] = useState("AM");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const categories = ["Personal", "Family", "Travel", "Career", "Milestone", "Project", "Other"];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [
      ...prev,
      ...files.map((file) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      })),
    ]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const getFormattedDateTime = () => {
    if (!selectedDate || !selectedHour || !selectedMinute) return "Select date and time";
    return `${selectedDate.toDateString()} at ${selectedHour}:${selectedMinute} ${selectedAmPm}`;
  };

  return (
    <div className="container mx-auto p-4 ">
      <Card className="">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Create New Time Capsule</CardTitle>
          <CardDescription>Preserve your memories for the future</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="title" className="text-sm">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title..."
                  className="mt-1"
                />
              </div>
              <div className="w-1/3">
                <Label className="text-sm">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="mt-1 h-24"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Unlock Date & Time</Label>
              <div className="flex gap-2 items-start">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[160px] justify-start text-left text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? selectedDate.toLocaleDateString() : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date <= new Date()}
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex items-center gap-1">
                  <Select value={selectedHour} onValueChange={setSelectedHour}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedAmPm} onValueChange={setSelectedAmPm}>
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="AM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm">Media</Label>
              <div className="mt-1 border-2 border-dashed rounded-lg p-4">
                <label className="cursor-pointer flex flex-col items-center">
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,video/*"
                  />
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-1">Upload images or videos</p>
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded text-sm"
                    >
                      <span className="truncate flex-1">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6"
                        onClick={() => removeFile(file.name)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Create Capsule</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCapsule;