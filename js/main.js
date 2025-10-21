import { CONFIG } from "../config/config.js";

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
    timeRemaining -= CONFIG.penalty_time; // Deduct 60 seconds as penalty
    
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

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

const counterSection = document.getElementById('timeRemaining')
const passwordButton = counterSection.querySelector('button')
passwordButton.addEventListener('click', checkPassword)
// function save

const newGameButton = document.getElementById('')
replaceLogo();
