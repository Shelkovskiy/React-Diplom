import { RootState } from "../../store";

export const newsSelectors = (state: RootState) => state.news.news;
export const isLoadingNewsSelector = (state: RootState) => state.news.isLoading;
export const errorNewsSelector = (state: RootState) => state.news.error;
export const currentPageSelector = (state: RootState) => state.news.currentPage;
export const perPageSelector = (state: RootState) => state.news.perPage;
export const totalCountSelector = (state: RootState) => state.news.totalCount;
