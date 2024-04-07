import { useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../reducers/authReducer'
import { loginRequest, logoutRequest } from '../actions/authActions'
import Cookies from 'js-cookie' // import ไลบรารี js-cookie

export interface RootState {
  auth: AuthState
}

const useAuth = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const login = async (username: string, password: string) => {
    try {
      // เช็คค่า accessToken ในคุกกี้ก่อนทำการ login
      const accessToken = Cookies.get('accessToken')
      if (!accessToken) {
        // ถ้าไม่มี accessToken ในคุกกี้ให้ทำการ login
        dispatch(loginRequest(username, password))
      } else {
        // ถ้ามี accessToken ในคุกกี้แล้วให้ทำการ redirect ไปหน้าหลัก
        // หรือทำการตั้งค่าใน Redux store เพื่อให้แสดงว่าล็อกอินแล้ว
        console.log('User is already logged in')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    try {
      // เช็คค่า accessToken ในคุกกี้ก่อนทำการ logout
      const accessToken = Cookies.get('accessToken')
      if (accessToken) {
        // ถ้ามี accessToken ในคุกกี้ให้ทำการลบค่า accessToken ออกจากคุกกี้
        Cookies.remove('accessToken')
      }
      // ทำการ logout โดย dispatch action logoutRequest
      dispatch(logoutRequest())
    } catch (error) {
      console.error(error)
    }
  }

  return { isLoggedIn, login, logout }
}

export default useAuth
