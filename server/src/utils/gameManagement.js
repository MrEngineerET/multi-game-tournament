function assignGames(players, games, matches) {
  // Create an array to store the available games
  let availableGames = []
  // Loop over the games array and add each game to the availableGames array the specified number of times
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < games[i].count; j++) {
      availableGames.push(games[i].id)
    }
  }

  // Create a matrix to store the number of times each player has played each game
  const matrix = []
  for (let i = 0; i < players.length; i++) {
    matrix[i] = []
    for (let j = 0; j < games.length; j++) {
      matrix[i][j] = 0
    }
  }

  // Create an array to store the assigned games
  const assignedGames = []
  // Loop over the matches array and assign a game to each match
  for (let i = 0; i < matches.length; i++) {
    // Get the two players in the current match
    const player1 = matches[i][0]
    const player2 = matches[i][1]
    // Initialize a variable to store the minimum number of times the players have played a game
    let minPlays = Number.MAX_SAFE_INTEGER
    // Initialize a variable to store the game with the minimum number of plays
    let minPlaysGame = -1
    // Loop over the availableGames array and find the game with the minimum number of plays
    for (let j = 0; j < availableGames.length; j++) {
      const game = availableGames[j]
      if (matrix[player1][game] + matrix[player2][game] < minPlays) {
        minPlays = matrix[player1][game] + matrix[player2][game]
        minPlaysGame = game
      }
    }
    // Assign the game with the minimum number of plays to the current match
    assignedGames[i] = minPlaysGame
    // Increment the number of times each player has played the game
    matrix[player1][minPlaysGame]++
    matrix[player2][minPlaysGame]++
    // Remove the assigned game from the availableGames array
    availableGames = availableGames.filter((g) => g !== minPlaysGame)
  }

  // Return the assigned games
  return assignedGames
}
