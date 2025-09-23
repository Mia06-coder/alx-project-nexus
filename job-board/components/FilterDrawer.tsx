// components/FilterDrawer.tsx
import { motion, AnimatePresence } from "framer-motion";
import FilterBar from "./FilterBar";
import { FilterDrawerProps } from "@/interfaces";
import Image from "next/image";

export default function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white z-50 shadow-lg p-4 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button aria-label="Close filters" onClick={onClose}>
                <Image
                  src="/assets/icons/close-outline.svg"
                  width={24}
                  height={24}
                  alt="Close X"
                />
              </button>
            </div>
            <FilterBar />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
