import Image from "next/image"
import type { PortfolioAsset } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface PortfolioAssetsProps {
  assets: PortfolioAsset[]
}

export function PortfolioAssets({ assets }: PortfolioAssetsProps) {
  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <div key={asset.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={asset.image || "/placeholder.svg"}
              alt={asset.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="font-medium">{asset.name}</div>
              <div className="text-sm text-zinc-400">
                {asset.amount} {asset.symbol}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{formatCurrency(asset.value)}</div>
            <div className={`text-sm ${asset.priceChangePercentage24h >= 0 ? "text-emerald-500" : "text-red-500"}`}>
              {formatPercentage(asset.priceChangePercentage24h)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

