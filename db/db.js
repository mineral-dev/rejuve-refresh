import PouchDB from "pouchdb";

const db = new PouchDB('rejuve', {
   fetch: function (url, opts) {
      return PouchDB.fetch(url, opts);
   }
})

export default db