// components/Carousel.tsx
import { CarouselProps } from "@/interfaces";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Carousel({
  title,
  ariaLabel,
  children,
}: CarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState(); // initial state
    container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  return (
    <section
      className="relative max-w-6xl mt-10 mx-auto w-full"
      aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
    >
      <h3
        id={`${title.replace(/\s+/g, "-").toLowerCase()}-heading`}
        className="text-xl font-semibold mb-4"
      >
        {title}
      </h3>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-disabled={!canScrollLeft}
        className={`absolute -left-6 top-1/2 -translate-y-1/2 rounded-full p-2 z-15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${
          canScrollLeft
            ? "bg-black/60 hover:bg-black text-white shadow-md"
            : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
        }`}
        aria-label={`Scroll left`}
      >
        <FaChevronLeft aria-hidden="true" />
      </button>

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-disabled={!canScrollRight}
        className={`absolute -right-6 top-1/2 -translate-y-1/2 rounded-full p-2 z-15 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] ${
          canScrollRight
            ? "bg-black/60 hover:bg-black text-white shadow-md"
            : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
        }`}
        aria-label={`Scroll right`}
      >
        <FaChevronRight aria-hidden="true" />
      </button>

      {/* Cards container */}
      <ul
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-1"
        role="list"
        aria-label={ariaLabel}
      >
        {children}
      </ul>
    </section>
  );
}
