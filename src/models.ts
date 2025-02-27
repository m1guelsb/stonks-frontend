export type Asset = {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image_url: string;
  shares: string;
};

export type Wallet = {
  _id: string;
  assets: Asset[] | [];
};
