// src/actions/types.ts
// คุณสามารถกำหนดชนิดข้อมูลของ action ต่าง ๆ ที่นี่
// src/actions/types.ts
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
// src/actions/types.ts
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

// อื่น ๆ ตามความต้องการของโปรเจ็ค เช่น FETCH_DATA, UPDATE_DATA, DELETE_DATA ฯลฯ
// src/actions/types.ts
export interface Action {
  type: string
  payload?: any
}
