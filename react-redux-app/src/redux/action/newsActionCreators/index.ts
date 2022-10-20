import { GET_ASYNC_TOTAL_COUNT_NEWS_FAILURE } from "./../index";
import { Dispatch, ActionCreator } from "redux";
import axios from "axios";
import {
	GET_ASYNC_NEWS_FAILURE,
	GET_ASYNC_NEWS_START,
	GET_ASYNC_NEWS_SUCCESS,
	GET_ASYNC_TOTAL_COUNT_NEWS,
} from "../index";
import { IAsyncBlogsResponseData } from "../../Types/responseType";
import { BASE_BLOG_URL } from "../../constants/URLS";
import { TNewsActionTypes } from "../../Types/asyncNewsActionType";
import { SET_CURRENT_NEWS_PAGE } from "../index";
import { getAsyncNewsFromApi } from "../../services";
import { getAsyncNewsCount } from "../../services";

export const getAsyncNewsStart: ActionCreator<TNewsActionTypes> = () => {
	return {
		type: GET_ASYNC_NEWS_START,
		payload: {},
	};
};

export const getAsyncNewsSuccess: ActionCreator<TNewsActionTypes> = (
	Blogs: IAsyncBlogsResponseData[],
) => {
	return {
		type: GET_ASYNC_NEWS_SUCCESS,
		payload: Blogs,
	};
};

export const getAsyncNewsFailure = (error: string) => {
	return {
		type: GET_ASYNC_NEWS_FAILURE,
		payload: error,
	};
};

export const setCurrentNewsPage: ActionCreator<TNewsActionTypes> = (
	page: number,
) => {
	return {
		type: SET_CURRENT_NEWS_PAGE,
		payload: page,
	};
};

export const getAsyncTotalCount: ActionCreator<TNewsActionTypes> = (
	count: number,
) => {
	return {
		type: GET_ASYNC_TOTAL_COUNT_NEWS,
		payload: count,
	};
};

export const getAsyncCountFailure = (error: string) => {
	return {
		type: GET_ASYNC_TOTAL_COUNT_NEWS_FAILURE,
		payload: error,
	};
};

export const getAsyncNews = ({ currentPage }: any) => {
	return (dispatch: Dispatch<TNewsActionTypes>) => {
		dispatch(getAsyncNewsStart());
		getAsyncNewsFromApi({ currentPage })
			.then((res) => {
				dispatch(getAsyncNewsSuccess(res.data));
			})
			.catch((error) => {
				dispatch(getAsyncNewsFailure(error?.message));
			});
	};
};

export const getTotalAsyncNewsCount = () => {
	return (dispatch: Dispatch<TNewsActionTypes>) => {
		dispatch(getAsyncTotalCount());
		getAsyncNewsCount()
			.then((res) => {
				dispatch(getAsyncTotalCount(res.data));
			})
			.catch((error) => {
				dispatch(getAsyncCountFailure(error?.message));
			});
	};
};
