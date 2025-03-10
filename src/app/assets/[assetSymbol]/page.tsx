import { Card } from 'flowbite-react';
import { AssetItem } from '@/components/AssetItem';
import { AssetTabs } from '@/components/AssetTabs';
import { Asset, AssetDaily } from '@/models';
import { Time } from 'lightweight-charts';
import { AssetChartComponent } from './AssertChartComponent';

export const getAsset = async (symbol: string): Promise<Asset> =>
  fetch(`${process.env.API_URL}/assets/${symbol}`).then((res) => res.json());

const getAssetDalies = async (assetSymbol: string): Promise<AssetDaily[]> =>
  fetch(`${process.env.API_URL}/assets/${assetSymbol}/dailies`).then((res) =>
    res.json(),
  );

export default async function AssetDetails({
  params,
  searchParams,
}: {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const walletId = (await searchParams).wallet_id;
  const asset = await getAsset((await params).assetSymbol);

  const assetDailies = await getAssetDalies(asset.symbol);

  const chartData = assetDailies.map((assetDaily) => ({
    time: (Date.parse(assetDaily.date) / 1000) as Time,
    value: assetDaily.price,
  }));

  return (
    <div className="flex flex-col gap-5 flex-grow">
      <div className="flex flex-col gap-2">
        <AssetItem asset={asset} />
        <div className="font-bold text-2xl">${asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-24">
        <div className="col-span-2">
          <Card>
            <AssetTabs asset={asset} walletId={walletId} />
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} data={chartData} />
        </div>
      </div>
    </div>
  );
}
