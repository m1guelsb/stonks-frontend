'use client';

import { useEffect, useRef } from 'react';
import { ChartComponent, ChartComponentRef } from '@/components/ChartComponent';
import { Asset } from '@/models';
import { AssetItem } from '@/components/AssetItem';
import { Time } from 'lightweight-charts';
import { socket } from '@/socket-io';

export const AssetChartComponent = ({
  asset,
  data,
}: {
  asset: Asset;
  data?: { time: Time; value: number }[];
}) => {
  const chartRef = useRef<ChartComponentRef>(null);
  const symbol = asset.symbol;

  useEffect(() => {
    socket.connect();
    socket.emit('join-asset', { symbol });
    socket.on('assets/daily-creation', (assetDaily) => {
      console.log(assetDaily);
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price,
      });
    });

    return () => {
      socket.emit('leave-asset', { symbol });
      socket.off('assets/daily-creation');
    };
  }, [symbol]);

  return (
    <ChartComponent
      ref={chartRef}
      header={<AssetItem asset={asset} />}
      data={data}
    />
  );
};
