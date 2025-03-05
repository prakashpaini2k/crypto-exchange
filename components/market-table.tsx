import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { MarketPair } from "@/lib/types"
import { formatCurrency, formatCompactNumber, formatPercentage, formatNumber } from "@/lib/utils"

interface MarketTableProps {
  markets: MarketPair[]
  category?: string
}

export function MarketTable({ markets, category = "All" }: MarketTableProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Pair</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Last Price</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">24h Change</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">24h High</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">24h Low</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Volume</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market) => (
              <tr key={market.pair} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="whitespace-nowrap px-6 py-4">
                  <Link href={`/trade/${market.pair.replace("/", "_")}`} className="font-medium hover:text-yellow-500">
                    {market.pair}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium">
                  {market.lastPrice < 0.01
                    ? formatNumber(market.lastPrice, 6)
                    : market.lastPrice < 1
                      ? formatNumber(market.lastPrice, 4)
                      : formatCurrency(market.lastPrice)}
                </td>
                <td
                  className={`whitespace-nowrap px-6 py-4 text-right font-medium ${
                    market.priceChangePercent >= 0 ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {formatPercentage(market.priceChangePercent)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  {market.high < 0.01
                    ? formatNumber(market.high, 6)
                    : market.high < 1
                      ? formatNumber(market.high, 4)
                      : formatCurrency(market.high)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  {market.low < 0.01
                    ? formatNumber(market.low, 6)
                    : market.low < 1
                      ? formatNumber(market.low, 4)
                      : formatCurrency(market.low)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">{formatCompactNumber(market.volume)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Link href={`/trade/${market.pair.replace("/", "_")}`}>
                    <Button size="sm" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      Trade
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

