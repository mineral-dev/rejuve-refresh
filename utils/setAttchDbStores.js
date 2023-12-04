const setAttachStores = async (data) => {
  let assign = {};
  await Promise.all(
    data.map(async (item) => {
      if (item.attributes?.Image?.data) {
        Object.assign(assign, {
          [item.attributes?.Image?.data?.attributes?.name]: {
            content_type: item.attributes?.Image?.data?.attributes?.mime,
            data: await base64(
              `${process.env.NEXT_PUBLIC_RESTAPI_URL}${item.attributes?.Image?.data?.attributes?.url}`,
            ),
          },
        });
      }
    }),
  );

  return assign;
};

export default setAttachStores;
