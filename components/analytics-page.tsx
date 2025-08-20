"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Heart,
  Users,
  Star,
  MessageSquare,
  MessageCircle,
  Award,
  MapPin,
  Filter,
  Lightbulb,
} from "lucide-react"

const overallRatingData = [
  { name: "5 Stars", value: 45, percentage: 72, fill: "#10b981" },
  { name: "4 Stars", value: 25, percentage: 40, fill: "#3b82f6" },
  { name: "3 Stars", value: 15, percentage: 24, fill: "#f59e0b" },
  { name: "2 Stars", value: 10, percentage: 16, fill: "#f97316" },
  { name: "1 Star", value: 5, percentage: 8, fill: "#ef4444" },
]

const platformRatingsData = [
  { platform: "Google", rating: 4.8, reviews: 45, logo: "/google-logo.png", color: "#10b981" },
  { platform: "Facebook", rating: 4.2, reviews: 32, logo: "/facebook-logo.png", color: "#f59e0b" },
  { platform: "TripAdvisor", rating: 4.6, reviews: 28, logo: "/tripadvisor-logo.png", color: "#10b981" },
  { platform: "Expedia", rating: 4.3, reviews: 9, logo: "/expedia-logo.png", color: "#f59e0b" },
]

const locationRatingsData = [
  { location: "New York, NY", rating: 4.9, reviews: 45, color: "#10b981" },
  { location: "Los Angeles, CA", rating: 4.5, reviews: 38, color: "#10b981" },
  { location: "Chicago, IL", rating: 4.7, reviews: 32, color: "#10b981" },
  { location: "Miami, FL", rating: 4.8, reviews: 28, color: "#10b981" },
  { location: "Seattle, WA", rating: 4.4, reviews: 13, color: "#10b981" },
]

const ratingTrendData = [
  { month: "May 2024", avgRating: 4.2, reviewVolume: 28, responded: 22, ticketed: 3 },
  { month: "Jun 2024", avgRating: 4.5, reviewVolume: 35, responded: 28, ticketed: 4 },
  { month: "Jul 2024", avgRating: 4.6, reviewVolume: 42, responded: 35, ticketed: 2 },
  { month: "Aug 2024", avgRating: 4.7, reviewVolume: 51, responded: 39, ticketed: 1 },
]

const sentimentData = [
  { name: "Positive", value: 82.5, count: 129, fill: "#10b981" },
  { name: "Neutral", value: 12.8, count: 20, fill: "#f59e0b" },
  { name: "Negative", value: 4.7, count: 7, fill: "#ef4444" },
]

const sentimentTrendData = [
  { month: "May 2024", positive: 75, neutral: 18, negative: 7 },
  { month: "Jun 2024", positive: 78, neutral: 15, negative: 7 },
  { month: "Jul 2024", positive: 80, neutral: 14, negative: 6 },
  { month: "Aug 2024", positive: 83, neutral: 13, negative: 4 },
]

const channelTrendData = [
  { month: "May 2024", Google: 4.6, Facebook: 4.1, TripAdvisor: 4.4, Expedia: 4.2 },
  { month: "Jun 2024", Google: 4.7, Facebook: 4.2, TripAdvisor: 4.5, Expedia: 4.3 },
  { month: "Jul 2024", Google: 4.8, Facebook: 4.2, TripAdvisor: 4.6, Expedia: 4.3 },
  { month: "Aug 2024", Google: 4.8, Facebook: 4.2, TripAdvisor: 4.6, Expedia: 4.3 },
]

const categoryRatingsData = [
  { category: "Service", rating: 4.8, reviews: 156, icon: "🛎️" },
  { category: "Cleanliness", rating: 4.6, reviews: 142, icon: "🧹" },
  { category: "Location", rating: 4.9, reviews: 138, icon: "📍" },
  { category: "Value", rating: 4.3, reviews: 134, icon: "💰" },
  { category: "Amenities", rating: 4.5, reviews: 128, icon: "🏨" },
]

const categorySentimentData = [
  { category: "Service", positive: 85, neutral: 12, negative: 3 },
  { category: "Cleanliness", positive: 78, neutral: 18, negative: 4 },
  { category: "Location", positive: 92, neutral: 6, negative: 2 },
  { category: "Value", positive: 68, neutral: 25, negative: 7 },
  { category: "Amenities", positive: 75, neutral: 20, negative: 5 },
]

