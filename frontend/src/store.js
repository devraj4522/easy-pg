import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
} from './redux/reducers/userReducer';

import {
  createPostReducer,
  editPostReducer,
  deletePostReducer,
  viewPostReducer,
  viewAllPostsReducer,
  searchReducer,
} from './redux/reducers/postReducer';

import {
  createReviewReducer,
  editReviewReducer,
  deleteReviewReducer,
  viewReviewReducer,
  viewAllReviewsReducer,
} from './redux/reducers/reviewReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  posts: combineReducers({
    createPost: createPostReducer,
    editPost: editPostReducer,
    deletePost: deletePostReducer,
    viewPost: viewPostReducer,
    viewAllPosts: viewAllPostsReducer,
    search: searchReducer,
  }),
  reviews: combineReducers({
    createReview: createReviewReducer,
    editReview: editReviewReducer,
    deleteReview: deleteReviewReducer,
    viewReview: viewReviewReducer,
    viewAllReviews: viewAllReviewsReducer,
    search: searchReducer,
  }),
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
