import { CONFIG } from "../config/config.js";
import { generateClues } from './game.js';


let countdownInterval
let timeRemaining = CONFIG.available_time;
let points;
let teamName;

function replaceLogo() {
  document.getElementById('main-logo').src = CONFIG.logo_url;
}

function confirmTeamName() {
  const section = document.getElementById('teamForm');
  const input = document.getElementById('team-name-input');
  const button = section.querySelector('button');
  const welcomeMsg = document.getElementById('welcome-message');
  const timeRemaining = document.getElementById('timeRemaining');

  teamName = input.value.trim();
  if (teamName) {
    saveTeam(teamName)
    section.classList.add('hidden');
    timeRemaining.classList.add('visible')
    // timeRemaining.textContent = teamName;
    // console.log(section)
    serializeTimer()
    startCountdown()
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function serializeTimer() {
  // const section = document.getElementById('timeRemaining');
  const counter = document.getElementById('counter');
  counter.textContent = formatTime(CONFIG.available_time)
}

function startCountdown() {
  const counter = document.getElementById('counter')

  counter.textContent = formatTime(timeRemaining)
  countdownInterval = setInterval(() => {
    timeRemaining--;
    counter.textContent = formatTime(timeRemaining)

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      counter.textContent = 'YOU LOSE';
      points = timeRemaining;
    }
  }, 1000);
}

function hideUI() {
  const counterSection = document.getElementById('timeRemaining');
  const span = counterSection.querySelector('span');
  const submitButton = counterSection.querySelector('button');
  const passwordInput = document.getElementById('password-input');
  const navSection = document.getElementById('navSection');
  const score = document.getElementById('score');

  span.classList.add('hidden');
  passwordInput.classList.add('hidden');
  submitButton.classList.add('hidden');

  navSection.classList.add('visible');
  setTeamPoints(teamName, points)
  score.textContent = `score: ${points}`;
  // score.classList.add('visible');
}

function checkPassword() {
  const passwordInput = document.getElementById('password-input');
  const password = passwordInput.value.trim()
  const validPasswords = CONFIG.passwords;
  const counter = document.getElementById('counter');
  const isValid = validPasswords.includes(password)

  if (isValid) {
    clearInterval(countdownInterval);
    counter.textContent = 'PASSWORD CORRECT!'
    points = timeRemaining;
    hideUI()
  } else {
    timeRemaining -= CONFIG.wrong_password_penalty; // Deduct 60 seconds as penalty

    if (timeRemaining <= 0) {
      timeRemaining = 0
      counter.textContent = 'YOU LOSE'
      clearInterval(countdownInterval);
      points = timeRemaining
      hideUI()
    } else {
      counter.textContent = formatTime(timeRemaining);
    }

    passwordInput.value = '';
    passwordInput.style.backgroundColor = '#ffcccc'; // Visual feedback
    setTimeout(() => {
      passwordInput.style.backgroundColor = '';
    }, 300);
  }
}

function saveTeam(teamName) {
  const team = {
    teamName,
    points: 0,
  }
  localStorage.setItem(teamName, JSON.stringify(team))
}

function setTeamPoints(teamName, points) {
  const teamString = localStorage.getItem(teamName)
  const team = JSON.parse(teamString)
  team.points = points

  // Save back to localStorage (convert to string again)
  localStorage.setItem(teamName, JSON.stringify(team))
  // team.points = points
}

function resetGame() {
// Clear the countdown interval if it's running
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  // Reset all variables to initial state
  timeRemaining = CONFIG.available_time;
  points = 0;
  teamName = null;

  // Reset UI elements
  const teamFormSection = document.getElementById('teamForm');
  const timeRemainingSection = document.getElementById('timeRemaining');
  const navSection = document.getElementById('navSection');
  const teamNameInput = document.getElementById('team-name-input');
  const passwordInput = document.getElementById('password-input');
  const counter = document.getElementById('counter');
  const score = document.getElementById('score');
  const span = timeRemainingSection.querySelector('span');
  const submitButton = timeRemainingSection.querySelector('button');

  // Clear inputs
  teamNameInput.value = '';
  passwordInput.value = '';
  passwordInput.style.backgroundColor = '';

  // Reset counter text
  counter.textContent = formatTime(CONFIG.available_time);
  score.textContent = '';

  // Show team form, hide everything else
  teamFormSection.classList.remove('hidden');
  timeRemainingSection.classList.remove('visible');
  timeRemainingSection.classList.add('hidden');
  navSection.classList.remove('visible');
  navSection.classList.add('hidden');

  // Show password input and submit button again
  span.classList.remove('hidden');
  passwordInput.classList.remove('hidden');
  submitButton.classList.remove('hidden');
}

function showScoreboard() {
  // Hide other sections
  const teamFormSection = document.getElementById('teamForm');
  const timeRemainingSection = document.getElementById('timeRemaining');
  const navSection = document.getElementById('navSection');

  teamFormSection.classList.add('hidden');
  timeRemainingSection.classList.remove('visible');
  timeRemainingSection.classList.add('hidden');
  navSection.classList.add('hidden');

  // Show scoreboard section
  const scoreboardSection = document.getElementById('scoreboardSection');
  scoreboardSection.classList.remove('hidden');
  scoreboardSection.classList.add('visible');

  // Get all teams from localStorage
  const teams = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const teamData = JSON.parse(localStorage.getItem(key));
    teams.push(teamData);
  }

  // Sort teams by points (highest first)
  teams.sort((a, b) => b.points - a.points);

  // Display teams in the scoreboard
  const scoreboardList = document.getElementById('scoreboardList');
  scoreboardList.innerHTML = ''; // Clear existing content

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

function hideScoreboard() {
  const scoreboardSection = document.getElementById('scoreboardSection');
  const navSection = document.getElementById('navSection');

  scoreboardSection.classList.remove('visible');
  scoreboardSection.classList.add('hidden');
  navSection.classList.remove('hidden');
  navSection.classList.add('visible');
}

// Add event listener for the scoreboard button
const scoreboardButton = document.getElementById('scoreboard');
scoreboardButton.addEventListener('click', showScoreboard);

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

const counterSection = document.getElementById('timeRemaining')
const passwordButton = counterSection.querySelector('button')
passwordButton.addEventListener('click', checkPassword)
// function save

const nextTeamButton = document.getElementById('nextTeam');
nextTeamButton.addEventListener('click', resetGame);
replaceLogo();

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', hideScoreboard);

generateClues()