const locationSentimentData = [
  { location: "New York, NY", positive: 88, neutral: 10, negative: 2 },
  { location: "Los Angeles, CA", positive: 75, neutral: 20, negative: 5 },
  { location: "Chicago, IL", positive: 82, neutral: 15, negative: 3 },
  { location: "Miami, FL", positive: 90, neutral: 8, negative: 2 },
]

const competitorData = [
  {
    name: "Our Company",
    rating: 4.69,
    reviews: 156,
    sentiment: 83,
    trend: "+0.12",
    Google: 4.8,
    Facebook: 4.2,
    TripAdvisor: 4.6,
    Expedia: 4.3,
  },
  {
    name: "Competitor A",
    rating: 4.2,
    reviews: 234,
    sentiment: 75,
    trend: "-0.05",
    Google: 4.5,
    Facebook: 3.9,
    TripAdvisor: 4.3,
    Expedia: 4.0,
  },
  {
    name: "Competitor B",
    rating: 4.5,
    reviews: 189,
    sentiment: 78,
    trend: "+0.08",
    Google: 4.7,
    Facebook: 4.1,
    TripAdvisor: 4.5,
    Expedia: 4.2,
  },
  {
    name: "Competitor C",
    rating: 4.1,
    reviews: 298,
    sentiment: 72,
    trend: "-0.02",
    Google: 4.4,
    Facebook: 3.8,
    TripAdvisor: 4.2,
    Expedia: 3.9,
  },
]

