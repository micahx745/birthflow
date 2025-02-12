"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input" // Import the Input component

export function FilterPanel() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-soft-pink/20">
          All Clients (24)
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetTitle className="font-gilda text-xl">Filter Clients</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <Label className="text-base">Status</Label>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upcoming" id="upcoming" />
                <Label htmlFor="upcoming">Upcoming</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="past" id="past" />
                <Label htmlFor="past">Past</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base">Service Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birth">Birth Support</SelectItem>
                <SelectItem value="postpartum">Postpartum Support</SelectItem>
                <SelectItem value="lactation">Lactation Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label className="text-base">Due Date Range</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" className="w-full" />
              <Input type="date" className="w-full" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button className="w-full bg-soft-pink hover:bg-soft-pink/90 text-soft-pink-dark">Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

