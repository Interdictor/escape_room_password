export const CONFIG = {
  // password: 'some_password',
  logo_url: 'images/default_logo.svg',
  available_time: 60 * 25,
  wrong_password_penalty: 60 * 24 + 58,
  clue_use_penalty: 20,
  success_message: 'CORRECT PASSWORD',
  failure_message: 'GAME OVER',
  passwords: [
    'pepa', // case insensitive. add feature
  ],
  clues: [ // five clues
    {
      button_text: 'clue a',
      tooltip_text: 'some information related with a',
    },
    {
      button_text: 'clue b',
      tooltip_text: 'some information related with b',
    },
    {
      button_text: 'clue c',
      tooltip_text: 'some information related with c',
    },
    {
      button_text: 'clue d',
      tooltip_text: 'some information related with c',
    },
    {
      button_text: 'clue e',
      tooltip_text: 'some information related with c',
    },
  ]
};
