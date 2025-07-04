// features/events/eventSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: []
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    }
  }
});

export const { setEvents } = eventSlice.actions;
export const selectEvents = (state) => state.events.events;
export default eventSlice.reducer;
