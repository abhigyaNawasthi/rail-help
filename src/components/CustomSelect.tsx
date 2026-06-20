"use client";

import React, { useState, useRef, FC, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Emerald UI Click Outside Hook
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) handler();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

interface Props {
  children: ReactNode;
  onClickOutside: () => void;
  classes?: string;
}

// Emerald UI Wrapper Component
const OnClickOutside: FC<Props> = ({ children, onClickOutside, classes }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, onClickOutside);

  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  );
};

// Adapted specifically for RailVacant Form selections
export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OnClickOutside onClickOutside={() => setIsOpen(false)} classes="w-full">
      <div data-state={isOpen ? "open" : "closed"} className="group relative w-full">
        {/* Trigger */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-transparent text-left font-semibold text-slate-100 outline-none py-1.5 cursor-pointer"
        >
          <span className={value ? "text-slate-100" : "text-slate-600"}>
            {value || placeholder}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </motion.div>
        </button>

        {/* Animated Dropdown Body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute top-[calc(100%+0.5rem)] left-0 z-50 w-full",
                "overflow-hidden rounded-xl max-h-60 overflow-y-auto no-scrollbar",
                "bg-slate-950/95 backdrop-blur-xl",
                "border border-white/10",
                "shadow-2xl",
              )}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
                className="py-1"
              >
                {options.length === 0 ? (
                  <div className="px-4 py-2.5 text-sm text-slate-500 italic">
                    No stations available
                  </div>
                ) : (
                  options.map((option, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className={cn(
                        "block w-full text-left px-4 py-2.5 text-sm font-medium",
                        "border-b border-white/5 last:border-b-0",
                        value === option
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-300 hover:bg-white/5 hover:text-white",
                        "transition-colors duration-150",
                      )}
                    >
                      {option}
                    </motion.button>
                  ))
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OnClickOutside>
  );
}
