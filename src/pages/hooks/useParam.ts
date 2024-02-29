import { useRouter } from "next/router"
import { useParam } from "@blitzjs/next"

export const useStringParam = (name) => {
  return useParam(name, "string")
}

export const useStringQueryParam = (name) => {
  let { query } = useRouter()
  return query[name]
}
