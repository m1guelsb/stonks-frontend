import Image from 'next/image';
import { Asset } from '@/models';

export const AssetItem = ({ asset }: { asset: Asset }) => {
  return (
    <div className="flex gap-2">
      <div className="content-center">
        <Image
          src={asset.image_url}
          alt={asset.symbol}
          width={42}
          height={42}
        />
      </div>
      <div className="flex flex-col text-sm">
        <span>{asset.name}</span>
        <span className="font-bold">{asset.symbol}</span>
      </div>
    </div>
  );
};
