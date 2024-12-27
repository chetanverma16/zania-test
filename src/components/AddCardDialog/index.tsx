import React, { useState } from "react";
import { toast } from "sonner";
import { Card } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCardDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCard: (card: Omit<Card, "id">) => void;
}

const AddCardDialog: React.FC<AddCardDialogProps> = ({
  open,
  onClose,
  onAddCard,
}) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddCard = () => {
    if (!type || !title || !imageUrl) {
      toast.error("All fields are required");
      return;
    }

    onAddCard({ type, title, position: 0, imageUrl });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCard}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardDialog;
