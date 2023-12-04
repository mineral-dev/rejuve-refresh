import base64 from "./base64";

const setAttachDbMenu = async (data) => {
  let assign = {};
  await Promise.all(
    data.map(async (item) => {
      for (const key in item?.attributes) {
        const element = item?.attributes[key];

        if (key === "Image") {
          const nameAttachment = element?.data?.attributes?.name;
          Object.assign(assign, {
            [nameAttachment]: {
              content_type: element?.data?.attributes?.mime,
              data: await base64(
                `${process.env.NEXT_PUBLIC_RESTAPI_URL}${element?.data?.attributes?.url}`,
              ),
            },
          });
        }

        let categories = item?.attributes?.FnbCategories?.data;

        if (key === "FnbCategories" && categories.length > 0) {
          categories.map((cat) => {
            cat?.attributes?.fnbMenus?.data?.length > 0 &&
              cat?.attributes?.fnbMenus?.data?.map(async (fnb) => {
                if (fnb?.attributes?.Icon?.data) {
                  Object.assign(assign, {
                    [fnb?.attributes?.Icon?.data?.attributes?.name]: {
                      content_type:
                        fnb?.attributes?.Icon?.data?.attributes?.mime,
                      data: await base64(
                        `${process.env.NEXT_PUBLIC_RESTAPI_URL}${fnb?.attributes?.Icon?.data?.attributes?.url}`,
                      ),
                    },
                  });
                }
              });
          });
        }
      }
      console.log(item);
    }),
  );

  return assign;
};

export default setAttachDbMenu;
