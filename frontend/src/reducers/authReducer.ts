// src/reducers/authReducer.ts
import { Reducer } from 'redux'
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions/types'

export interface AuthState {
  isLoggedIn: boolean
  user: any // ตามข้อมูลของผู้ใช้
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
}

const authReducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}

export default authReducer
