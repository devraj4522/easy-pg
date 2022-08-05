import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  EDIT_REVIEW_REQUEST,
  EDIT_REVIEW_SUCCESS,
  EDIT_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  VIEW_REVIEW_REQUEST,
  VIEW_REVIEW_SUCCESS,
  VIEW_REVIEW_FAIL,
  VIEW_ALL_REVIEWS_REQUEST,
  VIEW_ALL_REVIEWS_SUCCESS,
  VIEW_ALL_REVIEWS_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../constants/reviewConstrants';

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_SUCCESS:
      return { loading: false, newReview: action.payload };
    case CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_REVIEW_REQUEST:
      return { loading: true };
    case EDIT_REVIEW_SUCCESS:
      return { loading: false, editedReview: action.payload };
    case EDIT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_REVIEW_SUCCESS:
      return { loading: false };
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_REVIEW_REQUEST:
      return { loading: true };
    case VIEW_REVIEW_SUCCESS:
      return { loading: false, current_review: action.payload };
    case VIEW_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const viewAllReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_ALL_REVIEWS_REQUEST:
      return { loading: true };
    case VIEW_ALL_REVIEWS_SUCCESS:
      return { loading: false, all_reviews: action.payload };
    case VIEW_ALL_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchReducer = (state = { all_reviews: [] }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { loading: true };
    case SEARCH_SUCCESS:
      return { loading: false, all_reviews: action.payload };
    case SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
