import base64 from "./base64"

const setAttachCategories = async (data) => {
   let assign = {}

   await Promise.all(data.map(async (item) => {
      if (item?.attributes?.fnbMenus?.data && item?.attributes?.fnbMenus?.data?.length > 0) {
         await Promise.all(item?.attributes?.fnbMenus?.data?.map(async (fnb) => {
            if (fnb?.attributes?.Icon?.data) {
               Object.assign(assign, {
                  [fnb?.attributes?.Icon?.data?.attributes?.name]: {
                     content_type: fnb?.attributes?.Icon?.data?.attributes?.mime,
                     data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${fnb?.attributes?.Icon?.data?.attributes?.url}`)
                  }
               })
            }
         }))
      }
   }))

   return assign
}

export default setAttachCategories