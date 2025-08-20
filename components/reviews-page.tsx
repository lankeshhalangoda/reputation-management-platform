"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ReviewSkeleton, StatCardSkeleton } from "@/components/skeleton-loader"
import {
  Star,
  MessageSquare,
  Ticket,
  Reply,
  TrendingUp,
  TrendingDown,
  Minus,
  Send,
  Archive,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
  MessageCircle,
  Filter,
} from "lucide-react"

interface ReviewsPageProps {
  selectedChannel: string
}

const mockReviews = [
  {
    id: 1,
    author: "John Smith",
    avatar: "/abstract-geometric-shapes.png",
    rating: 5,
    date: "2024-08-17",
    dateFormatted: "2 days ago",
    channel: "google",
    channelName: "Google",
    content:
      "Excellent service! The staff was very professional and helpful. The booking process was smooth and the location exceeded our expectations. Would definitely recommend to others looking for quality accommodation.",
    responded: false,
    sentiment: "positive",
    location: "New York, NY",
    verified: true,
    helpfulCount: 12,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    avatar: "/diverse-woman-portrait.png",
    rating: 2,
    date: "2024-08-12",
    dateFormatted: "1 week ago",
    channel: "facebook",
    channelName: "Facebook",
    content:
      "Had some issues with the booking process. Customer service could be improved. The response time was slow and the staff seemed unprepared to handle our concerns. The room was not as clean as expected.",
    responded: true,
    sentiment: "negative",
    location: "Los Angeles, CA",
    verified: true,
    helpfulCount: 8,
    response:
      "Thank you for your feedback. We sincerely apologize for the inconvenience. We have addressed these issues with our team and would like to make this right. Please contact us directly so we can resolve this matter.",
  },
  {
    id: 3,
    author: "Mike Wilson",
    avatar: "/thoughtful-man.png",
    rating: 4,
    date: "2024-08-16",
    dateFormatted: "3 days ago",
    channel: "tripadvisor",
    channelName: "TripAdvisor",
    content:
      "Good overall experience. The location was perfect and the amenities were as described. Staff was friendly and accommodating. Only minor issue was the Wi-Fi connectivity in some areas of the building.",
    responded: false,
    sentiment: "positive",
    location: "Chicago, IL",
    verified: true,
    helpfulCount: 5,
  },
  {
    id: 4,
    author: "Emma Davis",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
    date: "2024-08-15",
    dateFormatted: "4 days ago",
    channel: "booking",
    channelName: "Booking.com",
    content:
      "Outstanding experience from start to finish! The booking was seamless, check-in was quick, and the room was immaculate. The location is perfect for exploring the city. Will definitely book again!",
    responded: true,
    sentiment: "positive",
    location: "Miami, FL",
    verified: true,
    helpfulCount: 15,
    response:
      "Thank you so much for your wonderful review! We're thrilled you enjoyed your stay and look forward to welcoming you back soon.",
  },
  {
    id: 5,
    author: "David Chen",
    avatar: "/asian-businessman-meeting.png",
    rating: 3,
    date: "2024-08-14",
    dateFormatted: "5 days ago",
    channel: "agoda",
    channelName: "Agoda",
    content:
      "Average stay. The room was decent but nothing special. Service was okay but could be more attentive. The price was reasonable for the location. Breakfast options were limited.",
    responded: false,
    sentiment: "neutral",
    location: "Seattle, WA",
    verified: true,
    helpfulCount: 3,
  },
  {
    id: 6,
    author: "Lisa Rodriguez",
    avatar: "/placeholder-hhsrl.png",
    rating: 1,
    date: "2024-08-13",
    dateFormatted: "6 days ago",
    channel: "google",
    channelName: "Google",
    content:
      "Very disappointing experience. The room was not ready at check-in time, and when we finally got in, it was not properly cleaned. The air conditioning wasn't working, and it took hours to get it fixed. Would not recommend.",
    responded: true,
    sentiment: "negative",
    location: "Phoenix, AZ",
    verified: true,
    helpfulCount: 22,
    response:
      "We deeply apologize for this unacceptable experience. This does not reflect our usual standards. We have taken immediate action to address these issues and would like to offer you a complimentary stay to make amends. Please contact our management team directly.",
  },
]

