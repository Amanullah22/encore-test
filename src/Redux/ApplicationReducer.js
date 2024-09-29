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

const getSuggestions = (data) => {
    let newSuggestions = []
    data.map((item) => {
        const { description, place_id } = item
        let suggestionObject = {
            label: description,
            value: place_id
        }
        newSuggestions.push(suggestionObject)
    })

    return newSuggestions
}

export const getPredictions = createAsyncThunk(
    'getPredictions', async (parameters) => {
        const { autocompleteService, search } = parameters
        return await autocompleteService.getPredictions({ input: search }).then((response) => {
            return getSuggestions(response.predictions)
        }).catch((error) => {
            return error
        })
    });

export const clearPredictions = createAsyncThunk(
    'clearPredictions', async (parameters) => {
        return []
    });

export const appSlice = createSlice({
    name: 'GOOGLE',
    initialState: { coordinates: null, predictions: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoordinates.fulfilled, (state, { payload }) => {
            state.coordinates = payload;
        }).addCase(clearCoordinates.fulfilled, (state, { payload }) => {
            state.coordinates = payload;
        }).addCase(getPredictions.fulfilled, (state, { payload }) => {
            state.predictions = payload;
        }).addCase(clearPredictions.fulfilled, (state, { payload }) => {
            state.predictions = payload;
        })
    }
})

export default appSlice.reducer