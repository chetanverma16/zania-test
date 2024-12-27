"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import SortableCard from "@/components/SortableCard";
import { toast } from "sonner";
import { Card } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import AddCardDialog from "@/components/AddCardDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [items, setItems] = useState<Card[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setItems(data);
      } catch (error: unknown) {
        console.error(error);
        toast.error("Failed to load cards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Save data every 5 seconds
    const interval = setInterval(async () => {
      await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cards: items }),
      });
      toast.success("Changes saved successfully");
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.type === active.id);
        const newIndex = prevItems.findIndex((item) => item.type === over.id);
        const updatedItems = arrayMove(prevItems, oldIndex, newIndex);

        // Update the position based on the new order
        return updatedItems.map((item, index) => ({
          ...item,
          position: index,
        }));
      });
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddCard = async (newCard: Omit<Card, "id">) => {
    try {
      const response = await fetch("/api/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      const addedCard = await response.json();
      setItems((prevItems) => [...prevItems, addedCard]);
      toast.success("Card added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add card");
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await fetch("/api/card", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Card deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete card");
    }
  };

  if (!isMounted) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-60 w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-2xl font-semibold text-gray-600">No cards found</p>
        <p className="text-gray-500">Create some cards to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-2xl px-4 py-2 bg-white border border-gray-200">
        <h2 className="text-sm">Zania Assigment</h2>
        <Button size="sm" onClick={() => setIsDialogOpen(true)}>
          Add Card
        </Button>
      </div>

      <AddCardDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddCard={handleAddCard}
      />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={items.map((item) => item.type)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => (
              <SortableCard
                key={item.type}
                item={item}
                onDelete={() => handleDeleteCard(item.id)}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <SortableCard
              item={items.find((item) => item.type === activeId)!}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
