import { AssetItem } from '@/components/AssetItem';
import { Order, OrderStatus, OrderType } from '@/models';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

export async function getOrders(walletId: string): Promise<Order[]> {
  const res = await fetch(`${process.env.API_URL}/orders?walletId=${walletId}`);
  return res.json();
}

export default async function Orders({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const orders = await getOrders((await searchParams).wallet_id);
  console.log(orders);

  const orderStatus: { [key in OrderStatus]: { color: string; text: string } } =
    {
      PENDING: { color: 'info', text: 'Pending' },
      OPEN: { color: 'warning', text: 'Open' },
      CLOSED: { color: 'success', text: 'Closed' },
      FAILED: { color: 'failure', text: 'Failed' },
    };

  const orderType: { [key in OrderType]: { color: string; text: string } } = {
    BUY: { color: 'blue', text: 'Buy' },
    SELL: { color: 'red', text: 'Sell' },
  };

  return (
    <div className="flex flex-col gap-5">
      <article className="format">
        <h1>Orders</h1>
      </article>
      <div className="w-full overflow-x-auto">
        <Table className="w-full max-h-full table-fixed">
          <TableHead>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Shares</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <AssetItem asset={order.asset} />
                </TableCell>
                <TableCell>${order.price}</TableCell>
                <TableCell>{order.shares}</TableCell>
                <TableCell>
                  <Badge color={orderType[order.type].color} className="w-fit">
                    {orderType[order.type].text}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    color={orderStatus[order.status].color}
                    className="w-fit"
                  >
                    {orderStatus[order.status].text}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button color="light">Buy</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
