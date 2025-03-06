import { AssetItem } from '@/components/AssetItem';
import { Wallet } from '@/models';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import Link from 'next/link';

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const res = await fetch(`${process.env.API_URL}/wallets/${walletId}`);
  return res.json();
}

export default async function MyWallet({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  const wallet = await getMyWallet(wallet_id);

  return (
    <div className="flex flex-col gap-5">
      <article className="format">
        <h1>My Wallet</h1>
      </article>
      <div className="w-full overflow-x-auto">
        <Table className="w-full max-h-full table-fixed">
          <TableHead>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Buy/Sell</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map((asset) => (
              <TableRow key={asset._id}>
                <TableCell>
                  <AssetItem asset={asset} />
                </TableCell>
                <TableCell>${asset.price}</TableCell>
                <TableCell>{asset.shares}</TableCell>
                <TableCell>
                  <Button
                    color="light"
                    as={Link}
                    href={`/assets/${asset.symbol}?wallet_id=${wallet_id}`}
                    className="w-fit"
                  >
                    Buy/Sell
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
