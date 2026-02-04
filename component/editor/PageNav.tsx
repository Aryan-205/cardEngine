import { Button } from "@/components/ui/button";
import { CardPreview } from "../CardPreview";
import { useCardStore } from "@/lib/store";
import { motion } from "framer-motion";
import { cn } from "@/types/utils";
// components/editor/PageNav.tsx
export const PageNav = () => {
  const { pages, currentPageIndex, setCurrentPage, addPage } = useCardStore();

  return (
    <div className="flex flex-col gap-4 p-4 border-r bg-gray-50">
      {pages.map((page, index) => (
        <motion.div
          key={page.id}
          layoutId={page.id} // This handles the "animate to screen" effect
          onClick={() => setCurrentPage(index)}
          className={cn(
            "w-32 aspect-3/4 border-2 rounded cursor-pointer overflow-hidden bg-white shadow-sm",
            currentPageIndex === index ? "border-green-500 ring-2 ring-green-200" : "border-gray-300"
          )}
        >
           {/* Minimal preview of page content */}
           <div className="scale-[0.2] origin-top-left w-[500%] h-[500%]">
              <CardPreview pageData={page} isThumbnail />
           </div>
        </motion.div>
      ))}
      <Button onClick={addPage} variant="outline" size="sm">+ Add Page</Button>
    </div>
  );
};