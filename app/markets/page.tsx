"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { MarketTable } from "@/components/market-table"
import type { MarketPair } from "@/lib/types"
import { generateMarketPairs } from "@/lib/utils"

export default function MarketsPage() {
  const [markets, setMarkets] = useState<MarketPair[]>([])
  const [filteredMarkets, setFilteredMarkets] = useState<MarketPair[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeQuote, setActiveQuote] = useState("all")
  const [activeMarketType, setActiveMarketType] = useState<"spot" | "futures" | "options">("spot")

  useEffect(() => {
    // Simulate API fetch
    const fetchMarkets = () => {
      setLoading(true)
      // In a real app, this would be an API call
      const data = generateMarketPairs()
      setMarkets(data)
      setFilteredMarkets(data)
      setLoading(false)
    }

    fetchMarkets()

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchMarkets, 60000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    let filtered = markets

    // Filter by quote asset if not "all"
    if (activeQuote !== "all") {
      filtered = filtered.filter((market) => market.quoteAsset === activeQuote)
    }

    // Apply search query if present
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (market) =>
          market.pair.toLowerCase().includes(query) ||
          market.baseAsset.toLowerCase().includes(query) ||
          market.quoteAsset.toLowerCase().includes(query),
      )
    }

    setFilteredMarkets(filtered)
  }, [searchQuery, markets, activeQuote])

  const filterByQuote = (quote: string) => {
    setActiveQuote(quote)
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:flex" />

      <div className="flex flex-col flex-1">
        <main className="flex-1 py-8">
          <div className="container">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Markets</h1>
              <p className="text-zinc-400">View all cryptocurrency markets and trade pairs</p>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input
                  placeholder="Search markets..."
                  className="pl-10 border-zinc-700 bg-zinc-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
                <Button
                  variant={activeQuote === "all" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeQuote === "all"
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-zinc-700 hover:bg-zinc-800"
                  }
                  onClick={() => filterByQuote("all")}
                >
                  All
                </Button>
                <Button
                  variant={activeQuote === "USDT" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeQuote === "USDT"
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-zinc-700 hover:bg-zinc-800"
                  }
                  onClick={() => filterByQuote("USDT")}
                >
                  USDT
                </Button>
                <Button
                  variant={activeQuote === "BTC" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeQuote === "BTC"
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-zinc-700 hover:bg-zinc-800"
                  }
                  onClick={() => filterByQuote("BTC")}
                >
                  BTC
                </Button>
                <Button
                  variant={activeQuote === "ETH" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeQuote === "ETH"
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "border-zinc-700 hover:bg-zinc-800"
                  }
                  onClick={() => filterByQuote("ETH")}
                >
                  ETH
                </Button>
              </div>
            </div>

            <div className="mb-6 flex border-b border-zinc-800">
              <button
                className={`px-4 py-2 font-medium text-sm ${activeMarketType === "spot" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setActiveMarketType("spot")}
              >
                Spot
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeMarketType === "futures" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setActiveMarketType("futures")}
              >
                Futures
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeMarketType === "options" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-zinc-400 hover:text-white"}`}
                onClick={() => setActiveMarketType("options")}
              >
                Options
              </button>
            </div>

            {loading ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-zinc-800"></div>
                        <div className="h-3 w-16 animate-pulse rounded bg-zinc-800"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-20 animate-pulse rounded bg-zinc-800"></div>
                        <div className="h-3 w-12 animate-pulse rounded bg-zinc-800"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredMarkets.filter((m) => m.market === activeMarketType).length === 0 ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                <p className="text-zinc-400">No markets found matching your search criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-zinc-700 hover:bg-zinc-800"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveQuote("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <MarketTable markets={filteredMarkets} marketType={activeMarketType} />
            )}
          </div>
        </main>

        <footer className="border-t border-zinc-800 py-6">
          <div className="container text-center text-sm text-zinc-400">
            <p>© {new Date().getFullYear()} Binance. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

