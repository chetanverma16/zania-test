"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { GripVertical } from "lucide-react";

const SortableCard = ({
  item,
}: {
  item: {
    type: string;
    title: string;
    position: number;
    imageUrl: string;
  };
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.type });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    console.log("clicked");
    setOverlayVisible(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleOverlayClose = () => {
    setOverlayVisible(false);
  };

  const handleImageLoad = () => {
    // delay the loading of the image to make the animation smoother
    setTimeout(() => {
      setIsLoading(false);
      setIsImageLoaded(true);
    }, 500);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={isDragging ? "opacity-50" : ""}
      >
        <Card>
          <CardHeader className="p-2">
            <div className="flex justify-between items-center mb-2">
              <Button
                variant="ghost"
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 h-auto"
              >
                <GripVertical className="h-5 w-5" />
              </Button>
            </div>
            <div
              onClick={handleImageClick}
              className="flex relative items-center justify-center h-48 rounded-xl bg-gray-200 cursor-pointer overflow-hidden"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                priority
                onLoad={handleImageLoad}
              />

              {isLoading && (
                <div className="absolute w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <CardTitle>{item.title}</CardTitle>
            <p>{item.type}</p>
          </CardContent>
        </Card>
      </div>
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClose}
            className="fixed top-0 left-0 inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
            onKeyDown={(e) => e.key === "Escape" && handleOverlayClose()}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={800}
                height={600}
                className="max-w-full max-h-full rounded-xl"
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SortableCard;
