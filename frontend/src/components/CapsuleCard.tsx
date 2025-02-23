import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

const CapsuleCard = ({ capsule, onView, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h2 className="text-lg font-semibold break-words">{capsule.title}</h2>
        <Badge variant={new Date(capsule.unlockDate) > new Date() ? "destructive" : "default"} className="w-20">
          {new Date(capsule.unlockDate) > new Date() ? "Locked" : "Opened"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Unlocks on {new Date(capsule.unlockDate).toDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="icon" onClick={onView}>
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onEdit}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(capsule.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CapsuleCard;
