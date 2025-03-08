import { Wallet } from '@/models';
import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react';
import { TableWalletAssetRow } from './TableWalletAssetRow';

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
            {wallet.assets.map((walletAsset) => (
              <TableWalletAssetRow
                key={walletAsset._id}
                walletAsset={walletAsset}
                walletId={wallet_id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
