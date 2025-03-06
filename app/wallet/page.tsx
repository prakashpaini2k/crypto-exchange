"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpDown, Download, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { Badge } from "@/components/ui/badge"
import type { WalletAsset, Transaction } from "@/lib/types"
import { formatCurrency, formatNumber, formatDate, generateWalletAssets, generateTransactionHistory } from "@/lib/utils"

export default function WalletPage() {
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    // Simulate API fetch
    const fetchWalletData = () => {
      setLoading(true)
      // In a real app, this would be an API call
      const assetData = generateWalletAssets()
      const txData = generateTransactionHistory()

      setAssets(assetData)
      setTransactions(txData)

      // Set fixed total balance
      setTotalBalance(6302560)

      setLoading(false)
    }

    fetchWalletData()
  }, [])

  // Filter assets based on search query
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:flex" />

      <div className="flex flex-col flex-1">
        <main className="flex-1 py-8">
          <div className="container">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Wallet</h1>
              <p className="text-zinc-400">Manage your crypto assets</p>
            </div>

            {/* Balance Overview */}
            <section className="mb-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Estimated Balance</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:col-span-3">
                    <div className="flex gap-2">
                      <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                        <Download className="mr-2 h-4 w-4" />
                        Deposit
                      </Button>
                      <Button variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                        <Upload className="mr-2 h-4 w-4" />
                        Withdraw
                      </Button>
                      <Button variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Transfer
                      </Button>
                    </div>
                    <div className="hidden md:block">
                      <Link
                        href="/wallet/history"
                        className="text-sm text-yellow-500 hover:underline flex items-center"
                      >
                        Transaction History <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Assets */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Assets</h2>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <Input
                    placeholder="Search assets..."
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
              ) : filteredAssets.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-10 text-center">
                  <p className="text-zinc-400">No assets found matching your search criteria.</p>
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
                            Asset
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Total Balance
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Available Balance
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            In Order
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Value
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAssets.map((asset) => (
                          <tr key={asset.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={asset.image || "/placeholder.svg"}
                                  alt={asset.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full"
                                />
                                <div>
                                  <div className="font-medium">{asset.name}</div>
                                  <div className="text-sm text-zinc-400">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                              {formatNumber(asset.balance, asset.balance < 0.01 ? 6 : 4)} {asset.symbol}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              {formatNumber(asset.availableBalance, asset.availableBalance < 0.01 ? 6 : 4)}{" "}
                              {asset.symbol}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-zinc-400">
                              {formatNumber(asset.inOrder, asset.inOrder < 0.01 ? 6 : 4)} {asset.symbol}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                              {formatCurrency(asset.value)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                                  Deposit
                                </Button>
                                <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                                  Withdraw
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

            {/* Transaction History */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <Link href="/wallet/history" className="text-sm text-yellow-500 hover:underline md:hidden">
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
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
              ) : (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">
                            Date
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">
                            Type
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">
                            Asset
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Amount
                          </th>
                          <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 5).map((tx) => (
                          <tr key={tx.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="whitespace-nowrap px-6 py-4 text-sm">{formatDate(tx.date)}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Badge
                                variant="outline"
                                className={`${
                                  tx.type === "deposit"
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : tx.type === "withdrawal"
                                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                                      : tx.type === "buy"
                                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        : tx.type === "sell"
                                          ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                }`}
                              >
                                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                              </Badge>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{tx.asset}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              {formatNumber(tx.amount, tx.amount < 0.01 ? 6 : 4)} {tx.asset}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right">
                              <Badge
                                variant="outline"
                                className={`${
                                  tx.status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : tx.status === "pending"
                                      ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                      : "bg-red-500/10 text-red-500 border-red-500/20"
                                }`}
                              >
                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                              </Badge>
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

