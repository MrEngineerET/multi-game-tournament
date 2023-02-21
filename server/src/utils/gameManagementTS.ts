export function assignGames(
  players: number[],
  games: { id: number; count: number }[],
  matches: [number, number][],
): number[] {
  // Create a list of available games, with each game repeated by its count
  let availableGames: number[] = []
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].count; j++) {
      availableGames.push(games[i].id)
    }
  }

  // Create a matrix to keep track of the number of times each player has played each game
  const matrix: number[][] = []
  for (let i = 0; i < players.length; i++) {
    matrix[i] = []
    for (let j = 0; j < games.length; j++) {
      matrix[i][j] = 0
    }
  }

  // Loop through each match and assign the game that neither player has played the least
  const assignedGames: number[] = []
  for (let i = 0; i < matches.length; i++) {
    const player1 = matches[i][0]
    const player2 = matches[i][1]
    let minPlays = Number.MAX_SAFE_INTEGER
    let minPlaysGame = -1
    for (let j = 0; j < availableGames.length; j++) {
      const game = availableGames[j]
      if (matrix[player1][game] + matrix[player2][game] < minPlays) {
        minPlays = matrix[player1][game] + matrix[player2][game]
        minPlaysGame = game
      }
    }
    // Assign the game and update the matrix and available games list
    assignedGames[i] = minPlaysGame
    matrix[player1][minPlaysGame]++
    matrix[player2][minPlaysGame]++
    availableGames = availableGames.filter((g) => g !== minPlaysGame)
  }

  return assignedGames
}
