import React from "react"
import { useRouteError } from "react-router-dom"

export function ErrorPage() {
  const error = useRouteError()
  const errorMessage = error?.response?.data.message
  console.log("error", error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage || error?.message || "Something went wrong"}</i>
      </p>
    </div>
  )
}
