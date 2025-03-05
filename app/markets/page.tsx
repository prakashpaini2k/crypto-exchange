"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { MarketTable } from "@/components/market-table"
import type { MarketPair } from "@/lib/types"
import { generateMarketPairs } from "@/lib/utils"

export default function MarketsPage() {
  const [markets, setMarkets] = useState<MarketPair[]>([])
  const [filteredMarkets, setFilteredMarkets] = useState<MarketPair[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

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
    if (searchQuery.trim() === "") {
      setFilteredMarkets(markets)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredMarkets(
        markets.filter(
          (market) =>
            market.pair.toLowerCase().includes(query) ||
            market.baseAsset.toLowerCase().includes(query) ||
            market.quoteAsset.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery, markets])

  const filterByQuote = (quote: string) => {
    if (quote === "all") {
      setFilteredMarkets(markets)
    } else {
      setFilteredMarkets(markets.filter((market) => market.quoteAsset === quote))
    }
    setSearchQuery("")
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

              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList className="bg-zinc-800">
                  <TabsTrigger value="all" onClick={() => filterByQuote("all")}>
                    All
                  </TabsTrigger>
                  <TabsTrigger value="usdt" onClick={() => filterByQuote("USDT")}>
                    USDT
                  </TabsTrigger>
                  <TabsTrigger value="btc" onClick={() => filterByQuote("BTC")}>
                    BTC
                  </TabsTrigger>
                  <TabsTrigger value="eth" onClick={() => filterByQuote("ETH")}>
                    ETH
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Tabs defaultValue="spot" className="w-full">
              <TabsList className="bg-zinc-800 mb-6">
                <TabsTrigger value="spot">Spot</TabsTrigger>
                <TabsTrigger value="futures">Futures</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>

              <TabsContent value="spot">
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
                ) : filteredMarkets.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <p className="text-zinc-400">No markets found matching your search criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-zinc-700 hover:bg-zinc-800"
                      onClick={() => {
                        setSearchQuery("")
                        setFilteredMarkets(markets)
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <MarketTable markets={filteredMarkets} />
                )}
              </TabsContent>

              <TabsContent value="futures">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                  <p className="text-zinc-400">Futures trading coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="options">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                  <p className="text-zinc-400">Options trading coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <footer className="border-t border-zinc-800 py-6">
          <div className="container text-center text-sm text-zinc-400">
            <p>© {new Date().getFullYear()} CryptoEx. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

