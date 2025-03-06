import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CryptoCurrency, PortfolioAsset, NewsItem, Order, MarketPair, WalletAsset, Transaction } from "./types"

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
  // Find Solana in the crypto data
  const solana = cryptoData.find((c) => c.id === "solana" || c.symbol.toLowerCase() === "sol")
  const solPrice = solana?.current_price || 102.5

  // Create portfolio with Solana and USDT
  const portfolio = [
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      amount: 243.9,
      image: solana?.image || "/placeholder.svg?height=32&width=32",
      currentPrice: solPrice,
      priceChangePercentage24h: solana?.price_change_percentage_24h || 1.5,
      value: 25000,
      percentage: 0.4, // Will be recalculated
      pnl: 0,
      pnlPercentage: 0,
      averageBuyPrice: solPrice,
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      amount: 6277560,
      image: "/placeholder.svg?height=32&width=32",
      currentPrice: 1,
      priceChangePercentage24h: 0,
      value: 6277560,
      percentage: 99.6, // Will be recalculated
      pnl: 0,
      pnlPercentage: 0,
      averageBuyPrice: 1,
    },
  ]

  // Calculate total value
  const totalValue = 6302560

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
      category: "Bitcoin",
    },
    {
      id: "2",
      title: "Ethereum 2.0 Upgrade on Track for Q3 Completion",
      description: "The Ethereum 2.0 upgrade is progressing well and is expected to be completed in Q3 this year.",
      url: "#",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: "BlockchainInsider",
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
    // Spot Markets
    {
      pair: "BTC/USDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 43567.2,
      priceChangePercent: 2.34,
      volume: 1245678900,
      high: 44102.5,
      low: 42980.1,
      market: "spot",
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
      market: "spot",
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
      market: "spot",
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
      market: "spot",
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
      market: "spot",
    },

    // Futures Markets
    {
      pair: "BTC/USDT",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 43589.5,
      priceChangePercent: 2.38,
      volume: 2345678901,
      high: 44150.75,
      low: 42950.25,
      market: "futures",
      leverage: "1-125x",
    },
    {
      pair: "ETH/USDT",
      baseAsset: "ETH",
      quoteAsset: "USDT",
      lastPrice: 3260.45,
      priceChangePercent: 1.62,
      volume: 987654321,
      high: 3305.2,
      low: 3198.75,
      market: "futures",
      leverage: "1-100x",
    },
    {
      pair: "SOL/USDT",
      baseAsset: "SOL",
      quoteAsset: "USDT",
      lastPrice: 103.15,
      priceChangePercent: 4.25,
      volume: 345678912,
      high: 106.5,
      low: 98.2,
      market: "futures",
      leverage: "1-50x",
    },

    // Options Markets
    {
      pair: "BTC-30JUN23-45000-C",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 1250.75,
      priceChangePercent: 3.45,
      volume: 45678912,
      high: 1300.5,
      low: 1200.25,
      market: "options",
      expiryDate: "2023-06-30",
      strikePrice: 45000,
      optionType: "call",
    },
    {
      pair: "BTC-30JUN23-40000-P",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      lastPrice: 850.25,
      priceChangePercent: -2.15,
      volume: 34567891,
      high: 900.75,
      low: 825.5,
      market: "options",
      expiryDate: "2023-06-30",
      strikePrice: 40000,
      optionType: "put",
    },
    {
      pair: "ETH-30JUN23-3500-C",
      baseAsset: "ETH",
      quoteAsset: "USDT",
      lastPrice: 125.5,
      priceChangePercent: 2.75,
      volume: 23456789,
      high: 130.25,
      low: 120.75,
      market: "options",
      expiryDate: "2023-06-30",
      strikePrice: 3500,
      optionType: "call",
    },
  ]
}

// Generate wallet assets
export function generateWalletAssets(): WalletAsset[] {
  return [
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      balance: 243.9,
      availableBalance: 243.9,
      inOrder: 0,
      value: 25000,
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      balance: 6277560,
      availableBalance: 6277560,
      inOrder: 0,
      value: 6277560,
      image: "/placeholder.svg?height=32&width=32",
    },
  ]
}

// Generate transaction history
export function generateTransactionHistory(): Transaction[] {
  return [
    {
      id: "tx-1",
      type: "deposit",
      asset: "BTC",
      amount: 0.05,
      status: "completed",
      date: new Date(Date.now() - 86400000).toISOString(),
      fee: 0.0001,
      txid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      id: "tx-2",
      type: "withdrawal",
      asset: "ETH",
      amount: 0.5,
      status: "completed",
      date: new Date(Date.now() - 172800000).toISOString(),
      fee: 0.001,
      txid: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      id: "tx-3",
      type: "buy",
      asset: "SOL",
      amount: 5,
      status: "completed",
      date: new Date(Date.now() - 259200000).toISOString(),
      fee: 0.1,
    },
    {
      id: "tx-4",
      type: "sell",
      asset: "ADA",
      amount: 500,
      status: "completed",
      date: new Date(Date.now() - 345600000).toISOString(),
      fee: 1,
    },
    {
      id: "tx-5",
      type: "transfer",
      asset: "USDT",
      amount: 1000,
      status: "completed",
      date: new Date(Date.now() - 432000000).toISOString(),
      from: "Spot Wallet",
      to: "Futures Wallet",
    },
    {
      id: "tx-6",
      type: "deposit",
      asset: "USDT",
      amount: 2000,
      status: "pending",
      date: new Date(Date.now() - 3600000).toISOString(),
      txid: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    },
  ]
}

