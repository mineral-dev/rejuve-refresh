import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rejuveApi = createApi({
  reducerpage: "rejuveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_RESTAPI_URL,
  }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getMenus: build.query({
      query: () => ({
        url: `/api/menus/1?populate[items][populate][0]=Image&populate[items][populate][1]=FnbCategories.fnbMenus&populate[items][populate][2]=FnbCategories.fnbMenus.Icon&populate[items][populate][3]=FnbCategories.fnbMenus.Media`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getCategories: build.query({
      query: () => ({
        url: `/api/food-and-beverages-categories?populate[0]=fnbMenus&populate[1]=fnbMenus.Icon`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getFnb: build.query({
      query: () => ({
        url: `/api/fnb-menus`,
      }),
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getHomepage: build.query({
      query: () => ({
        url: `/api/homepage?populate[0]=Intro&populate[1]=Showcase&populate[2]=Showcase.Image&populate[3]=Showcase.Cta&populate[4]=ShowcaseSecond&populate[5]=ShowcaseSecond.Image&populate[6]=ShowcaseSecond.Cta&populate[7]=ShowcaseThird&populate[8]=Slideshow&populate[9]=Slideshow.Slideshow&populate[10]=Slideshow.Slideshow.Image&populate[11]=Slideshow.Slideshow.Cta&populate[12]=Intro.Image&populate[13]=Image`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getEnjoy: build.query({
      query: () => ({
        url: `/api/how-to-enjoy?populate[0]=Intro&populate[1]=Intro.Image&populate[2]=Showcase&populate[3]=Showcase.Icon&populate[4]=Showcase.Image&populate[5]=Showcase.Cta&populate[6]=Banner&populate[7]=Banner.Icon&populate[8]=Banner.Image&populate[9]=Banner.Cta`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getLocation: build.query({
      query: () => ({
        url: `/api/location?populate[0]=Intro&populate[1]=Intro.Image&populate[2]=Banner&populate[3]=Banner.Icon&populate[4]=Banner.Image&populate[5]=Banner.Cta`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getStoreLocation: build.query({
      query: () => ({
        url: `/api/store-locations?populate[0]=Image&populate[1]=Cta`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getSeo: build.query({
      query: ({ page }) => ({
        url: `/api/seos?populate[0]=Seo&populate[1]=Seo.metaImage&filters[Page][$eq]=${page}`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getAllSeo: build.query({
      query: () => ({
        url: `/api/seos?populate[0]=Seo&populate[1]=Seo.metaImage`,
      }),
      transformResponse: (response, meta, arg) => response?.data,
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetCategoriesQuery,
  useGetFnbQuery,
  useGetHomepageQuery,
  useGetEnjoyQuery,
  useGetLocationQuery,
  useGetStoreLocationQuery,
  useGetSeoQuery,
  useGetAllSeoQuery,
} = rejuveApi;
