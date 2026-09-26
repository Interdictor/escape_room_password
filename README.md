# ESCAPE ROOM PASSWORD

## USER MANUAL

If you want to organize your own game all the needed configuration may be found in `config/config.js`. The steps would be:

1) Copy this repository in your local computer
2) Ensure you have python installed (you may check it up prompting `python --version` in your windows powershell/terminal, if it shows something like `Python 3.12.7` as response you are good to continue). See fig 1.
3) Place in `images/<whatever_name>` the logo for your game
4) Edit the file `config/config.js` with the desired changes. The `logo_url` configuration must include the file extension and match the name of the image you included in step 3 (.png/.svg/.jpg etc. for example: `logo_url: 'images/transparent_esicm.png`)
5) If you are using Windows, double click the file `server.bat` and visit the url `http://localhost:8000`
6) Your game is ready!

If you want to try the configuration while the server is running remember to deep refresh (ctrl + shift + r) the webpage of the game everytime you edit and save `config.js`


fig. 1
<img width="603" height="139" alt="image" src="https://github.com/user-attachments/assets/e0b0c9c6-1456-48e9-a4d5-4ab920e38942" />
