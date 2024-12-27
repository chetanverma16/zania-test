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
import data from "@/data/data.json";
import SortableCard from "@/components/SortableCard";

export default function Home() {
  const [items, setItems] = useState(data);
  const [isMounted, setIsMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.type === active.id);
        const newIndex = items.findIndex((item) => item.type === over.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);

        // Update the position based on the new order
        return updatedItems.map((item, index) => ({
          ...item,
          position: index,
        }));
      });
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-4xl my-10">
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
              <SortableCard key={item.type} item={item} />
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
