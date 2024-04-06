// src/reducers/index.ts
import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { AuthState } from './authReducer'

export interface RootState {
  auth: AuthState
}

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
