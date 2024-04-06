import { useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../reducers/authReducer'
import { loginRequest, logoutRequest } from '../actions/authActions'

export interface RootState {
  auth: AuthState
}

const useAuth = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const login = async (username: string, password: string) => {
    try {
      dispatch(loginRequest(username, password))
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    // ตัวอย่างการ dispatch action logout
    // คุณต้องเขียน action creator สำหรับการ logout และเพิ่ม reducer ในการจัดการการ logout ใน Redux store ของคุณ
    dispatch(logoutRequest())
  }

  return { isLoggedIn, login, logout }
}

export default useAuth
