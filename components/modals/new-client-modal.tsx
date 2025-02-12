"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModalWrapper } from "./modal-wrapper"

const newClientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please enter a valid date in YYYY-MM-DD format." }),
  supportType: z.enum(["Birth", "Postpartum", "Lactation"]),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  emergencyContact: z.string().min(2, { message: "Emergency contact must be at least 2 characters." }),
  birthLocation: z.string().min(2, { message: "Birth location must be at least 2 characters." }),
  careProvider: z.string().min(2, { message: "Care provider must be at least 2 characters." }),
  insuranceInfo: z.string().min(2, { message: "Insurance info must be at least 2 characters." }),
})

interface NewClientModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewClientModal({ isOpen, onClose }: NewClientModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof newClientSchema>>({
    resolver: zodResolver(newClientSchema),
    defaultValues: {
      name: "",
      dueDate: "",
      supportType: "Birth",
      phone: "",
      email: "",
      emergencyContact: "",
      birthLocation: "",
      careProvider: "",
      insuranceInfo: "",
    },
  })

  async function onSubmit(values: z.infer<typeof newClientSchema>) {
    setIsSubmitting(true)
    // Here you would typically send the form data to your backend
    console.log(values)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
    setIsSubmitting(false)
    onClose()
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="New Client">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Birth">Birth</SelectItem>
                      <SelectItem value="Postpartum">Postpartum</SelectItem>
                      <SelectItem value="Lactation">Lactation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe: +1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital/Birth Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Serene Valley Hospital" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Sarah Johnson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuranceInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Info</FormLabel>
                  <FormControl>
                    <Input placeholder="HealthGuard Insurance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add New Client"}
          </Button>
        </form>
      </Form>
    </ModalWrapper>
  )
}

