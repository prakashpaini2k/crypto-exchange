"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Wallet, LineChart, Landmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import type { WalletAsset } from "@/lib/types"
import { formatCurrency, generateWalletAssets } from "@/lib/utils"

export default function AssetsOverviewPage() {
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [assetDistribution, setAssetDistribution] = useState<{ name: string; value: number; percentage: number }[]>([])

  useEffect(() => {
    // Simulate API fetch
    const fetchAssetData = () => {
      setLoading(true)
      // In a real app, this would be an API call
      const assetData = generateWalletAssets()
      setAssets(assetData)

      // Set total balance to 231,000 USDT
      const total = 231000
      setTotalBalance(total)

      // Calculate asset distribution - only USDT
      const distribution = [
        {
          name: "Tether",
          value: 231000,
          percentage: 100,
        },
      ]

      setAssetDistribution(distribution)
      setLoading(false)
    }

    fetchAssetData()
  }, [])

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:flex" />

      <div className="flex flex-col flex-1">
        <main className="flex-1 py-8">
          <div className="container">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Assets Overview</h1>
              <p className="text-zinc-400">View and manage all your assets across different account types</p>
            </div>

            {/* Balance Overview */}
            <section className="mb-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Total Balance</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Spot Balance</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className="text-2xl font-bold">{formatCurrency(totalBalance * 0.85)}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Options Balance</h3>
                    <div className="mt-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <div className="text-2xl font-bold">{formatCurrency(totalBalance * 0.15)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Account Types */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Account Types</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Link
                  href="/assets/spot"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Spot Account</h3>
                  <p className="text-zinc-400 mb-4">Manage your spot trading assets</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{formatCurrency(totalBalance * 0.85)}</span>
                    <ArrowRight className="h-4 w-4 text-yellow-500" />
                  </div>
                </Link>

                <Link
                  href="/assets/options"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Options Account</h3>
                  <p className="text-zinc-400 mb-4">Manage your options trading assets</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{formatCurrency(totalBalance * 0.15)}</span>
                    <ArrowRight className="h-4 w-4 text-yellow-500" />
                  </div>
                </Link>

                <Link
                  href="#"
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Earn Account</h3>
                  <p className="text-zinc-400 mb-4">Manage your staking and savings</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{formatCurrency(0)}</span>
                    <ArrowRight className="h-4 w-4 text-yellow-500" />
                  </div>
                </Link>
              </div>
            </section>

            {/* Asset Distribution */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Asset Distribution</h2>
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
              ) : (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col space-y-4">
                      {assetDistribution.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center">
                              <span className="font-bold text-sm">{asset.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-sm text-zinc-400">{asset.percentage.toFixed(2)}% of portfolio</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatCurrency(asset.value)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Quick Actions */}
            {/* <section>
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <Button className="bg-yellow-500 text-black hover:bg-yellow-600 h-auto py-4 flex flex-col items-center">
                  <span>Deposit</span>
                  <span className="text-xs mt-1 opacity-80">Add funds to your account</span>
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white h-auto py-4 flex flex-col items-center"
                >
                  <span>Withdraw</span>
                  <span className="text-xs mt-1 opacity-80">Withdraw funds to external wallet</span>
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white h-auto py-4 flex flex-col items-center"
                >
                  <span>Transfer</span>
                  <span className="text-xs mt-1 opacity-80">Move funds between accounts</span>
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white h-auto py-4 flex flex-col items-center"
                >
                  <span>Convert</span>
                  <span className="text-xs mt-1 opacity-80">Convert between cryptocurrencies</span>
                </Button>
              </div>
            </section> */}
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

