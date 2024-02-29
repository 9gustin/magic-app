import { ourFileRouter } from "@/features/uploadthing/fileRouter"

import { createRouteHandler } from "uploadthing/next-legacy"

export default createRouteHandler({
  router: ourFileRouter,
})
