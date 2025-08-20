"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ReviewsPage } from "@/components/reviews-page"
import { AnalyticsPage } from "@/components/analytics-page"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorBoundary } from "@/components/error-boundary"
import { ChannelSidebar } from "@/components/channel-sidebar"

export default function HomePage() {
  const [activeView, setActiveView] = useState<"reviews" | "analytics">("reviews")
  const [selectedChannel, setSelectedChannel] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-background">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <div className="flex-1 flex flex-col">
            <header className="border-b bg-card px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
              <div className="flex items-center gap-4">
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <h1 className="text-xl font-semibold">Reputation Management</h1>
              </div>
            </header>

            <main className="flex pt-20">
              {activeView === "reviews" && (
                <ChannelSidebar selectedChannel={selectedChannel} onChannelSelect={setSelectedChannel} />
              )}

              <div className={`flex-1 overflow-auto h-[calc(100vh-5rem)] ${activeView === "reviews" ? "ml-80" : ""}`}>
                {activeView === "reviews" ? <ReviewsPage selectedChannel={selectedChannel} /> : <AnalyticsPage />}
              </div>
            </main>
          </div>

          <SheetContent side="left" className="w-64">
            <div className="py-6">
              <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              <nav className="space-y-2">
                <Button
                  variant={activeView === "reviews" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveView("reviews")
                    setIsSidebarOpen(false)
                  }}
                >
                  Reviews
                </Button>
                <Button
                  variant={activeView === "analytics" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveView("analytics")
                    setIsSidebarOpen(false)
                  }}
                >
                  Analytics
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </ErrorBoundary>
  )
}
