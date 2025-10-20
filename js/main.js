import { CONFIG } from "../config/config.js";

let countdownInterval
let timeRemaining = CONFIG.available_time;

function replaceLogo() {
  document.getElementById('main-logo').src = CONFIG.logo_url;
}

function confirmTeamName() {
  const section = document.getElementById('teamForm');
  const input = document.getElementById('team-name-input');
  const button = section.querySelector('button');
  const welcomeMsg = document.getElementById('welcome-message');
  const timeRemaining = document.getElementById('timeRemaining');

  const teamName = input.value.trim();
  if (teamName) {
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
      console.log('Time is up!');
    }
  }, 1000);
}

function checkPassword() {
  const passwordInput = document.getElementById('password-input');
  const password = passwordInput.value.trim()
  const validPasswords = CONFIG.passwords;
  const counter = document.getElementById('counter');

  const isValid = validPasswords.includes(password)

  if (isValid) {
    console.log('Hurrey for boobies!')
    clearInterval(countdownInterval);
  } else {
    console.log('Estás muerto perro')
    timeRemaining -= CONFIG.penalty_time; // Deduct 60 seconds as penalty
    
    if (timeRemaining <= 0) {
      timeRemaining = 0
      // counter.textContent = formatTime(timeRemaining)
    };
    
    counter.textContent = formatTime(timeRemaining);
    
    passwordInput.value = '';
    passwordInput.style.backgroundColor = '#ffcccc'; // Visual feedback
    setTimeout(() => {
      passwordInput.style.backgroundColor = '';
    }, 300);
  }
}

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

const counterSection = document.getElementById('timeRemaining')
const passwordButton = counterSection.querySelector('button')
passwordButton.addEventListener('click', checkPassword)
// function save

replaceLogo();
