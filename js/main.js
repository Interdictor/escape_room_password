import { checkPassword, confirmTeamName, generateClues, nextTeamTurn, showScoreboard, replaceLogo } from './game.js';
import { downloadScore, resetGameData } from './game.js';




const scoreboardButton = document.getElementById('scoreboardButton');
scoreboardButton.addEventListener('click', showScoreboard);

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

const counterSection = document.getElementById('timeRemaining')
const passwordButton = counterSection.querySelector('button')
passwordButton.addEventListener('click', checkPassword)

const nextTeamButton = document.getElementById('nextTeam');
nextTeamButton.addEventListener('click', nextTeamTurn);
replaceLogo();

document.getElementById('downloadCsvButton').addEventListener('click', downloadScore);
document.getElementById('resetGameDataButton').addEventListener('click', resetGameData);
document.getElementById('scoreboardNextTeamTurnButton').addEventListener('click', nextTeamTurn);

generateClues()
