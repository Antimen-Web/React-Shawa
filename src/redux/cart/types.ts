export type Item = {
  id: string;
  title: string;
  image: string;
  price: number;
  type?: number;
  size?: number;
  spicy?: number;
  weight: number;
  count: number;
  key: string;
};

export interface CartState {
  typesName: string[];
  spicyName: string[];
  items: Item[];
  totalPrice: number;
  popup: boolean;
  popupText: string;
}
