# Note-to-Chord
Takes musical notes and outputs the chord, inversion, and keys they belong to (WIP)

Creator: Michael See

Purpose of this project: Offer a robut musical tool that offers useful information about the inputted notes.

Large Goals:

Stage 1 Goal (current) : Develop general logic that takes in musical notes and displays what chord those notes form.  
Stage 2 Goal: Add in ability to enter in guitar fret notes instead of musical notes as input  
Stage 3 Goal: Bring this over to a more user friendly interface  
Stage 4 Goal: Hook it up to a website  


Small Current Goals:

Add more chord types.

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
