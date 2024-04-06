// src/actions/authActions.ts
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './types'

export const loginRequest = (username: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
})

export const loginSuccess = (accessToken: string) => ({
  type: LOGIN_SUCCESS,
  payload: accessToken,
})

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
})

// เพิ่มฟังก์ชัน logout
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const logoutFailure = (error: string) => ({
  type: LOGOUT_FAILURE,
  payload: error,
})
