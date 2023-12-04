import base64 from "./base64";

const setAttachLocation = async (data) => {
  let assign = {};
  if (data["Intro"]?.Image?.data) {
    Object.assign(assign, {
      [data["Intro"]?.Image?.data?.attributes?.name]: {
        content_type: data["Intro"]?.Image?.data?.attributes?.mime,
        data: await base64(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}${data["Intro"]?.Image?.data?.attributes?.url}`,
        ),
      },
    });
  }

  if (data["Banner"]) {
    if (data["Banner"]?.Image?.data) {
      Object.assign(assign, {
        [data["Banner"]?.Image?.data?.attributes?.name]: {
          content_type: data["Banner"]?.Image?.data?.attributes?.mime,
          data: await base64(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}${data["Banner"]?.Image?.data?.attributes?.url}`,
          ),
        },
      });
    }

    if (data["Banner"]?.Icon?.data) {
      Object.assign(assign, {
        [data["Banner"]?.Icon?.data?.attributes?.name]: {
          content_type: data["Banner"]?.Icon?.data?.attributes?.mime,
          data: await base64(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}${data["Banner"]?.Icon?.data?.attributes?.url}`,
          ),
        },
      });
    }
  }

  return assign;
};

export default setAttachLocation;