const getChannelStats = (selectedChannel: string) => {
  const channelData: { [key: string]: { rating: string; reviews: string; responded: string; tickets: string } } = {
    all: { rating: "4.69", reviews: "156", responded: "124", tickets: "8" },
    google: { rating: "4.8", reviews: "45", responded: "38", tickets: "2" },
    facebook: { rating: "4.2", reviews: "32", responded: "28", tickets: "3" },
    tripadvisor: { rating: "4.6", reviews: "28", responded: "22", tickets: "1" },
    booking: { rating: "4.9", reviews: "24", responded: "20", tickets: "0" },
    agoda: { rating: "4.4", reviews: "18", responded: "12", tickets: "2" },
    expedia: { rating: "4.3", reviews: "9", responded: "4", tickets: "0" },
  }

  return channelData[selectedChannel] || channelData.all
}

export function ReviewsPage({ selectedChannel }: ReviewsPageProps) {
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [selectedReviews, setSelectedReviews] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const reviewsPerPage = 5

  const filteredAndSortedReviews = useMemo(() => {
    const filtered = mockReviews.filter((review) => {
      const channelMatch = selectedChannel === "all" || review.channel === selectedChannel
      const searchMatch =
        searchText === "" ||
        review.content.toLowerCase().includes(searchText.toLowerCase()) ||
        review.author.toLowerCase().includes(searchText.toLowerCase())
      const sentimentMatch = filterBy === "all" || review.sentiment === filterBy
      return channelMatch && searchMatch && sentimentMatch
    })

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "rating-high":
          return b.rating - a.rating
        case "rating-low":
          return a.rating - b.rating
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
  }, [selectedChannel, searchText, sortBy, filterBy])

  const totalPages = Math.ceil(filteredAndSortedReviews.length / reviewsPerPage)
  const paginatedReviews = filteredAndSortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage,
  )

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200"
      case "negative":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
    }
  }

  const getChannelIcon = (channel: string) => {
    const iconMap: { [key: string]: string } = {
      google: "/google-logo.png",
      facebook: "/facebook-logo.png",
      tripadvisor: "/tripadvisor-logo.png",
      booking: "/booking-logo.png",
      agoda: "/agoda-logo.png",
      expedia: "/expedia-logo.png",
    }
    return iconMap[channel] || "/all-channels-logo.png"
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReviews(filteredAndSortedReviews.map((r) => r.id))
    } else {
      setSelectedReviews([])
    }
  }

  const handleSelectReview = (reviewId: number, checked: boolean) => {
    if (checked) {
      setSelectedReviews([...selectedReviews, reviewId])
    } else {
      setSelectedReviews(selectedReviews.filter((id) => id !== reviewId))
    }
  }

  const handleBulkReply = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Bulk Reply Sent",
      description: `Replies sent to ${selectedReviews.length} reviews successfully`,
    })
    setSelectedReviews([])
    setIsLoading(false)
  }

  const handleBulkArchive = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast({
      title: "Reviews Archived",
      description: `${selectedReviews.length} reviews have been archived successfully`,
    })
    setSelectedReviews([])
    setIsLoading(false)
  }

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Reply Sent",
      description: "Your response has been posted successfully",
    })
    setReplyText("")
    setIsLoading(false)
  }

  const currentStats = getChannelStats(selectedChannel)
  const summaryStats = [
    { label: "Overall Rating", value: currentStats.rating, color: "border-t-4 border-t-blue-500", icon: Star },
    {
      label: "Total Reviews",
      value: currentStats.reviews,
      color: "border-t-4 border-t-green-500",
      icon: MessageSquare,
    },
    { label: "Responded Reviews", value: currentStats.responded, color: "border-t-4 border-t-orange-500", icon: Reply },
    { label: "Tickets", value: currentStats.tickets, color: "border-t-4 border-t-purple-500", icon: Ticket },
  ]

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <ReviewSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6 relative">
      <Button
        onClick={() => setShowFilterModal(true)}
        className="fixed top-6 right-6 z-50 bg-pink-500 hover:bg-pink-600 text-white rounded-md shadow-lg"
        size="sm"
      >
        <Filter className="h-4 w-4" />
      </Button>

      {showFilterModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setShowFilterModal(false)} />
          <div className="fixed top-16 right-6 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Reviews</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilterModal(false)}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="rating-high">Highest Rating</SelectItem>
                    <SelectItem value="rating-low">Lowest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sentiment</label>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sentiments</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => setShowFilterModal(false)}
                className="w-full bg-[#007abf] hover:bg-[#005a8f] text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="border border-pink-300 bg-pink-50/50 rounded-lg p-3 mb-6">
        <p className="text-sm text-pink-800">
          By default, the time is displayed in UTC. To view the time in your local timezone, please select the "Local
          time" option from the timezone filter.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`hover:shadow-md transition-all duration-200 hover:scale-105 ${stat.color} bg-white shadow-sm`}
            >
              <CardContent className="p-4 md:p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Reviews List */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Reviews ({filteredAndSortedReviews.length})</span>
              {selectedReviews.length > 0 && <Badge variant="secondary">{selectedReviews.length} selected</Badge>}
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              {selectedReviews.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleBulkReply} disabled={isLoading}>
                    <Reply className="mr-2 h-4 w-4" />
                    Bulk Reply ({selectedReviews.length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBulkArchive} disabled={isLoading}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Templates
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Manage Reply Templates</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Positive Response Templates</h4>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm">
                              Thank you for your positive feedback! We're delighted you enjoyed your experience.
                            </p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm">
                              We appreciate your kind words and look forward to welcoming you back soon!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Negative Response Templates</h4>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm">
                              We sincerely apologize for your experience. Please contact us directly so we can make this
                              right.
                            </p>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <p className="text-sm">
                              Thank you for bringing this to our attention. We take all feedback seriously and are
                              working to improve.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Bulk Replies
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paginatedReviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
              <p className="text-muted-foreground">Try adjusting your search to see more reviews.</p>
            </div>
          ) : (
            paginatedReviews.map((review) => (
              <div
                key={review.id}
                className={`border border-border rounded-lg p-4 md:p-6 space-y-4 hover:shadow-sm transition-all duration-200 bg-white shadow-sm ${
                  selectedReviews.includes(review.id) ? "ring-2 ring-primary/20 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                    <Checkbox
                      checked={selectedReviews.includes(review.id)}
                      onCheckedChange={(checked) => handleSelectReview(review.id, checked as boolean)}
                    />

                    <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {review.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-card-foreground truncate">{review.author}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground">{review.dateFormatted}</span>
                        <div className="flex items-center space-x-1">
                          <img
                            src={getChannelIcon(review.channel) || "/placeholder.svg"}
                            alt={review.channelName}
                            className="w-4 h-4 object-contain"
                          />
                          <Badge variant="outline" className="text-xs">
                            {review.channelName}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground hidden sm:inline">• {review.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                    {review.responded && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Responded
                      </Badge>
                    )}
                    <Badge variant="outline" className={`${getSentimentColor(review.sentiment)} border text-xs`}>
                      <span className="flex items-center space-x-1">
                        {getSentimentIcon(review.sentiment)}
                        <span className="capitalize hidden sm:inline">{review.sentiment}</span>
                      </span>
                    </Badge>
                  </div>
                </div>

                <div className="pl-0 md:pl-16">
                  <p className="text-card-foreground leading-relaxed text-sm md:text-base">{review.content}</p>

                  {review.response && (
                    <div className="mt-4 p-3 md:p-4 bg-muted rounded-lg border-l-4 border-primary">
                      <div className="flex items-center space-x-2 mb-2">
                        <Reply className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Management Response</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.response}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-border gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReview(review)}>
                            <Reply className="mr-2 h-4 w-4" />
                            {review.responded ? "Update Reply" : "Reply"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reply to {review.author}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="compose" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="compose">Compose</TabsTrigger>
                              <TabsTrigger value="templates">Templates</TabsTrigger>
                            </TabsList>
                            <TabsContent value="compose" className="space-y-4">
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm">{review.content}</p>
                              </div>
                              <Textarea
                                placeholder="Write your response..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={4}
                              />
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={handleSendReply} disabled={isLoading}>
                                  <Send className="mr-2 h-4 w-4" />
                                  Send Reply
                                </Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="templates" className="space-y-4">
                              <div className="space-y-2">
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() =>
                                    setReplyText(
                                      "Thank you for your positive feedback! We're delighted you enjoyed your experience.",
                                    )
                                  }
                                >
                                  Positive Response Template
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() =>
                                    setReplyText(
                                      "We sincerely apologize for your experience. Please contact us directly so we can make this right.",
                                    )
                                  }
                                >
                                  Negative Response Template
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent"
                                  onClick={() =>
                                    setReplyText(
                                      "Thank you for your feedback. We appreciate you taking the time to share your experience.",
                                    )
                                  }
                                >
                                  Neutral Response Template
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span className="hidden sm:inline">Go to Original</span>
                          <span className="sm:hidden">Original</span>
                        </a>
                      </Button>

                      <Button size="sm" className="bg-[#007abf] hover:bg-[#005a8f] text-white">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Ticket</span>
                        <span className="sm:hidden">Ticket</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * reviewsPerPage + 1} to{" "}
                {Math.min(currentPage * reviewsPerPage, filteredAndSortedReviews.length)} of{" "}
                {filteredAndSortedReviews.length} reviews
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
