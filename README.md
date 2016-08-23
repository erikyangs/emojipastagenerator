# emojipastagenerator
[https://erikyangs.github.io/emojipastagenerator](https://erikyangs.github.io/emojipastagenerator "Taylor Swift is a slippery snake")
>You: I want my text to look like sewage.
</br>
>Me: Say no more fam.
</br>
>You: wow 😮 my words 🆔 look 👁 like 😄😄😄 sewage 💩 now!

Made possible by <a href="http://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="https://jquery.com/" target="_blank">JQuery</a>, <a href="https://angularjs.org/" target="_blank">AngularJS</a>, and <a href="https://github.com/muan/emojilib" target="_blank">emojilib.</a>


Special thanks to Lawrence Hsiung for additional emoji mappings.
## Issues
* Each user converts online json file to something usable upon loading
  * there could just be an already converted json file 
* Personal emoji mappings with the same first word would conflict
* User converts entire text box to emoji multiple times for each keyboard input
* Extremely inefficient conversion from JSON of emojis to objects:
  * regular keys -> lowercase keys
  * lowercase object -> word array
* Extremely inefficient conversion from text to emojipasta:
  * text -> array of words
  * array of words -> lowercase array of words
  * lowercase array of words compared with JSON of emojis
  * matching emojis added to final output string

## Brainstormed additions
* More emoji mappings!
* Sharing your emojipasta
* A simpler URL (but that costs money...)

## Etc.
Thanks for checking it out! Always open to suggestions and contributions!
