import Link from "next/link"
import type { NewsItem } from "@/lib/types"
import { timeAgo } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface NewsListProps {
  news: NewsItem[]
}

export function NewsList({ news }: NewsListProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-medium">Latest News</h3>
      </div>
      <ul className="divide-y divide-zinc-800">
        {news.map((item) => (
          <li key={item.id} className="p-4 hover:bg-zinc-800/50">
            <Link href={item.url} className="block">
              <div className="flex items-center justify-between mb-1">
                <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  {item.category}
                </Badge>
                <span className="text-xs text-zinc-400">{timeAgo(item.publishedAt)}</span>
              </div>
              <h4 className="font-medium mb-1 line-clamp-2">{item.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">{item.source}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

