"use client"

import { useState, useEffect, useRef } from "react"
import { Rnd } from "react-rnd"
import { Button } from "@/components/ui/button"
import { Signature, Type, CheckSquare, FileText, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Element data interface
interface ElementData {
  id: string
  type: "signature" | "text" | "checkbox" | "initial"
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  required: boolean
  value: string
}

interface PDFViewerProps {
  loading: boolean
  pdfImages: string[]
  currentPage: number
  totalPages: number
  elements: ElementData[]
  onPageChange: (page: number) => void
  onElementMove: (id: string, position: { x: number; y: number }) => void
  onElementResize: (id: string, size: { width: number; height: number }) => void
  onElementDelete: (id: string) => void
}

export function PDFViewer({
  loading,
  pdfImages,
  currentPage,
  totalPages,
  elements,
  onPageChange,
  onElementMove,
  onElementResize,
  onElementDelete
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0
  })

  // Debounced resize listener to prevent performance issues
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Debounce function to limit resize event frequency
    const debounce = (func: Function, delay: number) => {
      let timerId: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => func(...args), delay);
      };
    };

    // Create debounced handler with 100ms delay
    const debouncedUpdateSize = debounce(updateSize, 100);

    // Initial size update
    updateSize();

    // Add event listener with debounced handler
    window.addEventListener("resize", debouncedUpdateSize);

    // Clean up
    return () => {
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, []);

  const getElementIcon = (type: ElementData["type"]) => {
    switch (type) {
      case "signature":
        return <Signature className="h-4 w-4" />
      case "text":
        return <Type className="h-4 w-4" />
      case "checkbox":
        return <CheckSquare className="h-4 w-4" />
      case "initial":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  const getElementLabel = (type: ElementData["type"]) => {
    switch (type) {
      case "signature":
        return "Signature"
      case "text":
        return "Text"
      case "checkbox":
        return "Checkbox"
      case "initial":
        return "Initial"
      default:
        return "Field"
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-pink"></div>
        <p className="mt-4 text-gray-500">Loading document...</p>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative overflow-auto h-full"
    >
      {/* PDF Page */}
      <div className="mx-auto p-8 relative">
        {pdfImages[currentPage - 1] && (
          <img 
            src={pdfImages[currentPage - 1]} 
            alt={`Page ${currentPage}`}
            className="max-w-full shadow-lg"
          />
        )}
        
        {/* Elements Layer */}
        {elements
          .filter(element => element.position.y < 2000) // Filter to only show elements on the visible page
          .map(element => (
            <Rnd
              key={element.id}
              size={{ width: element.size.width, height: element.size.height }}
              position={{ x: element.position.x, y: element.position.y }}
              onDragStart={(e) => {
                // Prevent text selection during drag
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragStop={(e, d) => {
                // Ensure position values are integers to prevent rendering issues
                const x = Math.round(d.x);
                const y = Math.round(d.y);
                onElementMove(element.id, { x, y });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                // Ensure size values are integers to prevent rendering issues
                const width = Math.max(80, Math.round(parseInt(ref.style.width)));
                const height = Math.max(40, Math.round(parseInt(ref.style.height)));

                onElementResize(element.id, { width, height });

                // Ensure position values are integers
                const x = Math.round(position.x);
                const y = Math.round(position.y);
                onElementMove(element.id, { x, y });
              }}
              bounds="parent"
              minWidth={80}
              minHeight={40}
              dragHandleClassName="drag-handle"
              resizeHandleStyles={{
                bottomRight: { zIndex: 10 },
                topLeft: { zIndex: 10 },
                bottomLeft: { zIndex: 10 },
                topRight: { zIndex: 10 }
              }}
              className={`border-2 border-soft-pink rounded-md bg-soft-pink/5 shadow-sm`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between bg-soft-pink text-white text-xs px-2 py-1 drag-handle cursor-move">
                  <div className="flex items-center gap-1">
                    {getElementIcon(element.type)}
                    <span>{getElementLabel(element.type)}</span>
                    {element.required && <span className="text-red-200">*</span>}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementDelete(element.id);
                    }}
                    className="text-white hover:text-red-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1 p-2 flex items-center justify-center">
                  {element.type === "signature" && (
                    <span className="text-gray-400 text-xs italic">Signature</span>
                  )}
                  {element.type === "text" && (
                    <span className="text-gray-400 text-xs italic">Text</span>
                  )}
                  {element.type === "checkbox" && (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border border-gray-400 rounded mr-2"></div>
                      <span className="text-gray-600 text-xs">Check here</span>
                    </div>
                  )}
                  {element.type === "initial" && (
                    <span className="text-gray-400 text-xs italic">Initial</span>
                  )}
                </div>
              </div>
            </Rnd>
          ))
        }
      </div>

      {/* Page controls */}
      {totalPages > 1 && (
        <div className="sticky bottom-0 w-full bg-white border-t p-2 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 