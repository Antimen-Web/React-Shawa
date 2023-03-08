export type SortByType = {
  name: string;
  sort: "rating" | "price" | "title";
  line: "desc" | "asc";
};

export interface FilterState {
  sortByArr: SortByType[];
  categories: string[];
  activeCat: number;
  sortBy: SortByType;
  searchValue: string;
}
