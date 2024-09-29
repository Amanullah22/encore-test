import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCoordinates = createAsyncThunk(
    'getCoordinates', async (parameters) => {
        const { geocoder, placeId } = parameters
        return await geocoder.geocode({ placeId }).then(({ results }) => {
            return results[0].geometry.location
        }).catch((error) => {
            return error
        })
    });

export const clearCoordinates = createAsyncThunk(
    'clearCoordinates', async (parameters) => {
        return null
    });

export const appSlice = createSlice({
    name: 'GOOGLE',
    initialState: { coordinates: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoordinates.fulfilled, (state, { payload }) => {
            state.coordinates = payload;
        }).addCase(clearCoordinates.fulfilled, (state, { payload }) => {
            state.coordinates = payload;
        })
    }
})

export default appSlice.reducer