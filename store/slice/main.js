import { createSlice } from "@reduxjs/toolkit"
import { memoize } from "proxy-memoize"

const initialState = {
   menus: [],
   pull: {
      status: false,
      success: '',
      error: ''
   },
   errorPull: {}
}

export const mainSlice = createSlice({
   name: "main",
   initialState,
   reducers: {
      setMenus: (state, action) => {
         state.menus = action.payload
      },
      setPull: (state, action) => {
         state.pull = action.payload
      },
      setErrorPull: (state, action) => {
         state.errorPull = action.payload
      },
   }
})

export const memoizeMenus = memoize((state) => state.main.menus)
export const memoizePull = memoize((state) => state.main.pull)
export const memoizeErrorPull = memoize((state) => state.main.errorPull)
export const { setMenus, setPull, setErrorPull } = mainSlice.actions