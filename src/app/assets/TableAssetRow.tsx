'use client';
import React from 'react';
import Link from 'next/link';
import { Button, TableCell, TableRow } from 'flowbite-react';
import { useShallow } from 'zustand/shallow';
import { AssetItem } from '@/components/AssetItem';
import { Asset } from '@/models';
import { useAssetStore } from '@/store';

export const TableAssetRow = ({
  currentAsset,
  walletId,
}: {
  currentAsset: Asset;
  walletId: string;
}) => {
  const assetFound = useAssetStore(
    //use shallow to avoid unecessary re-rendering in items that dont changed
    useShallow((state) =>
      state.assets.find((a) => a.symbol === currentAsset.symbol),
    ),
  );

  const asset = assetFound || currentAsset;

  return (
    <TableRow key={asset._id}>
      <TableCell>
        <AssetItem asset={asset} />
      </TableCell>
      <TableCell>${asset.price}</TableCell>
      <TableCell>
        <Button
          color="light"
          as={Link}
          href={`assets/${asset.symbol}?wallet_id=${walletId}`}
          className="w-fit"
        >
          Buy/Sell
        </Button>
      </TableCell>
    </TableRow>
  );
};
