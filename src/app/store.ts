import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "../features/prompts/promptSlice";
import modelReducer from "../features/models/modelSlice";
import responsesReducer from "../features/responses/responsesSlice";

export const store = configureStore({
  reducer: {
    prompts: promptReducer,
    models: modelReducer,
    responses: responsesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
