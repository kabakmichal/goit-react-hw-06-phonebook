import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsInitialState = {
  items: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
        localStorage.setItem('items', JSON.stringify(state.items));
      },
      prepare(name, number) {
        return {
          payload: { id: nanoid(6), name, number },
        };
      },
    },

    deleteContact(state, action) {
      let filtered = state.items.filter(item => item.id !== action.payload);
      state.items = filtered;
      localStorage.setItem('items', JSON.stringify(state.items));
    },

    handleFilter(state, action) {
      state.filter = action.payload;
    },

    setInitialItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { addContact, deleteContact, handleFilter, setInitialItems } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
