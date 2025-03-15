"use client"

import { useRef, useMemo } from "react"
import { Signature, Type, CheckSquare, FileText } from "lucide-react"

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

interface DocumentPreviewProps {
  pdfUrl: string
  currentPage: number
  elements: ElementData[]
}

export function DocumentPreview({ pdfUrl, currentPage, elements }: DocumentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Use memoization to prevent unnecessary re-renders
  const getElementIcon = useMemo(() => {
    // Create a cached object of all element icons
    const iconMap = {
      signature: <Signature className="h-4 w-4" />,
      text: <Type className="h-4 w-4" />,
      checkbox: <CheckSquare className="h-4 w-4" />,
      initial: <FileText className="h-4 w-4" />
    };

    // Return a function that looks up the icon
    return (type: ElementData["type"]) => {
      return iconMap[type] || null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
    >
      {/* Document page */}
      <img
        src={`/placeholder.jpg`} // In a real app, this would be from pdfUrl
        alt={`Document preview page ${currentPage}`}
        className="w-full shadow-md"
        style={{ maxWidth: "100%", display: "block" }}
      />

      {/* Fixed Elements - optimized to prevent unnecessary renders */}
      {useMemo(() =>
        elements.map((element) => {
          // Render element based on type
          const renderElementContent = () => {
            switch(element.type) {
              case "signature":
                return (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 text-sm italic">Signature required</p>
                  </div>
                );
              case "text":
                return (
                  <div className="h-full flex items-center">
                    <p className="text-gray-400 text-sm italic">Text field</p>
                  </div>
                );
              case "checkbox":
                return (
                  <div className="h-full flex items-center">
                    <div className="h-4 w-4 border border-gray-400 rounded mr-2"></div>
                    <p className="text-gray-600 text-sm">Check here</p>
                  </div>
                );
              case "initial":
                return (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 text-sm italic">Initial here</p>
                  </div>
                );
              default:
                return null;
            }
          };

          return (
            <div
              key={element.id}
              style={{
                position: "absolute",
                left: element.position.x,
                top: element.position.y,
                width: element.size.width,
                height: element.size.height,
              }}
              className="border border-gray-300 rounded bg-white shadow-sm p-2"
            >
              {renderElementContent()}
            </div>
          );
        }),
        [elements]
      )}
    </div>
  )
} 