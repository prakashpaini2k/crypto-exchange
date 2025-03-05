import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CryptoCurrency, PortfolioAsset, NewsItem, Order, MarketPair } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(value / 100)
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " years ago"

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " months ago"

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " days ago"

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " hours ago"

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minutes ago"

  return Math.floor(seconds) + " seconds ago"
}

// Sample portfolio data - in a real app, this would come from a database
export function generatePortfolio(cryptoData: CryptoCurrency[]): PortfolioAsset[] {
  // Sample holdings - these would normally come from a user's database record
  const holdings = [
    { id: "bitcoin", amount: 0.12, avgBuyPrice: 41200 },
    { id: "ethereum", amount: 1.5, avgBuyPrice: 2950 },
    { id: "solana", amount: 12.5, avgBuyPrice: 95 },
    { id: "cardano", amount: 2500, avgBuyPrice: 0.48 },
    { id: "binancecoin", amount: 2.8, avgBuyPrice: 380 },
    { id: "ripple", amount: 1500, avgBuyPrice: 0.52 },
  ]

  // Map holdings to portfolio assets with current prices
  const portfolio = holdings
    .map((holding) => {
      const crypto = cryptoData.find((c) => c.id === holding.id)
      if (!crypto) return null

      const value = holding.amount * crypto.current_price
      const pnl = value - holding.amount * holding.avgBuyPrice
      const pnlPercentage = (pnl / (holding.amount * holding.avgBuyPrice)) * 100

      return {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        amount: holding.amount,
        image: crypto.image,
        currentPrice: crypto.current_price,
        priceChangePercentage24h: crypto.price_change_percentage_24h,
        value,
        percentage: 0, // Will be calculated after total is known
        pnl,
        pnlPercentage,
        averageBuyPrice: holding.avgBuyPrice,
      }
    })
    .filter((asset): asset is PortfolioAsset => asset !== null)

  // Calculate total value
  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0)

  // Calculate percentage of total portfolio
  return portfolio.map((asset) => ({
    ...asset,
    percentage: (asset.value / totalValue) * 100,
  }))
}

// Generate mock news data
export function generateNewsData(): NewsItem[] {
  return [
    {
      id: "1",
      title: "Bitcoin Surges Past $45,000 as Institutional Adoption Grows",
      description:
        "Bitcoin has surged past $45,000 as more institutional investors add the cryptocurrency to their portfolios.",
      url: "#",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: "CryptoNews",
      image: "/placeholder.svg?height=200&width=300",
      category: "Bitcoin",
    },
    {
      id: "2",
      title: "Ethereum 2.0 Upgrade on Track for Q3 Completion",
      description: "The Ethereum 2.0 upgrade is progressing well and is expected to be completed in Q3 this year.",
      url: "#",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: "BlockchainInsider",
      image: "/placeholder.svg?height=200&width=300",
      category: "Ethereum",
    },
    {
      id: "3",
      title: "Regulatory Clarity Coming for Crypto Markets, Says SEC Chair",
      description:
        "The SEC Chair has indicated that clearer regulations for cryptocurrency markets are on the horizon.",
      url: "#",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: "FinanceDaily",
      image: "/placeholder.svg?height=200&width=300",
      category: "Regulation",
    },
    {
      id: "4",
      title: "New DeFi Protocol Reaches $1 Billion in Total Value Locked",
      description:
        "A new decentralized finance protocol has quickly reached $1 billion in total value locked, highlighting continued interest in DeFi.",
      url: "#",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      source: "DeFiPulse",
      image: "/placeholder.svg?height=200&width=300",
      category: "DeFi",
    },
    {
      id: "5",
      title: "Major Bank Launches Cryptocurrency Custody Service",
      description:
        "A major international bank has announced the launch of a cryptocurrency custody service for institutional clients.",
      url: "#",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      source: "BankingTech",
      image: "/placeholder.svg?height=200&width=300",
      category: "Banking",
    },
    {
      id: "6",
      title: "NFT Market Shows Signs of Recovery After Slump",
      description:
        "The market for non-fungible tokens is showing signs of recovery after a period of declining sales and interest.",
      url: "#",
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      source: "NFTWorld",
      image: "/placeholder.svg?height=200&width=300",
      category: "NFTs",
    },
  ]
}

