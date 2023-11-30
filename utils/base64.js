const base64 = async (url) => {
   let res = await fetch(url);
   let blob = await res.blob();

   return new Promise((resolve, reject) => {
      let reader  = new FileReader();

      reader.addEventListener("load", function () {
         const res = reader?.result.split(',')
         if (res?.length > 1) {
            resolve(reader?.result.split(',')[1]);
         }
      }, false);

      reader.onerror = () => {
         return reject(this);
      };

      reader.readAsDataURL(blob);
   })
}

export default base64