"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Signature, Type, CheckSquare, FileText } from "lucide-react"

interface DocumentToolsProps {
  onAddElement: (type: "signature" | "text" | "checkbox" | "initial") => void
}

export function DocumentTools({ onAddElement }: DocumentToolsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Form Fields</h3>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop fields onto the document
        </p>
      </div>

      <Tabs defaultValue="fields" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="fields" className="flex-1">Fields</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fields" className="space-y-3 pt-2">
          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Signature Fields</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto py-2"
                onClick={() => onAddElement("signature")}
              >
                <Signature className="h-4 w-4" />
                <span>Signature</span>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto py-2"
                onClick={() => onAddElement("initial")}
              >
                <FileText className="h-4 w-4" />
                <span>Initial</span>
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-500 mb-1 block">Input Fields</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto py-2"
                onClick={() => onAddElement("text")}
              >
                <Type className="h-4 w-4" />
                <span>Text</span>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start gap-2 h-auto py-2"
                onClick={() => onAddElement("checkbox")}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Checkbox</span>
              </Button>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-500 mt-2">
              Click on any field to add it to the document. You can then 
              position and resize it as needed.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-3 pt-2">
          <div className="space-y-2">
            <p className="text-sm">
              Document settings will be available in a future update.
            </p>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
              <li>Required fields</li>
              <li>Email notifications</li>
              <li>Signing order</li>
              <li>Document expiration</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 