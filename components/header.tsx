"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, Search, Settings, User, Download } from "lucide-react"

interface HeaderProps {
  activeView: "reviews" | "analytics"
  onViewChange: (view: "reviews" | "analytics") => void
}

const notifications = [
  { id: 1, type: "new_review", message: "New 5-star review from John Smith", time: "2 minutes ago", unread: true },
  { id: 2, type: "response_needed", message: "Negative review requires response", time: "1 hour ago", unread: true },
  { id: 3, type: "milestone", message: "You've reached 100 total reviews!", time: "3 hours ago", unread: false },
]

export function Header({ activeView, onViewChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleExport = () => {
    console.log("Exporting data for", activeView)
  }

  return (
    <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4 ml-12 md:ml-0">
        <h2 className="text-lg font-semibold text-card-foreground">
          {activeView === "reviews" ? "Review Management" : "Analytics Dashboard"}
        </h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary animate-pulse hidden sm:inline-flex">
          Live
        </Badge>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={activeView === "reviews" ? "Search reviews..." : "Search analytics..."}
            className="pl-10 w-48 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <Button variant="outline" size="sm" onClick={handleExport} className="hidden md:inline-flex bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>

        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mark all read
                </Button>
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      notification.unread ? "bg-primary/5 border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">New review notifications</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Response reminders</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm">Weekly summary reports</span>
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Display Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Show review sentiment</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-sm">Auto-refresh data</span>
                  </label>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
