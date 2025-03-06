'use client';

import { useRef } from 'react';
import { ChartComponent, ChartComponentRef } from '@/components/ChartComponent';
import { Asset } from '@/models';
import { AssetItem } from '@/components/AssetItem';

export const AssetChartComponent = ({ asset }: { asset: Asset }) => {
  const chartRef = useRef<ChartComponentRef>(null);
  return <ChartComponent ref={chartRef} header={<AssetItem asset={asset} />} />;
};
