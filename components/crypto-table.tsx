import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { CryptoCurrency } from "@/lib/types"
import { formatCurrency, formatCompactNumber, formatPercentage } from "@/lib/utils"

interface CryptoTableProps {
  cryptoData: CryptoCurrency[]
}

export function CryptoTable({ cryptoData }: CryptoTableProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Name</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Last Price</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">24h Change</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Market Cap</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id} className="border-b border-zinc-800">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={coin.image || "/placeholder.svg"}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-zinc-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                  {formatCurrency(coin.current_price)}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-right font-medium ${
                    coin.price_change_percentage_24h >= 0 ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {formatPercentage(coin.price_change_percentage_24h)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">{formatCompactNumber(coin.market_cap)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                    Trade
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

