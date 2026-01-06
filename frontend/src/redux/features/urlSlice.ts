import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UrlState {
    shortLink: string;
    showCopy: boolean;
}

const initialState: UrlState = {
    shortLink: "",
    showCopy: false,
};

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {
        setShortLink: (state, action: PayloadAction<string>) => {
            state.shortLink = action.payload;
        },
        setShowCopy: (state, action: PayloadAction<boolean>) => {
            state.showCopy = action.payload;
        },
    },
});

export const { setShortLink, setShowCopy } = urlSlice.actions;

export default urlSlice.reducer;
