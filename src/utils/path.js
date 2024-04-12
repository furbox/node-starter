import * as url from "node:url"

export default url.fileURLToPath(new URL("../", import.meta.url))