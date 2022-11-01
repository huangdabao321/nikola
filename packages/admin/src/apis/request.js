import { request } from "@nikola/utils";

import.meta.env.PROD && (request.defaults.baseURL = import.meta.env.VITE_APIURL)

export default request