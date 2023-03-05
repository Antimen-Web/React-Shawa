export type SortByType = {
  name:
    | "popular ↓"
    | "popular ↑"
    | "price ↓"
    | "price ↑"
    | "alphabet ↓"
    | "alphabet ↑";
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
