'use client';
import React from 'react';
import Link from 'next/link';
import { Button, TableCell, TableRow } from 'flowbite-react';
import { useShallow } from 'zustand/shallow';
import { AssetItem } from '@/components/AssetItem';
import { WalletAsset } from '@/models';
import { useAssetStore } from '@/store';

export const TableWalletAssetRow = ({
  walletAsset,
  walletId,
}: {
  walletAsset: WalletAsset;
  walletId: string;
}) => {
  const assetFound = useAssetStore(
    //use shallow to avoid unecessary re-rendering in items that dont changed
    useShallow((state) =>
      state.assets.find((a) => a.symbol === walletAsset.symbol),
    ),
  );

  const asset = (assetFound as WalletAsset) || walletAsset;

  return (
    <TableRow>
      <TableCell>
        <AssetItem asset={asset} />
      </TableCell>
      <TableCell>${asset.price}</TableCell>
      <TableCell>{asset.shares}</TableCell>
      <TableCell>
        <Button
          color="light"
          as={Link}
          href={`/assets/${asset.symbol}?wallet_id=${walletId}`}
          className="w-fit"
        >
          Buy/Sell
        </Button>
      </TableCell>
    </TableRow>
  );
};
