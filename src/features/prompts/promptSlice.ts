import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PromptHistory {
  id: string;
  text: string;
  timestamp: number;
}

interface PromptState {
  history: PromptHistory[];
  current: string;
}

const initialState: PromptState = {
  history: [],
  current: "",
};

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    setPrompt: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    savePrompt: (state) => {
      if (state.current.trim()) {
        state.history.unshift({
          id: crypto.randomUUID(),
          text: state.current,
          timestamp: Date.now(),
        });
      }
    },
  },
});

export const { setPrompt, savePrompt } = promptSlice.actions;
export default promptSlice.reducer;
