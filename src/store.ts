import { create } from 'zustand';
import { Asset } from './models';

export type AssetStore = {
  assets: Asset[];
  //addAsset: (asset: Asset) => void;
  changeAsset: (asset: Asset) => void;
  //removeAsset: (asset: Asset) => void;
};

export const useAssetStore = create<AssetStore>((set) => ({
  assets: [],
  changeAsset: (asset) =>
    set((state) => {
      const assetIndex = state.assets.findIndex(
        (a) => (a.symbol = asset.symbol),
      );

      if (assetIndex === -1) {
        return {
          assets: [...state.assets, asset],
        };
      }

      const newAssets = [...state.assets];
      newAssets[assetIndex] = asset;

      return { assets: newAssets };
    }),
}));
