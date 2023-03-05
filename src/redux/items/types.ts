import { SortByType } from "../filter/types";
import { ItemProps } from "../../components/Item";

export type FetchItem = {
  activeCat: number;
  sortBy: SortByType;
  searchValue: string;
};

export enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export interface ItemsState {
  elements: ItemProps[];
  status: Status;
}
