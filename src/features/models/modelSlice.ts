import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  selected: string;
  available: string[];
}

const initialState: ModelState = {
  selected: "gpt-4",
  available: ["gpt-4", "claude-3", "mistral-7b"],
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setModel } = modelSlice.actions;
export default modelSlice.reducer;
