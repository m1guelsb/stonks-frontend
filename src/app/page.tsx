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
import Image from 'next/image';

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const res = await fetch(`http://localhost:3001/wallets/${walletId}`);
  return res.json();
}

export default async function MyWallet({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  const wallet = await getMyWallet(wallet_id);
  console.log(wallet);
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
            {wallet.assets.map(({ _id, asset, shares }) => (
              <TableRow key={_id}>
                <TableCell>
                  <div>
                    <div>
                      <Image
                        src={asset.image}
                        alt={asset.symbol}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div>
                      <span>{asset.name}</span>
                      <span>{asset.symbol}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>R$ {asset.price}</TableCell>
                <TableCell>{shares}</TableCell>
                <TableCell>
                  <Button color="light">Buy/Sell</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
