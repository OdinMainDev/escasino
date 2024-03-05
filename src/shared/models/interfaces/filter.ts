export interface IFilter {
  categories: string[];
  providers: string[];
  is_game_avail_for_bonus: boolean;
  distinct_filters: boolean;
  query: string;
}
