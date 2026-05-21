import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const LOAD = 'LOAD';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const REORDER = 'REORDER';
const SET_STATUS = 'SET_STATUS';

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD:
      return action.payload;
    case ADD:
      if (state.find((m) => m.id === action.payload.id)) return state;
      return [{ ...action.payload, status: 'want', addedAt: Date.now() }, ...state];
    case REMOVE:
      return state.filter((m) => m.id !== action.payload);
    case REORDER:
      return action.payload;
    case SET_STATUS:
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, status: action.payload.status } : m
      );
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cinelist-wishlist');
      if (stored) dispatch({ type: LOAD, payload: JSON.parse(stored) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cinelist-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const add = (movie) => dispatch({ type: ADD, payload: movie });
  const remove = (id) => dispatch({ type: REMOVE, payload: id });
  const reorder = (list) => dispatch({ type: REORDER, payload: list });
  const setStatus = (id, status) => dispatch({ type: SET_STATUS, payload: { id, status } });
  const isInWishlist = (id) => wishlist.some((m) => m.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, add, remove, reorder, setStatus, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);