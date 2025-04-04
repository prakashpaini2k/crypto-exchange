"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { formatCurrency, generateMarketPairs } from "@/lib/utils"

// Define an options position type
interface OptionsPosition {
  id: string
  pair: string
  baseAsset: string
  quoteAsset: string
  strikePrice: number
  expiryDate: string
  optionType: "call" | "put"
  quantity: number
  averagePrice: number
  currentPrice: number
  value: number
  pnl: number
  pnlPercentage: number
}

export default function OptionsAssetsPage() {
  const [positions, setPositions] = useState<OptionsPosition[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [totalPnl, setTotalPnl] = useState(0)

  useEffect(() => {
    // Simulate API fetch
    const fetchOptionsData = () => {
      setLoading(true)

      // Get market data for options
      const marketData = generateMarketPairs().filter((m) => m.market === "options")

      // Generate mock positions based on market data
      const mockPositions: OptionsPosition[] = marketData.map((market, index) => {
        const quantity = Math.floor(Math.random() * 10) + 1
        const averagePrice = market.lastPrice * (0.9 + Math.random() * 0.2) // Random entry price around current price
        const value = quantity * market.lastPrice
        const pnl = quantity * (market.lastPrice - averagePrice)
        const pnlPercentage = (pnl / (quantity * averagePrice)) * 100

        return {
          id: `pos-${index + 1}`,
          pair: market.pair,
          baseAsset: market.baseAsset,
          quoteAsset: market.quoteAsset,
          strikePrice: market.strikePrice || 0,
          expiryDate: market.expiryDate || "",
          optionType: market.optionType || "call",
          quantity,
          averagePrice,
          currentPrice: market.lastPrice,
          value,
          pnl,
          pnlPercentage,
        }
      })

      setPositions(mockPositions)

      // Set fixed values - 231,000 USDT total balance
      // For options, we'll say 15% of total is allocated to options
      setTotalValue(2730000 * 0.15)
      setTotalPnl(0) // No options P&L

      setLoading(false)
    }

    fetchOptionsData()
  }, [])

  // Filter positions based on search query
  const filteredPositions = positions.filter(
    (position) =>
      position.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.baseAsset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.quoteAsset.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:flex" />

      <div className="flex flex-col flex-1">
        <main className="flex-1 py-8">
          <div className="container">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Options Assets</h1>
              <p className="text-zinc-400">Manage your options trading positions</p>
            </div>

            {/* Balance Overview */}
            <section className="mb-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Total Options Value</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Unrealized P&L</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className={`text-2xl font-bold ${totalPnl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                          {totalPnl >= 0 ? "+" : ""}
                          {formatCurrency(totalPnl)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                      <Download className="mr-2 h-4 w-4" />
                      Deposit
                    </Button>
                    <Button variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                      <Upload className="mr-2 h-4 w-4" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Options Positions */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Options Positions</h2>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    placeholder="Search positions..."
                    className="pl-10 border-zinc-700 bg-zinc-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {loading ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-800"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-zinc-800"></div>
                            <div className="h-3 w-16 animate-pulse rounded bg-zinc-800"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-20 animate-pulse rounded bg-zinc-800"></div>
                          <div className="h-3 w-12 animate-pulse rounded bg-zinc-800"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : filteredPositions.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                  <p className="text-zinc-400">No options positions found matching your search criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4 px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">
                            Position
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Strike
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Expiry
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Quantity
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Avg. Price
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Current Price
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Value
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            P&L
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPositions.map((position) => (
                          <tr key={position.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">{position.pair}</div>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    position.optionType === "call"
                                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                      : "bg-red-500/10 text-red-500 border-red-500/20"
                                  }`}
                                >
                                  {position.optionType.toUpperCase()}
                                </Badge>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                              {formatCurrency(position.strikePrice)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">{position.expiryDate}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">{position.quantity}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              {formatCurrency(position.averagePrice)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              {formatCurrency(position.currentPrice)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                              {formatCurrency(position.value)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              <div className={`font-medium ${position.pnl >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                                {position.pnl >= 0 ? "+" : ""}
                                {formatCurrency(position.pnl)}
                              </div>
                              <div
                                className={`text-xs ${position.pnlPercentage >= 0 ? "text-emerald-500" : "text-red-500"}`}
                              >
                                {position.pnlPercentage >= 0 ? "+" : ""}
                                {position.pnlPercentage.toFixed(2)}%
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <Link href={`/trade/${position.pair.replace("/", "_")}`}>
                                  <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                                    Trade
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                                  Close
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
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

