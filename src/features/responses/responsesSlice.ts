import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Response {
  id: string;
  model: string;
  response: string;
  timestamp: number;
}

interface ResponsesState {
  list: Response[];
  loading: boolean;
}

const initialState: ResponsesState = {
  list: [],
  loading: false,
};

const responsesSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    addResponse: (state, action: PayloadAction<Omit<Response, "id" | "timestamp">>) => {
      state.list.push({
        id: crypto.randomUUID(),
        model: action.payload.model,
        response: action.payload.response,
        timestamp: Date.now(),
      });
    },
    clearResponses: (state) => {
      state.list = [];
    },
  },
});

export const { startLoading, stopLoading, addResponse, clearResponses } = responsesSlice.actions;
export default responsesSlice.reducer;

