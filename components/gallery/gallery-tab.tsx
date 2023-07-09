import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";

interface GalleryTabProps {
  image: string;
  title: string;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image, title }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <NextImage
              fill
              src={image}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
