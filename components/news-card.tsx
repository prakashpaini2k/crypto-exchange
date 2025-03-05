// import Image from "next/image"
import Link from "next/link"
import type { NewsItem } from "@/lib/types"
import { timeAgo } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  news: NewsItem
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={news.url} className="block">
      <div className="rounded-lg h-full border border-zinc-800 bg-zinc-900 overflow-hidden transition-all hover:border-zinc-700 hover:bg-zinc-800/50">
        {/* <div className="relative h-40 w-full">
          <Image
            src={news.image || "/placeholder.svg?height=200&width=300"}
            alt={news.title}
            fill
            className="object-cover"
          /> */}
        {/* </div> */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              {news.category}
            </Badge>
            <span className="text-xs text-zinc-400">{timeAgo(news.publishedAt)}</span>
          </div>
          <h3 className="font-medium line-clamp-2 mb-2">{news.title}</h3>
          <p className="text-sm text-zinc-400 line-clamp-2">{news.description}</p>
          <div className="mt-3 text-xs text-zinc-500">Source: {news.source}</div>
        </div>
      </div>
    </Link>
  )
}

