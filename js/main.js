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
    console.log(section)
  }
}

const section = document.getElementById('teamForm');
const button = section.querySelector('button');
button.addEventListener('click', confirmTeamName);

// function save

// replaceLogo();
