import React, { useRef, useState } from "react";
import Image from "next/image";
import { Text } from "./Text";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

interface SalaImagem {
  id: number;
  imagemBase64: string;
  ordem: number;
};

interface ImageCarouselProps {
  images: SalaImagem[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [selected, setSelected] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  if (!images || images.length === 0) return null;

  const total = images.length;
  const mainSrc = images[selected].imagemBase64;

  const goPrev = () => setSelected((prev) => (prev - 1 + total) % total);
  const goNext = () => setSelected((prev) => (prev + 1) % total);

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbsRef.current) {
      const scrollAmount = 120;
      thumbsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl mb-3 bg-black">
        <Image
          src={mainSrc}
          alt={`Imagem ${selected + 1}`}
          fill
          className="object-cover"
        />
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded-full"
            >
              <FaAngleLeft color="white" />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded-full"
            >
              <FaAngleRight color="white" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="relative w-full overflow-hidden mt-2">
          <div className="relative flex items-center w-full">
            <button
              onClick={() => scrollThumbnails("left")}
              className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
            >
              <FaAngleLeft color="white" />
            </button>

            <div
              ref={thumbsRef}
              className="flex gap-2 overflow-hidden scrollbar-hide w-full px-8"
              style={{ scrollBehavior: "smooth" }}
            >
              {images.map((img, i) => {
                const thumbSrc = img.imagemBase64;
                return (
                  <div
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`flex-shrink-0 cursor-pointer border-2 rounded-lg transition-all ${selected === i
                      ? "border-content-primary scale-105"
                      : "border-transparent"
                      }`}
                  >
                    <div className="w-[100px] h-[60px] relative rounded-lg overflow-hidden">
                      <Image
                        src={thumbSrc}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => scrollThumbnails("right")}
              className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-black/60 via-black/30 to-transparent"
            >
              <FaAngleRight color="white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