const competitorTrendData = [
  { month: "May", us: 4.57, compA: 4.25, compB: 4.42, compC: 4.12 },
  { month: "Jun", us: 4.61, compA: 4.22, compB: 4.45, compC: 4.1 },
  { month: "Jul", us: 4.65, compA: 4.2, compB: 4.48, compC: 4.08 },
  { month: "Aug", us: 4.69, compA: 4.15, compB: 4.5, compC: 4.1 },
]

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last-30-days")
  const [selectedChart, setSelectedChart] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [wordCloudFilter, setWordCloudFilter] = useState("all")
  const [ratingTrendPeriod, setRatingTrendPeriod] = useState("monthly")
  const [sentimentTrendPeriod, setSentimentTrendPeriod] = useState("monthly")
  const [competitorTrendPeriod, setCompetitorTrendPeriod] = useState("monthly")
  const [channelTrendPeriod, setChannelTrendPeriod] = useState("monthly")
  const [responsesTrendPeriod, setResponsesTrendPeriod] = useState("monthly")
  const [showAIModal, setShowAIModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "#10b981" // green
    if (rating >= 2) return "#f59e0b" // yellow/orange
    return "#ef4444" // red
  }

  const wordCloudData = [
    { text: "excellent", size: 32, count: 45, color: "#10b981", sentiment: "positive" },
    { text: "amazing", size: 28, count: 38, color: "#10b981", sentiment: "positive" },
    { text: "wonderful", size: 24, count: 32, color: "#10b981", sentiment: "positive" },
    { text: "great", size: 26, count: 35, color: "#10b981", sentiment: "positive" },
    { text: "fantastic", size: 22, count: 28, color: "#10b981", sentiment: "positive" },
    { text: "perfect", size: 20, count: 25, color: "#10b981", sentiment: "positive" },
    { text: "outstanding", size: 18, count: 22, color: "#10b981", sentiment: "positive" },
    { text: "terrible", size: 24, count: 18, color: "#ef4444", sentiment: "negative" },
    { text: "awful", size: 20, count: 15, color: "#ef4444", sentiment: "negative" },
    { text: "disappointing", size: 18, count: 12, color: "#ef4444", sentiment: "negative" },
    { text: "poor", size: 16, count: 10, color: "#ef4444", sentiment: "negative" },
    { text: "bad", size: 22, count: 16, color: "#ef4444", sentiment: "negative" },
    { text: "okay", size: 16, count: 20, color: "#f59e0b", sentiment: "neutral" },
    { text: "average", size: 14, count: 18, color: "#f59e0b", sentiment: "neutral" },
    { text: "decent", size: 12, count: 15, color: "#f59e0b", sentiment: "neutral" },
  ].filter((word) => {
    if (wordCloudFilter === "all") return true
    return word.sentiment === wordCloudFilter
  })

  const reviewDistributionData = [
    { rating: "5★", count: 89, percentage: 57 },
    { rating: "4★", count: 34, percentage: 22 },
    { rating: "3★", count: 18, percentage: 12 },
    { rating: "2★", count: 10, percentage: 6 },
    { rating: "1★", count: 5, percentage: 3 },
  ]

  const categoryRatingsData = [
    { category: "Service Quality", rating: 4.8, reviews: 89, count: 89 },
    { category: "Food & Dining", rating: 4.6, reviews: 76, count: 76 },
    { category: "Cleanliness", rating: 4.7, reviews: 82, count: 82 },
    { category: "Staff Behavior", rating: 4.5, reviews: 71, count: 71 },
    { category: "Value for Money", rating: 4.2, reviews: 65, count: 65 },
    { category: "Location", rating: 4.9, reviews: 94, count: 94 },
  ]

  const handleAIAnalysis = (category: string) => {
    setSelectedCategory(category)
    setShowAIModal(true)
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with the latest information",
    })
    setIsLoading(false)
  }

  const handleExport = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: "Export Complete",
      description: "Your analytics report has been downloaded successfully",
    })
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#007abf] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analytics data...</p>
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
              <h3 className="text-lg font-semibold">Filter Analytics</h3>
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
                <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-50 border rounded-lg p-1 h-12">
          <TabsTrigger
            value="overview"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-[#007abf] data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <Activity className="h-4 w-4" />
            <span className="font-medium">Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-[#007abf] data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Trends</span>
          </TabsTrigger>
          <TabsTrigger
            value="sentiment"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-[#007abf] data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <Heart className="h-4 w-4" />
            <span className="font-medium">Sentiment</span>
          </TabsTrigger>
          <TabsTrigger
            value="competitor"
            className="flex items-center justify-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-[#007abf] data-[state=active]:shadow-sm rounded-md transition-all"
          >
            <Users className="h-4 w-4" />
            <span className="font-medium">Competitors</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#007abf]/10">
                <Activity className="h-5 w-5 text-[#007abf]" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Performance Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm border-t-4 border-t-[#007abf] hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#007abf]">4.69</p>
                      <p className="text-sm text-muted-foreground">Overall Rating</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+0.12 this month</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-[#007abf]/10">
                      <Star className="h-6 w-6 text-[#007abf]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-green-500 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">156</p>
                      <p className="text-sm text-muted-foreground">Total Reviews</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+18 this month</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-green-100">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-orange-500 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">124</p>
                      <p className="text-sm text-muted-foreground">Responded Reviews</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">89% response rate</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-orange-100">
                      <MessageCircle className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-purple-500 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">8</p>
                      <p className="text-sm text-muted-foreground">Ticketed Reviews</p>
                      <div className="flex items-center mt-1">
                        <TrendingDown className="h-3 w-3 text-orange-600 mr-1" />
                        <span className="text-xs text-orange-600">5% escalation rate</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Overall Review Rating</CardTitle>
                    <div className="p-1 rounded-full bg-yellow-100">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={overallRatingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {overallRatingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {data.value}% ({data.count} reviews)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) => (
                            <span style={{ color: entry.color, fontSize: "12px" }}>{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#007abf]">4.69</div>
                        <div className="text-sm text-muted-foreground">★ Average</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Review Count Distribution (1★–5★)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reviewDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{data.rating}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {data.count} reviews ({data.percentage}%)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="count" fill="#007abf" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Channel-wise Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformRatingsData.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img src={platform.logo || "/placeholder.svg"} alt={platform.platform} className="w-6 h-6" />
                          <span className="font-medium text-sm">{platform.platform}</span>
                          <span className="text-xs text-gray-500">({platform.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(platform.rating / 5) * 100}%`,
                                backgroundColor: getRatingColor(platform.rating),
                              }}
                            ></div>
                          </div>
                          <span
                            className="font-bold text-sm min-w-[2rem]"
                            style={{ color: getRatingColor(platform.rating) }}
                          >
                            {platform.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Location-wise Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locationRatingsData.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{location.location}</span>
                          <span className="text-xs text-gray-500">({location.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${(location.rating / 5) * 100}%`,
                                backgroundColor: getRatingColor(location.rating),
                              }}
                            ></div>
                          </div>
                          <span
                            className="font-bold text-sm min-w-[2rem]"
                            style={{ color: getRatingColor(location.rating) }}
                          >
                            {location.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 mt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#007abf]/10">
                <TrendingUp className="h-5 w-5 text-[#007abf]" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Trends & Analytics</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Rating Trend</CardTitle>
                    <Select value={ratingTrendPeriod} onValueChange={setRatingTrendPeriod}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratingTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#007abf"
                          strokeWidth={3}
                          dot={{ fill: "#007abf", strokeWidth: 2, r: 4 }}
                          name="Rating"
                        />
                        <Line
                          type="monotone"
                          dataKey="reviews"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                          name="Review Count"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Review Sentiment</CardTitle>
                    <Select value={sentimentTrendPeriod} onValueChange={setSentimentTrendPeriod}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sentimentTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}%
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="positive"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          name="Positive"
                        />
                        <Area
                          type="monotone"
                          dataKey="neutral"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          name="Neutral"
                        />
                        <Area
                          type="monotone"
                          dataKey="negative"
                          stackId="1"
                          stroke="#ef4444"
                          fill="#ef4444"
                          name="Negative"
                        />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Rating Trend by Channel</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select value={channelTrendPeriod} onValueChange={setChannelTrendPeriod}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="p-1 rounded-full bg-yellow-100">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={channelTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Google"
                          stroke="#4285f4"
                          strokeWidth={2}
                          dot={{ fill: "#4285f4", strokeWidth: 2, r: 3 }}
                          name="Google"
                        />
                        <Line
                          type="monotone"
                          dataKey="Facebook"
                          stroke="#1877f2"
                          strokeWidth={2}
                          dot={{ fill: "#1877f2", strokeWidth: 2, r: 3 }}
                          name="Facebook"
                        />
                        <Line
                          type="monotone"
                          dataKey="TripAdvisor"
                          stroke="#00af87"
                          strokeWidth={2}
                          dot={{ fill: "#00af87", strokeWidth: 2, r: 3 }}
                          name="TripAdvisor"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Responded & Ticketed Reviews Trend</CardTitle>
                    <Select value={responsesTrendPeriod} onValueChange={setResponsesTrendPeriod}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ratingTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="responded" fill="#10b981" name="Responded Reviews" />
                        <Bar dataKey="ticketed" fill="#f59e0b" name="Ticketed Reviews" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Rating by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryRatingsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="rating" fill="#007abf" name="Average Rating" />
                        <Bar dataKey="count" fill="#10b981" name="Review Count" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6 mt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#007abf]/10">
                <Heart className="h-5 w-5 text-[#007abf]" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Sentiment & Emotion Analytics</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Overall Review Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {data.value}% ({data.count} reviews)
                                  </p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value, entry) => (
                            <span style={{ color: entry.color, fontSize: "12px" }}>{value}</span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Review Sentiment by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categorySentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}%
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                        <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral" />
                        <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Review Sentiment by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={locationSentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="location" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}%
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                        <Bar dataKey="neutral" stackId="a" fill="#f59e0b" name="Neutral" />
                        <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Review Word Cloud</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={wordCloudFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWordCloudFilter("all")}
                        className="text-xs"
                      >
                        All
                      </Button>
                      <Button
                        variant={wordCloudFilter === "positive" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWordCloudFilter("positive")}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white"
                      >
                        Positive
                      </Button>
                      <Button
                        variant={wordCloudFilter === "negative" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWordCloudFilter("negative")}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white"
                      >
                        Negative
                      </Button>
                      <Button
                        variant={wordCloudFilter === "neutral" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWordCloudFilter("neutral")}
                        className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Neutral
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
                    <div className="text-center space-y-4">
                      <div className="flex flex-wrap justify-center items-center gap-2 max-w-md">
                        {wordCloudData.map((word, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 rounded cursor-pointer transition-all hover:scale-110"
                            style={{
                              fontSize: `${Math.max(10, Math.min(24, word.size))}px`,
                              color: word.color,
                              fontWeight: word.size > 20 ? "bold" : "normal",
                            }}
                            title={`${word.text}: ${word.count} mentions`}
                          >
                            {word.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="competitor" className="space-y-6 mt-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-[#007abf]/10">
                <Users className="h-5 w-5 text-[#007abf]" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Competitor Analysis</h2>
            </div>

            <div className="space-y-6">
              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">Competitor Ratings Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Channel</th>
                          <th className="text-center p-3 font-medium">Your Business</th>
                          <th className="text-center p-3 font-medium">Competitor A</th>
                          <th className="text-center p-3 font-medium">Competitor B</th>
                          <th className="text-center p-3 font-medium">Competitor C</th>
                        </tr>
                      </thead>
                      <tbody>
                        {platformRatingsData.map((platform, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3 flex items-center space-x-2">
                              <img
                                src={platform.logo || "/placeholder.svg"}
                                alt={platform.platform}
                                className="w-5 h-5"
                              />
                              <span className="font-medium">{platform.platform}</span>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(platform.rating) }}>
                                  {platform.rating}
                                </span>
                                <span className="text-xs text-gray-500">({platform.reviews} reviews)</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(platform.rating - 0.2) }}>
                                  {(platform.rating - 0.2).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(platform.reviews * 0.8)} reviews)
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(platform.rating - 0.5) }}>
                                  {(platform.rating - 0.5).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(platform.reviews * 1.2)} reviews)
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(platform.rating - 0.8) }}>
                                  {(platform.rating - 0.8).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(platform.reviews * 0.6)} reviews)
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-medium">AI-based Category Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Category</th>
                          <th className="text-center p-3 font-medium">Your Business</th>
                          <th className="text-center p-3 font-medium">Competitor A</th>
                          <th className="text-center p-3 font-medium">Competitor B</th>
                          <th className="text-center p-3 font-medium">Competitor C</th>
                          <th className="text-center p-3 font-medium">AI Analysis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryRatingsData.map((category, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-[#007abf]"></div>
                                <span className="font-medium">{category.category}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(category.rating) }}>
                                  {category.rating}
                                </span>
                                <span className="text-xs text-gray-500">({category.reviews} mentions)</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(category.rating - 0.3) }}>
                                  {(category.rating - 0.3).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(category.reviews * 0.7)} mentions)
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(category.rating - 0.6) }}>
                                  {(category.rating - 0.6).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(category.reviews * 1.1)} mentions)
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex flex-col items-center">
                                <span className="font-bold" style={{ color: getRatingColor(category.rating - 0.9) }}>
                                  {(category.rating - 0.9).toFixed(1)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({Math.floor(category.reviews * 0.5)} mentions)
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAIAnalysis(category.category)}
                                className="p-1 h-8 w-8"
                              >
                                <Lightbulb className="h-4 w-4 text-yellow-600" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Competitor Rating Trend</CardTitle>
                    <Select value={competitorTrendPeriod} onValueChange={setCompetitorTrendPeriod}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={competitorTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 border rounded-lg shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                                      {entry.name}: {entry.value}
                                    </p>
                                  ))}
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="us"
                          stroke="#007abf"
                          strokeWidth={3}
                          dot={{ fill: "#007abf", strokeWidth: 2, r: 4 }}
                          name="Your Business"
                        />
                        <Line
                          type="monotone"
                          dataKey="compA"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                          name="Competitor A"
                        />
                        <Line
                          type="monotone"
                          dataKey="compB"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
                          name="Competitor B"
                        />
                        <Line
                          type="monotone"
                          dataKey="compC"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                          name="Competitor C"
                        />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>AI Analysis: {selectedCategory}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-900">Key Insights</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your {selectedCategory.toLowerCase()} performance is above industry average</li>
                <li>• Competitor A shows consistent improvement in this area</li>
                <li>• Recent customer feedback highlights specific improvement opportunities</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 text-green-900">Recommendations</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Focus on maintaining current quality standards</li>
                <li>• Monitor competitor strategies for potential improvements</li>
                <li>• Consider customer feedback for targeted enhancements</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chart Detail Dialog */}
      <Dialog open={!!selectedChart} onOpenChange={() => setSelectedChart(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chart Details</DialogTitle>
          </DialogHeader>
          {selectedChart && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Selected Data Point</h4>
                <pre className="text-sm overflow-auto">{JSON.stringify(selectedChart.data, null, 2)}</pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
