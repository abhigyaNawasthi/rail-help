import { motion } from "framer-motion";

export function MarkerHighlight({
  before = "",
  highlight,
  after = "",
  markerColor = "#6366f1", // indigo-500 to match our brand
  highlightTextColor = "#ffffff",
}: {
  before?: string;
  highlight: string;
  after?: string;
  markerColor?: string;
  highlightTextColor?: string;
}) {
  return (
    <span>
      {before}{" "}
      <span className="relative inline-block whitespace-nowrap px-1">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute inset-0 rounded-sm origin-left z-0"
          style={{ backgroundColor: markerColor }}
        />
        <span className="relative z-10" style={{ color: highlightTextColor }}>
          {highlight}
        </span>
      </span>{" "}
      {after}
    </span>
  );
}