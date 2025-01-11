// import useAppwrite from '@hooks/useAppwrite'
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import { Models } from 'appwrite'

// type SessionState = {
//     session: Models.Session | null
//     logged: boolean
// }

// const initialState: SessionState = {
//     session: localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')!) : null,
//     logged: false
// }

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const { fromSession } = useAppwrite()

// const logout = createAsyncThunk(
//     'session/logout',
//     async () => {
//         fromSession().logout(initialState.session?.$id)
//         localStorage.removeItem('session')

//         initialState.session = null
//         initialState.logged = false
//     },
// )

// export const sessionSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         setSession: (state, action: PayloadAction<Models.Session | null>) => {

//         }

//     },
//     extraReducers: (builder) => {
//         // Add reducers for additional action types here, and handle loading state as needed
//         builder.addCase(logout.fulfilled, (state, action) => {
//             state.session = action.payload
//             state.logged = true
//         })
//     },
// })

// export const { setSession, logout } = sessionSlice.actions

// export default sessionSlice.reducer