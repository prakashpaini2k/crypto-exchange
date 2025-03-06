import Image from "next/image"
import Link from "next/link"
import type { PortfolioAsset } from "@/lib/types"
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PortfolioTableProps {
  assets: PortfolioAsset[]
}

export function PortfolioTable({ assets }: PortfolioTableProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Asset</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Balance</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Price</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">
                Avg. Buy Price
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Value</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">PNL</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
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
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="font-medium">{formatNumber(asset.amount, asset.amount < 0.01 ? 6 : 4)}</div>
                  <div className="text-sm text-zinc-400">{asset.symbol}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="font-medium">{formatCurrency(asset.currentPrice)}</div>
                  <div
                    className={`text-sm ${asset.priceChangePercentage24h >= 0 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {formatPercentage(asset.priceChangePercentage24h)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-zinc-400">
                  {formatCurrency(asset.averageBuyPrice || 0)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium">{formatCurrency(asset.value)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className={`font-medium ${(asset.pnl || 0) >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {formatCurrency(asset.pnl || 0)}
                  </div>
                  <div className={`text-sm ${(asset.pnlPercentage || 0) >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {formatPercentage(asset.pnlPercentage || 0)}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/trade/${asset.symbol}_USDT`}>
                      <Button size="sm" variant="outline" className="px-4 py-2 border-2 border-gray-800 text-gray-800 bg-white rounded-lg transition duration-300 hover:bg-gray-800 hover:text-white">
                        Trade
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

