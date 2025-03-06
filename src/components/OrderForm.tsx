'use client';

import { Asset, Order, OrderType } from '@/models';
import { socket } from '@/socket-io';
import { Button, Label, TextInput } from 'flowbite-react';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

interface OrderFormProps {
  asset: Asset;
  walletId: string;
  type: OrderType;
}

export const OrderForm = ({ asset, type, walletId }: OrderFormProps) => {
  const orderType =
    type === OrderType.BUY
      ? { color: 'text-blue-700', text: 'Buy' }
      : { color: 'text-red-700', text: 'Sell' };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    socket.connect();
    const newOrder: Order = await socket.emitWithAck('orders/create', data);
    console.log(newOrder);
    toast(
      `A ${orderType.text} order of ${asset.symbol} with ${newOrder.shares} shares has been created`,
      { type: 'success', position: 'top-right' },
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <input type="hidden" name={'assetId'} defaultValue={asset._id} />
      <input type="hidden" name={'walletId'} defaultValue={walletId} />
      <input type="hidden" name={'type'} defaultValue={type} />

      <div>
        <Label htmlFor="shares" value="Quantity" className={orderType.color} />

        <TextInput
          id="shares"
          name="shares"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>

      <div>
        <Label htmlFor="price" value="Price $" className={orderType.color} />

        <TextInput
          id="price"
          name="price"
          required
          type="number"
          min={1}
          step={1}
          defaultValue={1}
          color={type === OrderType.BUY ? 'info' : 'failure'}
        />
      </div>

      <Button
        type="submit"
        color={type === OrderType.BUY ? 'blue' : 'failure'}
        className="w-fit"
      >
        {orderType.text}
      </Button>
    </form>
  );
};
