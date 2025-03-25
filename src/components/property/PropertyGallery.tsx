
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="lg:col-span-8">
      <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4">
        <img 
          src={mainImage} 
          alt={title}
          className="w-full h-full object-cover animate-scale-in"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={cn(
              "cursor-pointer rounded-lg overflow-hidden aspect-[4/3] transition-all",
              mainImage === image ? "ring-2 ring-estate-800" : "opacity-80 hover:opacity-100"
            )}
            onClick={() => setMainImage(image)}
          >
            <img 
              src={image} 
              alt={`View ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
