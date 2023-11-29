import { createSlice } from "@reduxjs/toolkit"
import { memoize } from "proxy-memoize"

const initialState = {
   menus: []
}

export const mainSlice = createSlice({
   name: "main",
   initialState,
   reducers: {
      setMenus: (state, action) => {
         state.menus = action.payload
      },
   }
})
export const memoizeMenus = memoize((state) => state.main.menus)
export const { setMenus } = mainSlice.actions