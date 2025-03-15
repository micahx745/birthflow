"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentTools } from "./document-tools"
import { DocumentHeader } from "./document-header"
import { PDFViewer } from "./pdf-viewer"
import { X } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Document data interface
interface DocumentData {
  id: string
  name: string
  fileUrl: string
  createdAt: string
  updatedAt: string
}

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

interface DocumentEditorProps {
  document: DocumentData
  onBack: () => void
}

export function DocumentEditor({ document, onBack }: DocumentEditorProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pdfImages, setPdfImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editorElements, setEditorElements] = useState<ElementData[]>([])

  const containerRef = useRef<HTMLDivElement>(null)

  // Load PDF images only when the document URL changes
  // Using a proper dependency array prevents infinite loop issues
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    // Function to load the PDF and generate images
    const loadPdf = async () => {
      try {
        // In a real app, this would convert the PDF to images
        // For the prototype, we're using placeholder images
        const placeholderImages = [
          "/placeholder.jpg",
          "/placeholder.jpg"
        ];

        // Only update state if component is still mounted
        if (isMounted) {
          setPdfImages(placeholderImages);
          setTotalPages(placeholderImages.length);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Debounce the PDF loading with a short timeout
    const timeoutId = setTimeout(() => {
      loadPdf();
    }, 100);

    // Clean up function to prevent memory leaks and state updates after unmount
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [document.fileUrl]);

  const handleAddElement = useCallback((type: "signature" | "text" | "checkbox" | "initial") => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: 100,
        y: 100
      },
      size: {
        width: 150,
        height: 50
      },
      required: false,
      value: ""
    };

    // Use functional update to avoid stale state issues
    setEditorElements(prevElements => [...prevElements, newElement]);
  }, []);

  // Use useCallback to memoize handlers and prevent unnecessary re-renders
  const handleElementMove = useCallback((id: string, position: { x: number; y: number }) => {
    setEditorElements(prevElements =>
      prevElements.map(el =>
        el.id === id ? { ...el, position } : el
      )
    );
  }, []);

  const handleElementResize = useCallback((id: string, size: { width: number; height: number }) => {
    setEditorElements(prevElements =>
      prevElements.map(el =>
        el.id === id ? { ...el, size } : el
      )
    );
  }, []);

  const handleElementDelete = useCallback((id: string) => {
    setEditorElements(prevElements => prevElements.filter(el => el.id !== id));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setSaving(true);

      // Prepare document data for API call
      const documentData = {
        id: document.id,
        elements: editorElements,
        currentPage,
        totalPages
      };

      // In a real app, this would be an API call
      // This code is optimized to prevent state management issues
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setSaving(false);

      // Use a more subtle notification instead of an alert to avoid UI blocking
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
      notification.textContent = 'Document saved successfully!';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);

    } catch (error) {
      console.error("Error saving document:", error);
      setSaving(false);

      // Use a more subtle error notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg';
      notification.textContent = 'Error saving document. Please try again.';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }, [document.id, editorElements, currentPage, totalPages]);

  const handleExportPdf = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      setSaving(true);

      // Create a clone of the container to avoid mutations during rendering
      // This prevents issues with html2canvas rendering
      const containerClone = containerRef.current.cloneNode(true) as HTMLElement;
      containerClone.style.position = 'absolute';
      containerClone.style.top = '-9999px';
      containerClone.style.left = '-9999px';
      document.body.appendChild(containerClone);

      // Generate a PDF from the cloned container
      const canvas = await html2canvas(containerClone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Remove the clone after rendering
      document.body.removeChild(containerClone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2]
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${document.name}.pdf`);

      setSaving(false);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setSaving(false);
      alert("Error exporting PDF. Please try again.");
    }
  }, [document.name]);

  return (
    <div className="flex flex-col gap-6">
      <DocumentHeader
        document={document}
        onBack={onBack}
        onSave={handleSave}
        onExport={handleExportPdf}
        saving={saving}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Tools sidebar */}
        <Card className="p-4 h-fit">
          <DocumentTools
            onAddElement={handleAddElement}
          />
        </Card>

        {/* Document viewer */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="editor" className="h-full flex flex-col">
            <div className="border-b px-4">
              <TabsList className="my-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="flex-1 p-0 m-0">
              <div ref={containerRef} className="relative">
                <PDFViewer
                  loading={loading}
                  pdfImages={pdfImages}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  elements={editorElements}
                  onPageChange={setCurrentPage}
                  onElementMove={handleElementMove}
                  onElementResize={handleElementResize}
                  onElementDelete={handleElementDelete}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 p-4 m-0">
              <div className="bg-slate-100 p-8 rounded-md h-full overflow-auto">
                <div className="bg-white mx-auto max-w-2xl shadow-lg p-8 min-h-[800px]">
                  <h2 className="text-2xl font-bold mb-6">{document.name}</h2>
                  <p className="text-gray-600 mb-4">
                    This is a preview of your document with the form fields.
                    End users will be able to fill out these fields when they 
                    receive the document.
                  </p>

                  {editorElements.map(element => (
                    <div 
                      key={element.id}
                      className="border rounded p-3 mb-3 bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">
                          {element.type.charAt(0).toUpperCase() + element.type.slice(1)} Field
                        </span>
                        <span className="text-xs text-gray-500">
                          Position: {element.position.x}, {element.position.y}
                        </span>
                      </div>
                      <div className="h-10 border rounded flex items-center justify-center bg-white">
                        {element.type === 'signature' && <span className="text-gray-400 italic">Signature required</span>}
                        {element.type === 'text' && <span className="text-gray-400 italic">Text field</span>}
                        {element.type === 'checkbox' && <div className="flex items-center"><div className="w-4 h-4 border mr-2" /> Check here</div>}
                        {element.type === 'initial' && <span className="text-gray-400 italic">Initial here</span>}
                      </div>
                    </div>
                  ))}

                  {editorElements.length === 0 && (
                    <div className="border border-dashed rounded p-8 text-center text-gray-500">
                      No form fields added yet. Switch to the Editor tab to add fields.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
} 