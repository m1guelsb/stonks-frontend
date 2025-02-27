export type Asset = {
  _id: string;
  name: string;
  symbol: string;
  price: number;
  image_url: string;
};

export type WalletAsset = {
  shares: number;
} & Asset;

export type Wallet = {
  _id: string;
  assets: WalletAsset[] | [];
};
