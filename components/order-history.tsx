import type { Order } from "@/lib/types"
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Date</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Pair</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-zinc-400">Type</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Price</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Amount</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Total</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-zinc-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm">{formatDate(order.date)}</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{order.pair}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge
                    variant="outline"
                    className={`${
                      order.type === "buy"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                  >
                    {order.type.toUpperCase()} {order.orderType}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">{formatCurrency(order.price)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  {formatNumber(order.amount, order.amount < 0.01 ? 6 : 4)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium">{formatCurrency(order.total)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Badge
                    variant="outline"
                    className={`${
                      order.status === "filled"
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : order.status === "canceled"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : order.status === "partially_filled"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }`}
                  >
                    {order.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

