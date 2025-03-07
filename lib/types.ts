export interface CryptoCurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  price_change_24h: number
  total_volume: number
  high_24h?: number
  low_24h?: number
  ath?: number
  ath_date?: string
  atl?: number
  atl_date?: string
}

export interface PortfolioAsset {
  id: string
  name: string
  symbol: string
  amount: number
  image: string
  currentPrice: number
  priceChangePercentage24h: number
  value: number
  percentage: number
  pnl?: number
  pnlPercentage?: number
  averageBuyPrice?: number
}

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  publishedAt: string
  source: string
  category: string
}

export interface Order {
  id: string
  pair: string
  type: "buy" | "sell"
  orderType: "market" | "limit"
  price: number
  amount: number
  total: number
  status: "filled" | "canceled" | "open" | "partially_filled"
  date: string
}

export interface MarketPair {
  pair: string
  baseAsset: string
  quoteAsset: string
  lastPrice: number
  priceChangePercent: number
  volume: number
  high: number
  low: number
  market: "spot" | "futures" | "options"
  leverage?: string
  expiryDate?: string
  strikePrice?: number
  optionType?: "call" | "put"
}

export interface WalletAsset {
  id: string
  name: string
  symbol: string
  balance: number
  availableBalance: number
  inOrder: number
  value: number
  image: string
}

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "transfer" | "buy" | "sell"
  asset: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  fee?: number
  txid?: string
  from?: string
  to?: string
}

