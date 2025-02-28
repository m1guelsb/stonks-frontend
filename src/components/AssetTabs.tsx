'use client';

import { Tabs } from 'flowbite-react';
import { OrderForm } from './OrderForm';
import { Asset, OrderType } from '@/models';

interface AssetTabsProps {
  asset: Asset;
  walletId: string;
}

export const AssetTabs = ({ asset, walletId }: AssetTabsProps) => {
  return (
    <Tabs>
      <Tabs.Item active title={<div className="text-blue-700">Buy</div>}>
        <OrderForm asset={asset} walletId={walletId} type={OrderType.BUY} />
      </Tabs.Item>
      <Tabs.Item title={<div className="text-red-700">Sell</div>}>
        <OrderForm asset={asset} walletId={walletId} type={OrderType.SELL} />
      </Tabs.Item>
    </Tabs>
  );
};
