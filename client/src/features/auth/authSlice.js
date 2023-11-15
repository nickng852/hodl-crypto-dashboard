import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null, // firestore
    watchlist: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setWatchList: (state, action) => {
            state.watchlist = action.payload.watchlist
        },

        resetUser: (state) => {
            state.user = initialState
        },
    },
})

export const { setUser, setWatchList, resetUser } = authSlice.actions

export const selectUser = (state) => state.auth.user

export const selectWatchList = (state) => state.auth.watchlist

export default authSlice.reducer
