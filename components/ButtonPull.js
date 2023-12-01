import db from "@/db/db"
import { useGetCategoriesQuery, useGetEnjoyQuery, useGetFnbQuery, useGetHomepageQuery, useGetLocationQuery, useGetMenusQuery, useGetStoreLocationQuery } from "@/store/services/api"
import { memoizePull } from "@/store/slice/main"
import setAttachDbMenu from "@/utils/setAttachDbMenu"
import setAttachCategories from "@/utils/setAttchDbCategories"
import setAttachEnjoy from "@/utils/setAttchDbEnjoy"
import setAttachFnb from "@/utils/setAttchDbFnb"
import setAttachHomepage from "@/utils/setAttchDbHomepage"
import setAttachLocation from "@/utils/setAttchDbLocation"
import { useDispatch, useSelector } from "react-redux"

export default function ButtonPull() {
   const dispacth = useDispatch()
   const pull = useSelector(memoizePull)
   const { data: dataEnjoy, isError: isErrorEnjoy, error: errorEnjoy, loading: loadingEnjoy } = useGetEnjoyQuery()
   const { data: dataMenu, isError: isErrorMenu, error: errorMenu, loading: loadingMenu } = useGetMenusQuery()
   const { data: dataHome, isError: isErrorHome, error: errorHome, loading: loadingHome} = useGetHomepageQuery()
   const { data: dataCat, isError: isErrorCat, error: errorCat } = useGetCategoriesQuery()
   const { data: dataFnb, isError: isErrorFnb, error: errorFnb } = useGetFnbQuery()
   const { data: dataLoc, isError: isErrorLoc, error: errorLoc, loading: loadingLoc } = useGetLocationQuery()
   const { data: dataStore, isError: isErrorStore, error: errorStore, loading: loadingStore } = useGetStoreLocationQuery()

   const handlePull = () => {
      if (!errorEnjoy && dataEnjoy?.attributes) {
         db.get('enjoy')
         .then(async (doc) => {
            const body = {
               _id: 'enjoy',
               _rev: doc._rev,
               data: dataEnjoy?.attributes,
               _attachments: await setAttachEnjoy(dataEnjoy?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'enjoy',
               data: dataEnjoy?.attributes,
               _attachments: await setAttachEnjoy(dataEnjoy?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }

      if (!errorMenu && dataMenu?.attributes?.items?.data && dataMenu?.attributes?.items?.data?.length > 0){
         db.get('menus')
         .then(async (doc) => {
            const body = {
               _id: 'menus',
               _rev: doc._rev,
               data: dataMenu?.attributes?.items?.data,
               _attachments: await setAttachDbMenu(dataMenu?.attributes?.items?.data)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'menus',
               data: dataMenu?.attributes?.items?.data,
               _attachments: await setAttachDbMenu(dataMenu?.attributes?.items?.data)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }
      
      if (!errorHome && dataHome?.attributes) {
         db.get('homepage')
         .then(async (doc) => {
            const body = {
               _id: 'homepage',
               _rev: doc._rev,
               data: dataHome?.attributes,
               _attachments: await setAttachHomepage(dataHome?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'homepage',
               data: dataHome?.attributes,
               _attachments: await setAttachHomepage(dataHome?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }

      if (!errorCat && dataCat?.length > 0) {
         db.get('categories')
         .then(async (doc) => {
            const body = {
               _id: 'categories',
               _rev: doc._rev,
               data: dataCat,
               _attachments: await setAttachCategories(dataCat)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'categories',
               data: dataCat,
               _attachments: await setAttachCategories(dataCat)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }

      if (!errorFnb && dataFnb?.length > 0) {
         db.get('fnb')
         .then(async (doc) => {
            const body = {
               _id: 'fnb',
               _rev: doc._rev,
               data: dataFnb,
               _attachments: await setAttachFnb(dataFnb)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'fnb',
               data: dataFnb,
               _attachments: await setAttachFnb(dataFnb)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }

      if (!errorLoc && dataLoc?.attributes) {
         db.get('location')
         .then(async (doc) => {
            const body = {
               _id: 'location',
               _rev: doc._rev,
               data: dataLoc?.attributes,
               _attachments: await setAttachLocation(dataLoc?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'location',
               data: dataLoc?.attributes,
               _attachments: await setAttachLocation(dataLoc?.attributes)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }

      if (!errorStore && dataStore?.length > 0) {
         db.get('store')
         .then(async (doc) => {
            const body = {
               _id: 'store',
               _rev: doc._rev,
               data: dataStore,
               _attachments: await setAttachFnb(dataStore)
            }
            db.put(body).catch((e)=>console.warn(e))
         })
         .catch(async(e)=>{
            const body = {
               _id: 'store',
               data: dataStore,
               _attachments: await setAttachFnb(dataStore)
            }
            db.put(body).catch((e)=>console.warn(e))
         });
      }
   }

   return (
      <button onClick={handlePull}>
         PULL
      </button>
   )
}