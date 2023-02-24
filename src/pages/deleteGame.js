import { redirect } from "react-router-dom"
import { deleteGame } from "../api/game"

export async function action({ params }) {
  try {
    await deleteGame(params.id)
    return redirect("/game")
  } catch (error) {
    console.log("error in delete game action")
  }
}
