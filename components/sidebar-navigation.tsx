"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  CreditCard,
  DollarSign,
  Gift,
  Globe,
  HelpCircle,
  Home,
  LineChart,
  PieChart,
  Settings,
  Star,
  Wallet,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)

  const navItems = [
    {
      title: "Dashboard",
      href: "/home",
      icon: Home,
    },
    {
      title: "Markets",
      href: "/markets",
      icon: BarChart2,
    },
    {
      title: "Trade",
      href: "/trade",
      icon: LineChart,
    },
    {
      title: "Wallet",
      href: "/wallet",
      icon: Wallet,
    },
    {
      title: "Buy Crypto",
      href: "/buy",
      icon: DollarSign,
    },
    {
      title: "Earn",
      href: "/earn",
      icon: PieChart,
    },
    {
      title: "Card",
      href: "/card",
      icon: CreditCard,
    },
    {
      title: "Rewards",
      href: "/rewards",
      icon: Gift,
    },
    {
      title: "Favorites",
      href: "/favorites",
      icon: Star,
    },
  ]

  return (
    <div className={cn("flex h-screen flex-col border-r border-zinc-800 bg-black", className)}>
      <div className="flex h-14 items-center border-b border-zinc-800 px-4">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                transform="rotate(45 7.5 7.5)"
              ></path>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </Button>
        {expanded && (
          <Link href="/" className="flex items-center gap-2 font-bold text-yellow-500">
            <span>CryptoEx</span>
          </Link>
        )}
      </div>
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {expanded && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
        <div className="mt-6 space-y-1">
          <div className={cn("px-3 py-2", expanded ? "text-xs font-medium text-zinc-400" : "sr-only")}>Support</div>
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <HelpCircle className="h-4 w-4" />
            {expanded && <span>Help Center</span>}
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            {expanded && <span>Settings</span>}
          </Link>
          <Link
            href="/language"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <Globe className="h-4 w-4" />
            {expanded && <span>Language</span>}
          </Link>
        </div>
      </ScrollArea>
    </div>
  )
}

