import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./slices/registrationSlice";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
import addStoryReducer from "./slices/addStorySlice";
import slideReducer from "./slices/slideSlice";
import editPostReducer from "./slices/editPostSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import storyReducer from "./slices/storySlice";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    user: userReducer,
    addStory: addStoryReducer,
    slide: slideReducer,
    editPost: editPostReducer,
    bookmark: bookmarkReducer,
    story: storyReducer,
  },
});

export default store;
