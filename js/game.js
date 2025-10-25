import { CONFIG } from "../config/config.js";

const HIDDEN = 'hidden';
const GAME_ELEMENTS = [
  'teamForm',
  'gameOverMenu',
  'timeRemaining',
  'scoreboard',
];

export function replaceLogo() {
  document.getElementById('main-logo').src = CONFIG.logo_url;
}


function showElement(id) {
  if (!GAME_ELEMENTS.includes(id)) {
    console.error(`ERROR: element with id: ${id} not found`)
    return
  }

  let element = document.getElementById(id);
  element.classList.remove(HIDDEN);

  GAME_ELEMENTS.filter(item => item !== id).forEach((idToHide) => {
    let elementToHide = document.getElementById(idToHide);
    elementToHide.classList.add(HIDDEN);
  });
}

let countdownInterval
let timeRemaining = CONFIG.available_time;
var points;
let teamName;
let resetGameDataEnabled = false;

export function nextTeamTurn() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  timeRemaining = CONFIG.available_time;

  const teamNameInput = document.getElementById('team-name-input');
  teamNameInput.value = '';
  showElement('teamForm');
  teamNameInput.focus()
}

export function generateClues() {
  const cluesContainer = document.getElementById('clues');
  // CONFIG.clues.forEach((clue) => {
  //   const clueElement = document.createElement('button')
  //   clueElement.innerText = clue.button_text;
  //   cluesContainer.appendChild(clueElement)
  // });
}

export function confirmTeamName() {
  const input = document.getElementById('team-name-input');

  teamName = input.value.trim();
  if (teamName) {
    saveTeam(teamName, 0)
    showElement('timeRemaining');
    serializeTimer()
    startCountdown()
  }
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function serializeTimer() {
  const counter = document.getElementById('counter');
  counter.textContent = formatTime(CONFIG.available_time)
}

export function startCountdown() {
  const counter = document.getElementById('counter')

  counter.textContent = formatTime(timeRemaining)
  countdownInterval = setInterval(() => {
    timeRemaining--;
    counter.textContent = formatTime(timeRemaining)

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      const turnOverMessage = document.getElementById('turnOverMessage');
      const teamPoints = document.getElementById('teamPoints');
      turnOverMessage.textContent = CONFIG.failure_message;
      teamPoints.textContent = 0;
      points = timeRemaining;
    }
  }, 1000);
}

export function checkPassword() {
  const passwordInput = document.getElementById('password-input');
  const password = passwordInput.value.trim()
  const validPasswords = CONFIG.passwords;
  const counter = document.getElementById('counter');
  const isValid = validPasswords.includes(password)

  if (isValid) {
    clearInterval(countdownInterval);
    points = timeRemaining;

    const turnOverMessage = document.getElementById('turnOverMessage');
    const teamPoints = document.getElementById('teamPoints');
    turnOverMessage.textContent = CONFIG.success_message;
    teamPoints.textContent = points;
    saveTeam(teamName, points);
    showElement('gameOverMenu');
  } else {
    timeRemaining -= CONFIG.wrong_password_penalty;
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      timeRemaining = 0
      points = 0
      showElement('gameOverMenu');
    } else {
      counter.textContent = formatTime(timeRemaining);
    }

    passwordInput.value = '';
    passwordInput.style.backgroundColor = '#e26464ff';
    setTimeout(() => {
      passwordInput.style.backgroundColor = '';
    }, 300);
  }
}

export function saveTeam(teamName, points = 0) {
  const team = { teamName, points: points.toString() };
  localStorage.setItem(teamName, JSON.stringify(team));
}

export function showScoreboard() {
  showElement('scoreboard');

  const teams = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const teamData = JSON.parse(localStorage.getItem(key));
    teams.push(teamData);
  }

  teams.sort((a, b) => b.points - a.points);

  const scoreboardList = document.getElementById('scoreboardList');
  scoreboardList.innerHTML = '';

  teams.forEach((team, index) => {
    const teamItem = document.createElement('div');
    teamItem.className = 'scoreboard-item';
    teamItem.innerHTML = `
      <span class="rank">${index + 1}.</span>
      <span class="team-name">${team.teamName}</span>
      <span class="team-points">${team.points}</span>
    `;
    scoreboardList.appendChild(teamItem);
  });
}

export function downloadScore() {
  const teams = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const teamData = JSON.parse(localStorage.getItem(key));
    teams.push(teamData);
  }

  const headers = Object.keys(teams[0]);

  let csv = headers.join(',') + '\n';
  teams.forEach(team => {
    csv += headers.map(header => team[header] || '').join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'team_scores.csv';
  a.click();

  URL.revokeObjectURL(url);
  resetGameDataEnabled = true;
  enableResetGameDataButton();
}

function enableResetGameDataButton() {
  document.getElementById('resetGameDataButton').classList.remove('disabledButton')
}

function disableResetGameDataButton() {
  document.getElementById('resetGameDataButton').classList.add('disabledButton')
}

export function resetGameData() {
  if (!resetGameDataEnabled) {
    return
  }

  nextTeamTurn()

  localStorage.clear()
  disableResetGameDataButton();
  resetGameDataEnabled = false;
}
