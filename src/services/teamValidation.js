const validateTeam = (players) => {
  if (players.length !== 11) {
    return { valid: false, message: 'A team must have exactly 11 players.' };
  }

  const totalCost = players.reduce((acc, player) => acc + player.cost, 0);
  if (totalCost > 100) {
    return { valid: false, message: 'Team budget exceeded. Maximum is 100 credits.' };
  }

  const roles = {
    'Wicket-Keeper': 0,
    'Batsman': 0,
    'All-Rounder': 0,
    'Bowler': 0,
  };

  players.forEach(player => {
    roles[player.role]++;
  });

  if (roles['Wicket-Keeper'] < 1) {
    return { valid: false, message: 'A team must have at least 1 Wicket-Keeper.' };
  }
  if (roles['Batsman'] < 3 || roles['Batsman'] > 5) {
    return { valid: false, message: 'A team must have between 3 and 5 Batsmen.' };
  }
  if (roles['All-Rounder'] < 1 || roles['All-Rounder'] > 3) {
    return { valid: false, message: 'A team must have between 1 and 3 All-Rounders.' };
  }
  if (roles['Bowler'] < 3 || roles['Bowler'] > 5) {
    return { valid: false, message: 'A team must have between 3 and 5 Bowlers.' };
  }

  return { valid: true };
};

module.exports = { validateTeam };
