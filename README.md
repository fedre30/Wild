# Wild - Keyboard Hero

> A Vue.js keyboard game. Looks like a guitar hero

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Components

**Game** : game interface which regroups all sub-components
  * Column : falling note zone (one note for each column)
  
     * Note: note to be played by user (inside Column component)
  * Playzone : zone where notes have to be played
  * Score : points incremented when user plays notes syncronously
  
## Pages
**GameStart** : start page where user can choose the song to play
  * Thumbnail: generation of Song title, artist and artist image and difficulties
**GameEnd** : display of final score and rate

## Basics

All notes are generated and rendered according to a ratio between song duration and a counter, which creates note's **timepoint**
Notes animation is the result of a equation which takes into account note's timepoint and column's zones (upper and bottom).
Keyup and keydown event handlers allow to indentify which key has been pressed, so every note can be generated in corresponding column.
Example: a note which has key = 's' and timepoint = 2 will be generated in the column 's' after 2 seconds from song's beginning.

Here's the animation note function:

```
updateGame () {
      const currentTime = new Date().getTime() / 1000
      const deltaTime = this.previousTime !== null ? currentTime - this.previousTime : 0

      const upperTime = lookAheadTime + this.currentSongTime()
      const bottomTime = this.currentSongTime() - lookBackTime
      const notesArray = this.song.notes.filter((note) => note.timepoint < upperTime && note.timepoint > bottomTime && this.playedNotes.findIndex((playedNoteID) => playedNoteID === note.id) === -1)
      this.notes = notesArray.map((note) => {
        const noteCopy = _.cloneDeep(note)
        noteCopy.y = (noteCopy.timepoint - bottomTime) / (upperTime - bottomTime)
        return noteCopy
      })
      this.notes.forEach((note) => {
        note.keys = note.keys.filter((key) => this.visibleColumns.includes(key))
      })
      this.checkEndGame()
      this.previousTime = currentTime
      requestAnimationFrame(() => this.updateGame())
    }
  ```
  
  After all notes are generated, the second basic feature which is the fundamental of gameplay is the function that verifies whether the user has pressed the right key at the right moment or not.
  N.B. As many keys can be played simultaneously, the concept of "chord" has been introduced into the function.

```
 verifyNotes () {
      const notesToVerify = this.notes.filter((note) => note.timepoint < this.currentSongTime() + playZoneDelta && note.timepoint > this.currentSongTime() - playZoneDelta)
      let mistake = false


      if (notesToVerify.length === 0) {
        mistake = true
      }
      else {
        const chord = notesToVerify.sort((a, b) => a.timepoint < b.timepoint ? -1 : 1)[0]

        for (let i = 0; i < this.columns.length; i++) {
          const column = this.columns[i]
          if (column.highlighted && chord.keys.indexOf(column.keyboard) === -1) {
            mistake = true
          }
          else if (!column.highlighted && chord.keys.indexOf(column.keyboard) !== -1) {
            mistake = true
          }
        }
        this.playedNotes.push(chord.id)
      }

      if (mistake) {
        this.resetCombo()
      }
      else {
        this.refreshScore()
        if (correctNotes % 10 === 0) {
          this.getCombo()
        }
      }
    }
```
  
  ## Routing

* GameStart

* Game : 
  * props : song
  
* GameEnd : 
  * props : score
  
## Song Editor

This feature was developed in order to simplify sheet music writing.
It generates all notes (keys and timepoint) when user press on a song (with no sheet music) and log it on the console. 
So it's just about copy it and paste in song's script.


