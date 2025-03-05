import Image from "next/image"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { CryptoCurrency } from "@/lib/types"

interface CryptoCardProps {
  crypto: CryptoCurrency
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-3">
        <Image
          src={crypto.image || "/placeholder.svg"}
          alt={crypto.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <div className="font-medium">{crypto.name}</div>
          <div className="text-sm text-zinc-400">{crypto.symbol.toUpperCase()}</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="font-medium">{formatCurrency(crypto.current_price)}</div>
        <div className={`text-sm ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
          {formatPercentage(crypto.price_change_percentage_24h)}
        </div>
      </div>
    </div>
  )
}

