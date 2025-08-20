"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  MessageSquare,
  Star,
  Globe,
  Facebook,
  MapPin,
  Plane,
  Building2,
  Coffee,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  selectedChannel: string
  onChannelSelect: (channel: string) => void
  activeView: "reviews" | "analytics"
  onViewChange: (view: "reviews" | "analytics") => void
}

const channels = [
  { id: "all", name: "All Channels", icon: Globe, color: "text-primary" },
  { id: "google", name: "Google", icon: Star, color: "text-yellow-500" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
  { id: "tripadvisor", name: "TripAdvisor", icon: MapPin, color: "text-green-600" },
  { id: "booking", name: "Booking.com", icon: Building2, color: "text-blue-700" },
  { id: "agoda", name: "Agoda", icon: Plane, color: "text-red-500" },
  { id: "expedia", name: "Expedia", icon: Coffee, color: "text-orange-500" },
]

export function Sidebar({ selectedChannel, onChannelSelect, activeView, onViewChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const sidebarContent = (
    <>
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">RepuManager</h1>
        <p className="text-sm text-muted-foreground">Reputation Management</p>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="space-y-2">
          <Button
            variant={activeView === "reviews" ? "default" : "ghost"}
            className="w-full justify-start transition-all duration-200 hover:scale-105"
            onClick={() => {
              onViewChange("reviews")
              setIsMobileOpen(false)
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Reviews
          </Button>
          <Button
            variant={activeView === "analytics" ? "default" : "ghost"}
            className="w-full justify-start transition-all duration-200 hover:scale-105"
            onClick={() => {
              onViewChange("analytics")
              setIsMobileOpen(false)
            }}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Channels */}
      {activeView === "reviews" && (
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Review Channels</h3>
          <div className="space-y-1">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <Button
                  key={channel.id}
                  variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:scale-105",
                    selectedChannel === channel.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  onClick={() => {
                    onChannelSelect(channel.id)
                    setIsMobileOpen(false)
                  }}
                >
                  <Icon className={cn("mr-2 h-4 w-4", channel.color)} />
                  {channel.name}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">{sidebarContent}</div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform duration-300 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </div>
    </>
  )
}
