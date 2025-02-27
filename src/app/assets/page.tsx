import { AssetItem } from '@/components/AssetItem';
import { Asset } from '@/models';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${process.env.API_URL}/assets`);
  return res.json();
}

export default async function Assets() {
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
              <TableRow key={asset._id}>
                <TableCell>
                  <AssetItem asset={asset} />
                </TableCell>
                <TableCell>${asset.price}</TableCell>
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
