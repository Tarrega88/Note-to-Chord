# Note-to-Chord
Takes musical notes and outputs the chord, inversion, and keys they belong to (WIP)

Creator: Michael See

Purpose of this project: Offer a robust musical tool that offers useful information about the inputted notes.

Large Goals:

Stage 1 Goal (complete) : Develop general logic that takes in musical notes and displays what chord those notes form.  
Stage 2 Goal: (complete) Add in ability to enter in guitar fret notes instead of musical notes as input  
Stage 3 Goal (current): Bring this over to a more user friendly interface  
Stage 4 Goal: Hook it up to a website  

1 and 2 are complete in functionality but I'll continue to refactor and improve anything that needs it.

Most recent update (11/27/2022):

Lots of changes since last readme update- some hightlights:

- Program now has a basic user interface

- Naming Convention Logic Change:

The way chords are named is completely algorithmic now; there's no hard coded name of a chord anywhere except the basic ones.  This means all chords that are more complex than a major, minor, augmented, or diminished triad are named depending on a set of rules.

Since each chord is composed of several notes, the logic will go through the chord a number of times equal to the amount of notes in the chord, each time treating a new note as the root of the chord.  It will then detect if the chord has a 3rd, and then a 7th, and then a 13th, 11th, 9th, and so on- getting down to the more odd extensions.  It will name each iteration of the chord and later logic will determine what order these chords should be displayed in, from most likely to least likely.

- Guitar Input:

Users can now choose to input using guitar frets over a 7 string guitar input instead of entering lettered notes.

- Chord Priority Filters: 

- Filter 1:

Chords now go through two types of filters so that they will be displayed in the most probable name for the chord to the least probable.  The first filter determines how many "extra extensions" a chord has, such as the b9 or #11.  Since the above mentioned naming logic goes through all possibilities of what a chord's root might be, there are many cases in which a chord is has a very normal name with one root and a very strange name if another note is considered its root.  This first filter knocks the exceptionally weird chords down to the bottom if there are more common names available.

- Filter 2:

The second filter is an inversion filter; if several chord naming possibilities have the same number of extra extensions, it will prioritize showing chords in Root position first, followed by 1st inversion, followed by 2nd inversion, and so on.

- Show Unusual Chord Option:

Some chord names are so uncommon that they are most likely not really used as a common naming convention for a chord.  These chords are hidden by default from the display, but can be shown by ticking the "Show Unusual Chord Option" box.  Right now, any time a chord has more than one naming option and one of the naming options has more than 1 additional "extra extension" it's hidden.

General info:

Currently, as of 11/4/2022, this requires the user manually type in the notes in standard A, B, C, D, E, F, G and # or b format.

The program understands and displays inversions of chords.  
It understands chords that are spelled with the same notes but may be named something else, such as Am7 vs C6.  
It displays what keys these chords can appear in and what quality of Roman Numeral they take in that key.  
It displays other chord functions as well, such as V of Vs, all types of augmented 6th chords, and tritone substitutions.  
The only thing required for the program to understand a chord is that its root position is in the logic; all inversions are figured out in the logic; the chord must have A as the root.

Update 11/5/2022: It was becoming apparent that manually inputting chord functions was starting to become a time sync, so I reworked the logic to allow the program to figure out what scale and function the chord can belong to in each key- this removes the requirement of manually inputting a ton of chord functions for each chord type.  

Next, I'm going to add diminished and whole tone scales, and after that I'll add more chord types.

The new logic will enable a very easy transition into displaying which chords are playable over the resultant chord.

With this change, symmetrical chords are being displayed in a way that's technically true but also suggests some outside of the box functions- I'm going to think about how to make this clear.
