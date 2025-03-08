import { AssetsSync } from '@/components/AssetsSync';
import { Asset } from '@/models';
import { Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react';
import { TableAssetRow } from './TableAssetRow';

export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${process.env.API_URL}/assets`);
  return res.json();
}

export default async function Assets({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  const assets = await getAssets();
  console.log(assets);
  return (
    <div className="flex flex-col gap-5">
      <article className="format">
        <h1>Assets</h1>
      </article>
      <div className="w-full overflow-x-auto">
        <Table className="w-full max-h-full table-fixed">
          <TableHead>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Buy</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableAssetRow
                key={asset._id}
                currentAsset={asset}
                walletId={wallet_id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* TODO: transform into a hook */}
      <AssetsSync assetsSymbols={assets.map((asset) => asset.symbol)} />
    </div>
  );
}
