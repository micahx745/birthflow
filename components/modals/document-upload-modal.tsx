"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ModalWrapper } from "./modal-wrapper"

const documentUploadSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 5000000, `File size should be less than 5MB.`),
  documentType: z.string().min(1, { message: "Please select a document type." }),
  client: z.string().min(1, { message: "Please select a client." }),
  template: z.string().optional(),
  description: z.string().max(500, { message: "Description should be less than 500 characters." }).optional(),
  tags: z.string().optional(),
})

interface DocumentUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DocumentUploadModal({ isOpen, onClose }: DocumentUploadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const form = useForm<z.infer<typeof documentUploadSchema>>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: {
      documentType: "",
      client: "",
      template: "",
      description: "",
      tags: "",
    },
  })

  async function onSubmit(values: z.infer<typeof documentUploadSchema>) {
    setIsSubmitting(true)
    // Here you would typically send the form data to your backend
    console.log(values)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
    setIsSubmitting(false)
    onClose()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      form.setValue("file", e.dataTransfer.files[0])
    }
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Upload Document">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Document</FormLabel>
                <FormControl>
                  <div
                    className={`border-2 border-dashed rounded-md p-6 text-center ${
                      dragActive ? "border-soft-pink" : "border-gray-300"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...rest}
                    />
                    <p>Drag and drop your file here, or click to select</p>
                    {value && <p className="mt-2">{(value as File).name}</p>}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="birth-plan">Birth Plan</SelectItem>
                    <SelectItem value="consent-form">Consent Form</SelectItem>
                    <SelectItem value="medical-record">Medical Record</SelectItem>
                    <SelectItem value="client-note">Client Note</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Associated Client</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="client1">Emma Thompson</SelectItem>
                    <SelectItem value="client2">Sarah Johnson</SelectItem>
                    <SelectItem value="client3">Maria Garcia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="template1">Standard Birth Plan</SelectItem>
                    <SelectItem value="template2">Consent Form</SelectItem>
                    <SelectItem value="template3">Client Intake Form</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a brief description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tags separated by commas" {...field} />
                </FormControl>
                <FormDescription>e.g., "important, review needed, confidential"</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Upload Document"}
          </Button>
        </form>
      </Form>
    </ModalWrapper>
  )
}

