"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  DollarSign,
  Gift,
  Globe,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Star,
  User,
  Wallet,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CryptoTable } from "@/components/crypto-table"
import { PortfolioTable } from "@/components/portfolio-table"
import { OrderHistory } from "@/components/order-history"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import type { CryptoCurrency, PortfolioAsset, Order } from "@/lib/types"
import { formatCurrency, generatePortfolio, generateOrderHistory } from "@/lib/utils"

export default function HomePage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalBalance, setTotalBalance] = useState(0)
  const [dailyChange, setDailyChange] = useState({ value: 0, percentage: 0 })

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/crypto")

        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrency data")
        }

        const data = await response.json()
        setCryptoData(data)

        // Generate portfolio based on the fetched crypto data
        const portfolioData = generatePortfolio(data)
        setPortfolio(portfolioData)

        // Generate order history
        const orderData = generateOrderHistory()
        setOrders(orderData)

        // Set fixed total balance
        setTotalBalance(6302560)

        // Calculate 24h change (minimal for stability)
        setDailyChange({ value: 1250, percentage: 0.02 })

        setLoading(false)
      } catch (err) {
        console.error("Error fetching crypto data:", err)
        setError("Failed to load cryptocurrency data. Please try again later.")
        setLoading(false)
      }
    }

    fetchCryptoData()

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <SidebarNavigation className="hidden md:flex" />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-zinc-800 bg-zinc-900 p-0">
                  <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-yellow-500">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        width={32}
                        height={32}
                        alt="Binance Logo"
                        className="rounded-full"
                      />
                      <span>Binance</span>
                    </Link>
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setSidebarOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <nav className="grid gap-1 px-2 py-4">
                    <Link
                      href="/home"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Wallet className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/markets"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Star className="h-5 w-5" />
                      Markets
                    </Link>
                    <Link
                      href="/trade"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <DollarSign className="h-5 w-5" />
                      Trade
                    </Link>
                    <Link
                      href="/wallet"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Wallet className="h-5 w-5" />
                      Wallet
                    </Link>
                    <Link
                      href="/earn"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Gift className="h-5 w-5" />
                      Earn
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center gap-2 font-bold text-yellow-500 md:hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Binance Logo"
                  className="rounded-full"
                />
                <span>Binance</span>
              </Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <Input placeholder="Search..." className="w-64 rounded-full border-zinc-700 bg-zinc-800 pl-10" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Moon className="h-5 w-5" />
                <span className="sr-only">Theme</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-zinc-800 bg-zinc-900">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-800">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-800">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Wallet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-800">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-800">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-800" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-8">
          <div className="container">
            {/* Balance Overview */}
            <section className="mb-8">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">Estimated Balance</h3>
                    <div className="mt-2 flex items-end gap-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
                          <div
                            className={`text-sm font-medium ${dailyChange.percentage >= 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {dailyChange.percentage >= 0 ? "+" : ""}
                            {dailyChange.percentage.toFixed(2)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">24h Change</h3>
                    <div className="mt-2 flex items-end gap-2">
                      {loading ? (
                        <div className="h-8 w-32 animate-pulse rounded bg-zinc-800"></div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold">
                            {dailyChange.value >= 0 ? "+" : ""}
                            {formatCurrency(dailyChange.value)}
                          </div>
                          <div
                            className={`text-sm font-medium ${dailyChange.percentage >= 0 ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {dailyChange.percentage >= 0 ? "+" : ""}
                            {dailyChange.percentage.toFixed(2)}%
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:col-span-2">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400">Your Assets</h3>
                      <div className="mt-2 text-lg font-medium">
                        {loading ? (
                          <div className="h-6 w-32 animate-pulse rounded bg-zinc-800"></div>
                        ) : (
                          `${portfolio.length} Cryptocurrencies`
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Deposit</Button>
                      <Button variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Portfolio */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Portfolio</h2>
                <Button variant="outline" size="sm" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Buy Crypto
                </Button>
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
              ) : error ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center">
                  <p className="text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4 px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <PortfolioTable assets={portfolio} />
              )}
            </section>

            {/* Market Overview */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Market Overview</h2>
                <Link href="/markets" className="text-sm text-yellow-500 hover:underline">
                  View All Markets
                </Link>
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
              ) : error ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-center">
                  <p className="text-red-500">{error}</p>
                  <Button
                    variant="outline"
                    className="mt-4 px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <CryptoTable cryptoData={cryptoData.slice(0, 5)} />
              )}
            </section>

            {/* Order History */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Link href="#" className="text-sm text-yellow-500 hover:underline">
                  View All Orders
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
                <OrderHistory orders={orders} />
              )}
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-6">
          <div className="container text-center text-sm text-zinc-400">
            <p>© {new Date().getFullYear()} Binance. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

