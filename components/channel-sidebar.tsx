"use client"

import { Button } from "@/components/ui/button"

interface ChannelSidebarProps {
  selectedChannel: string
  onChannelSelect: (channel: string) => void
}

const channels = [
  {
    id: "all",
    name: "All Channels",
    logo: "/all-channels-logo.png",
  },
  {
    id: "google",
    name: "Google",
    logo: "/google-logo.png",
  },
  {
    id: "facebook",
    name: "Facebook",
    logo: "/facebook-logo.png",
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    logo: "/tripadvisor-logo.png",
  },
  { id: "expedia", name: "Expedia", logo: "/expedia-logo.png" },
]

export function ChannelSidebar({ selectedChannel, onChannelSelect }: ChannelSidebarProps) {
  return (
    <div className="w-80 border-r bg-white shadow-sm p-6 fixed left-0 top-0 h-screen flex flex-col z-10">
      <div className="mb-6 pt-20">
        <p className="text-sm text-gray-600 leading-relaxed">
          Monitor and manage customer reviews across all your platforms. Select a channel to view specific feedback and
          respond to customer concerns.
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {channels.map((channel) => (
          <Button
            key={channel.id}
            variant="outline"
            className={`w-full h-16 flex items-center justify-start gap-4 p-4 transition-all duration-200 ${
              selectedChannel === channel.id
                ? "border-[#007abf] bg-[#007abf]/5 text-[#007abf] hover:bg-[#007abf]/10 hover:text-[#007abf]"
                : "bg-white hover:bg-gray-50 border-gray-200 text-gray-900 hover:text-gray-900"
            }`}
            onClick={() => onChannelSelect(channel.id)}
          >
            <div className="flex items-center justify-center w-8 h-8">
              <img src={channel.logo || "/placeholder.svg"} alt={channel.name} className="w-6 h-6 object-contain" />
            </div>
            <div className="text-sm font-medium">{channel.name}</div>
          </Button>
        ))}
      </div>
    </div>
  )
}
