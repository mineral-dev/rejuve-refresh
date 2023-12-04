import base64 from "./base64";

const setAttachFnb = async (data) => {
  let assign = {};
  await Promise.all(
    data.map(async (item) => {
      if (item.Image) {
        Object.assign(assign, {
          [item.Image?.name]: {
            content_type: item.Image.mime,
            data: await base64(
              `${process.env.NEXT_PUBLIC_RESTAPI_URL}${item.Image.url}`,
            ),
          },
        });
      }
    }),
  );

  return assign;
};

export default setAttachFnb;
