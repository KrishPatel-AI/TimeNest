import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, Share2, User } from "lucide-react";

const ViewDialog = ({ capsule, open, onClose }) => {
  if (!capsule) return null;

  const isLocked = new Date(capsule.unlockDate) > new Date();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 rounded-xl shadow-lg break-words">
        <DialogHeader className="flex items-left break-words">
          <Badge
            variant={isLocked ? "destructive" : "default"}
            className="w-20"
          >
            {isLocked ? "Locked" : "Opened"}
          </Badge>
          <DialogTitle className=" font-bold break-words">
            {capsule.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-left">
          {/* Capsule Message */}
          <p className="text-gray-600 dark:text-gray-300  leading-relaxed">
            Description: {capsule.message}
          </p>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <User className="w-5 h-5" />
            <span className="font-medium">{capsule.createdBy}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">{capsule.sharedWith}</span>
          </div>

          {/* Unlock Date & Time */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {new Date(capsule.unlockDate).toDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{capsule.unlockTime}</span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Badge variant="secondary">{capsule.category}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
