import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaceDetails = createAsyncThunk(
  "location/fetchPlaceDetails",
  async (place, { rejectWithValue }) => {
    try {
      if (!place.geometry || !place.geometry.location) {
        return rejectWithValue({
          name: place.name || "Unknown",
          error: "No geometry/location details found",
          timestamp: new Date().toISOString(),
        });
      }
      return {
        placeId: place.place_id,
        name: place.name,
        formattedAddress: place.formatted_address,
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        types: place.types || [],
        timestamp: new Date().toLocaleTimeString(),
        status: "SUCCESS",
      };
    } catch (error) {
      return rejectWithValue({
        name: place.name,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  },
);

const initialState = {
  selectedPlace: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentPlace: null,
    searchHistory: [],
    status: "idle",
  },
  reducers: {
    clearHistory: (state) => {
      state.searchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlaceDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPlace = action.payload;
        state.searchHistory.unshift(action.payload);
      })
      .addCase(fetchPlaceDetails.rejected, (state, action) => {
        state.status = "failed";
        state.searchHistory.unshift({
          name: action.payload?.name || "Invalid Search",
          status: "FAILED",
          error: action.payload?.error || "Location Not Found",
          timestamp: new Date().toLocaleTimeString(),
        });
      });
  },
});

export const { clearHistory } = locationSlice.actions;
export default locationSlice.reducer;