// Generate mock order history
export function generateOrderHistory(): Order[] {
  return [
    {
      id: "ord-1",
      pair: "BTC/USDT",
      type: "buy",
      orderType: "market",
      price: 43567.2,
      amount: 0.05,
      total: 2178.36,
      status: "filled",
      date: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "ord-2",
      pair: "ETH/USDT",
      type: "sell",
      orderType: "limit",
      price: 3256.12,
      amount: 0.5,
      total: 1628.06,
      status: "filled",
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "ord-3",
      pair: "SOL/USDT",
      type: "buy",
      orderType: "limit",
      price: 102.78,
      amount: 5,
      total: 513.9,
      status: "filled",
      date: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "ord-4",
      pair: "BNB/USDT",
      type: "buy",
      orderType: "market",
      price: 412.35,
      amount: 1.2,
      total: 494.82,
      status: "filled",
      date: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "ord-5",
      pair: "ADA/USDT",
      type: "buy",
      orderType: "limit",
      price: 0.52,
      amount: 1000,
      total: 520.0,
      status: "open",
      date: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: "ord-6",
      pair: "XRP/USDT",
      type: "sell",
      orderType: "limit",
      price: 0.58,
      amount: 500,
      total: 290.0,
      status: "canceled",
      date: new Date(Date.now() - 432000000).toISOString(),
    },
  ]
}

// Generate market pairs data
export function generateMarketPairs(): MarketPair[] {
  return [
    {
      pair: "BTC/USDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 43567.2,
      priceChangePercent: 2.34,
      volume: 1245678900,
      high: 44102.5,
      low: 42980.1,
    },
    {
      pair: "ETH/USDT",
      baseAsset: "ETH",
      quoteAsset: "USDT",
      lastPrice: 3256.12,
      priceChangePercent: 1.56,
      volume: 678945230,
      high: 3298.45,
      low: 3201.78,
    },
    {
      pair: "BNB/USDT",
      baseAsset: "BNB",
      quoteAsset: "USDT",
      lastPrice: 412.35,
      priceChangePercent: 0.89,
      volume: 234567890,
      high: 418.92,
      low: 409.11,
    },
    {
      pair: "SOL/USDT",
      baseAsset: "SOL",
      quoteAsset: "USDT",
      lastPrice: 102.78,
      priceChangePercent: 4.12,
      volume: 123456789,
      high: 105.67,
      low: 98.45,
    },
    {
      pair: "ADA/USDT",
      baseAsset: "ADA",
      quoteAsset: "USDT",
      lastPrice: 0.52,
      priceChangePercent: -1.24,
      volume: 98765432,
      high: 0.54,
      low: 0.51,
    },
    {
      pair: "XRP/USDT",
      baseAsset: "XRP",
      quoteAsset: "USDT",
      lastPrice: 0.58,
      priceChangePercent: 0.75,
      volume: 87654321,
      high: 0.59,
      low: 0.57,
    },
    {
      pair: "DOT/USDT",
      baseAsset: "DOT",
      quoteAsset: "USDT",
      lastPrice: 6.78,
      priceChangePercent: 2.15,
      volume: 76543210,
      high: 6.92,
      low: 6.65,
    },
    {
      pair: "DOGE/USDT",
      baseAsset: "DOGE",
      quoteAsset: "USDT",
      lastPrice: 0.082,
      priceChangePercent: 3.45,
      volume: 65432109,
      high: 0.085,
      low: 0.079,
    },
    {
      pair: "AVAX/USDT",
      baseAsset: "AVAX",
      quoteAsset: "USDT",
      lastPrice: 35.67,
      priceChangePercent: 1.89,
      volume: 54321098,
      high: 36.45,
      low: 34.92,
    },
    {
      pair: "MATIC/USDT",
      baseAsset: "MATIC",
      quoteAsset: "USDT",
      lastPrice: 0.89,
      priceChangePercent: -0.56,
      volume: 43210987,
      high: 0.91,
      low: 0.88,
    },
  ]
}

