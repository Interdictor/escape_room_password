import { CONFIG } from "../config/config.js";

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
  let timeRemaining = CONFIG.available_time;
  const counter = document.getElementById('counter')

  counter.textContent = formatTime(timeRemaining)
  const countdownInterval = setInterval(() => {
    timeRemaining--;
    counter.textContent = formatTime(timeRemaining)

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      console.log('Time is up!');
    }
  }, 1000);
}

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

// function save

replaceLogo();
