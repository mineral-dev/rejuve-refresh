import { createSlice } from "@reduxjs/toolkit"
import { memoize } from "proxy-memoize"

const initialState = {
   menus: [],
   pull: {
      status: false,
      success: '',
      error: ''
   }
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
   }
})

export const memoizeMenus = memoize((state) => state.main.menus)
export const memoizePull = memoize((state) => state.main.pull)
export const { setMenus, setPull } = mainSlice.actions