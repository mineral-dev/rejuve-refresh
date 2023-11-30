import base64 from "./base64"

const setAttachHomepage = async (data) => {
   let assign = {}
   if (data['Image']?.data) {
      Object.assign(assign, {
         [data['Image']?.data?.attributes?.name]: {
            content_type: data['Image']?.data?.attributes?.mime,
            data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${data['Image']?.data?.attributes?.url}`)
         }
      })
   }
   
   if (data['Intro']?.Image?.data) {
      Object.assign(assign, {
         [data['Intro']?.Image?.data?.attributes?.name]: {
            content_type: data['Intro']?.Image?.data?.attributes?.mime,
            data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${data['Intro']?.Image?.data?.attributes?.url}`)
         }
      })
   }

   if (data['Showcase'] && data['Showcase']?.length > 0) {
      await Promise.all(
         data['Showcase']?.map(async (item) => {
            if (item?.Image?.data) {
               Object.assign(assign, {
                  [item?.Image?.data?.attributes?.name]: {
                     content_type: item?.Image?.data?.attributes?.mime,
                     data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${item?.Image?.data?.attributes?.url}`)
                  }
               })
            }
         })
      )
   }

   if (data['ShowcaseSecond'] && data['ShowcaseSecond']?.Image?.data) {
      Object.assign(assign, {
         [data['ShowcaseSecond']?.Image?.data.attributes?.name]: {
            content_type: data['ShowcaseSecond']?.Image?.data.attributes?.mime,
            data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${data['ShowcaseSecond']?.Image?.data.attributes?.url}`)
         }
      })
   }
   
   if (data['Slideshow'] && data['Slideshow']?.Slideshow?.length > 0) {
      await Promise.all(
         data['Slideshow']?.Slideshow?.map(async (item) => {
            if (item?.Image?.data) {
               Object.assign(assign, {
                  [item?.Image?.data?.attributes?.name]: {
                     content_type: item?.Image?.data?.attributes?.mime,
                     data: await base64(`${process.env.NEXT_PUBLIC_RESTAPI_URL}${item?.Image?.data?.attributes?.url}`)
                  }
               })
            }
         })
      )
   }

   return assign
}

export default setAttachHomepage