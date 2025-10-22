export const CONFIG = {
  // password: 'some_password',
  logo_url: 'images/default_logo.svg',
  available_time: 60 * 25,
  wrong_password_penalty: 60 * 1,
  clue_use_penalty: 20,
  passwords: [
    'contraseña', // case insensitive. add feature
  ],
  clues: [ // five clues
    {
      button_text: 'a',
      tooltip_text: 'you have my simpathy',
    },
    {
      button_text: 'b',
      tooltip_text: 'you have no chance',
    },
  ]
};

// export default CONFIG

// const config = {
//   clue_time_penalty: 3,
//   wrong_password_penalty: 5,
//   time_limit: 25 * 60, // 25 minutes
//   password: "escape",
//   victory_message: 'Good Job!',
//   defeat_message: 'Boom! :(',
//   logo_url: './images/placeholder_logo.svg',
  // clues: [ // six clues max
  //   {
  //     button_text: 'a',
  //     tooltip_text: 'you have my simpathy',
  //   },
  //   {
  //     button_text: 'b',
  //     tooltip_text: 'you have no chance',
  //   },
//   ]
// };
