'use client';

import { socket } from '@/socket-io';
import { useEffect } from 'react';
import { type Asset } from '@/models';
import { useAssetStore } from '@/store';

interface AssetsSyncProps {
  assetsSymbols: string[];
}

//TODO change to a custom hook
export const AssetsSync = ({ assetsSymbols }: AssetsSyncProps) => {
  const changeAsset = useAssetStore((state) => state.changeAsset);
  useEffect(() => {
    socket.connect();
    socket.emit('join-assets', { symbols: assetsSymbols });

    socket.on('assets/price-change', (asset: Asset) => {
      changeAsset(asset);
    });

    return () => {
      socket.emit('leave-assets', { symbols: assetsSymbols });
      socket.off('assets/price-change');
    };
  }, [assetsSymbols, changeAsset]);

  return null;
};
