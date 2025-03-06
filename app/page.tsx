import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart2, ChevronDown, Globe, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CryptoCard } from "@/components/crypto-card"
import { NewsList } from "@/components/news-list"
import type { CryptoCurrency } from "@/lib/types"
import { generateNewsData } from "@/lib/utils"

async function getCryptoData(): Promise<CryptoCurrency[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch cryptocurrency data:", error)
    return []
  }
}

export default async function LandingPage() {
  const cryptoData = await getCryptoData()
  const newsData = generateNewsData()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky flex justify-center top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
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
            <nav className="hidden md:flex gap-6">
              <Link href="/markets" className="text-sm hover:text-yellow-500">
                Markets
              </Link>
              <Link href="/trade" className="text-sm hover:text-yellow-500">
                Trade
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm hover:text-yellow-500">
                  Derivatives <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full hidden w-48 flex-col gap-1 rounded-md border border-zinc-800 bg-zinc-900 p-2 group-hover:flex">
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Futures
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Options
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Leveraged Tokens
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm hover:text-yellow-500">
                  Earn <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full hidden w-48 flex-col gap-1 rounded-md border border-zinc-800 bg-zinc-900 p-2 group-hover:flex">
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Staking
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Savings
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Launchpad
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm hover:text-yellow-500">
                  More <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full hidden w-48 flex-col gap-1 rounded-md border border-zinc-800 bg-zinc-900 p-2 group-hover:flex">
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Academy
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Blog
                  </Link>
                  <Link href="#" className="rounded px-3 py-2 text-sm hover:bg-zinc-800">
                    Research
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm hover:text-yellow-500 sm:block">
              Log In
            </Link>
            <Link href="/login">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container m-auto py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Buy & Sell Crypto <span className="text-yellow-500">in Minutes</span>
            </h1>
            <p className="text-lg text-zinc-400">
              Join the world's largest crypto exchange with the lowest fees in the industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/markets">
                <Button size="lg"  className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                  View Markets
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* <Image
              src="/placeholder.svg?height=500&width=600"
              width={600}
              height={500}
              alt="Trading Platform"
              className="rounded-lg"
            /> */}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-10">
        <div className="container m-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Market Trends</h2>
            <Link href="/markets" className="text-sm text-yellow-500 hover:underline flex items-center">
              View all markets <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {cryptoData.length > 0
              ? cryptoData.slice(0, 5).map((coin) => <CryptoCard key={coin.id} crypto={coin} />)
              : // Fallback data if API fails
                [
                  { name: "Bitcoin", symbol: "BTC", price: "$43,567.20", change: "+2.34%" },
                  { name: "Ethereum", symbol: "ETH", price: "$3,256.12", change: "+1.56%" },
                  { name: "Binance Coin", symbol: "BNB", price: "$412.35", change: "+0.89%" },
                  { name: "Solana", symbol: "SOL", price: "$102.78", change: "+4.12%" },
                  { name: "Cardano", symbol: "ADA", price: "$0.52", change: "-1.24%" },
                ].map((coin, index) => (
                  <div key={index} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-zinc-400">{coin.symbol}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="font-medium">{coin.price}</div>
                      <div className="text-sm text-emerald-500">{coin.change}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Trading Volume Stats */}
      <section className="py-16 bg-black">
        <div className="container m-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">$76B+</div>
              <div className="mt-2 text-zinc-400">24h Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">350+</div>
              <div className="mt-2 text-zinc-400">Cryptocurrencies Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">120M+</div>
              <div className="mt-2 text-zinc-400">Registered Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">&lt;0.10%</div>
              <div className="mt-2 text-zinc-400">Lowest Transaction Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container m-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Latest Crypto News</h2>
            <Link href="#" className="text-sm text-yellow-500 hover:underline flex items-center">
              View all news <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <NewsList news={newsData} />
        </div>
      </section>

      {/* Features */}
      <section className="container m-auto py-20">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Why Choose Binance</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Secure Asset Fund</h3>
            <p className="text-zinc-400">
              We secure your funds with industry-leading security protocols and insurance.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
              <BarChart2 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Advanced Trading Tools</h3>
            <p className="text-zinc-400">
              Access professional charting tools, real-time order books, and historical data.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Global Accessibility</h3>
            <p className="text-zinc-400">Trade from anywhere with support for multiple languages and currencies.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-zinc-900 to-black py-20">
        <div className="container text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Start Trading Today</h2>
          <p className="mx-auto mb-8 max-w-2xl text-zinc-400">
            Join millions of users trading on Binance. Create an account in minutes and start your crypto journey.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-600">
              Create Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-12">
        <div className="container m-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {/* <div>
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
              <p className="mt-4 text-sm text-zinc-400">The world's leading cryptocurrency exchange platform.</p>
            </div> */}
            <div>
              <h3 className="mb-4 font-medium">Products</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Exchange
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Institutional
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Earn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Card
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Support</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Fees
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
            <p>© {new Date().getFullYear()} Binance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

