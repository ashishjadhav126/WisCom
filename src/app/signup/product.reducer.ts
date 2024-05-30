import { createReducer, on } from '@ngrx/store';
import { getProduct } from './product.actions';

export const initialState = 0;

export const productReducer = createReducer(
  initialState,
  on(getProduct, (state) => state + 1),
);
