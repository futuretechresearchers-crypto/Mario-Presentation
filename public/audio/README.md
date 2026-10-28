# Local presentation audio

The following files were supplied by the user from Downloads and copied into this app with short local names. No audio is fetched from a third-party service during playback.

| Local file | Supplied file | Event |
| --- | --- | --- |
| attack.mp3 | mario-fireball.mp3 | Turtle shell, fireball, and Luigi shotgun attacks after correct answers |
| win.mp3 | Mario Wins! - QuickSounds.com.mp3 | DevOps / fourth checkpoint cleared |
| game-over.mp3 | Super mario bros game over - QuickSounds.com.mp3 | Game-over part of the defeat sequence |
| death.mp3 | super-mario-death.mp3 | Life reaches zero |
| miss.mp3 | Mario Party 1 - MISS - QuickSounds.com.mp3 | Wrong answer and incoming damage |
| pipe.mp3 | super-mario-bros.mp3 | Entering the presentation and entering a warp pipe |
| underground.mp3 | Super Mario Bros. Underground - QuickSounds.com.mp3 | Loops while facing Bowser |
| yipee.mp3 | Mario Yipee - QuickSounds.com.mp3 | First three checkpoint wins and rescue-cutscene cheer |
| main-theme.mp3 | SUPER MARIO BROS. - Main Theme By Koji Kondo _ Nintendo.mp3 | Continuous low-volume background theme |
| fall.mp3 | Mario Fall - QuickSounds.com.mp3 | Falling / Try Again part of the defeat sequence |

The bounded effects channel plays Death -> Fall -> Game Over -> the existing Why cue sequentially. Retry, leaving the scene, and Sound Off cancel the remainder. Repeated attack events reuse one audio instance. The main theme is ducked under effects and the underground track so educational speech remains clear. Sound starts off to respect browser autoplay behavior; enabling it is an explicit user gesture.

`mario-why.wav` remains the original locally generated spoken Why cue, with the caption Whhhhyyyyyyyy.... It was synthesized using Windows SAPI Microsoft David Desktop; it is not a game recording or voice clone. The new controller uses this WAV directly rather than browser speech synthesis.
