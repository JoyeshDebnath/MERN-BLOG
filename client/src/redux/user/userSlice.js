import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInStart: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		// User Update functionality .....
		updateUserStart: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		updateUserSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.currentUser = action.payload;
		},
		updateUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
