import { all, call, takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../actions/types'

import Cookies from 'js-cookie' // import ไลบรารี js-cookie

function* loginSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, 'http://localhost:4000/login', action.payload)
    yield put({ type: LOGIN_SUCCESS, payload: response.data })

    // หลังจากเข้าสู่ระบบสำเร็จ จะเก็บ accessToken เข้า cookies
    Cookies.set('accessToken', response.data.token)
  } catch (error: any) {
    yield put({ type: LOGIN_FAILURE, payload: error.message })
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    // เรียกใช้ API สำหรับการล็อกเอ้าท์
    // ตัวอย่างเช่น:
    // const response = yield call(axios.post, 'http://localhost:4000/logout');
    // ถ้าล็อกเอ้าท์สำเร็จ ส่ง action ไปยัง reducer ในการอัปเดต state ให้ไม่ได้เข้าสู่ระบบ
    yield put({ type: LOGOUT_SUCCESS })
  } catch (error: any) {
    // ถ้าเกิดข้อผิดพลาดในการล็อกเอ้าท์ ส่ง action ไปยัง reducer ในการจัดการข้อผิดพลาด
    yield put({ type: LOGOUT_FAILURE, payload: error.message })
  }
}

function* watchLogin(): Generator<any, void, any> {
  yield takeLatest(LOGIN_REQUEST, loginSaga)
}

function* watchLogout(): Generator<any, void, any> {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga)
}

export default function* authSaga(): Generator<any, void, any> {
  yield all([
    watchLogin(),
    watchLogout(),
    // สามารถเพิ่ม side effect อื่น ๆ เกี่ยวกับการเข้าสู่ระบบหรือล็อกเอ้าท์ได้ตามต้องการ
  ])
}
