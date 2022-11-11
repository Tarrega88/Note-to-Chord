let chordArray = [];
let unalteredNoteInput = [];
let indexArray = [];

let indexOfRoot = 0;
let specialCase = false;
let startOver = false;
let waitUntilStartOver = false;
let aOrAn = "";
let completeUnalteredNoteInput = [];

let basicChordQuality = "";
let altBasicChordQuality = [];

let chordQuality = "";
let hasAlternate = false;
let alternateStepsAboveOriginal = 0;
let alternateStepsArray = [];

let fromLowestUpToRoot = 0;

let rootPosition;
let altRootPosition = [];

let alternateChordQuality = [];

let originalChordQuality = "";

let chordOccursIn = "";
let chordOccursInArray = [];

const majorRomanNumerals = ["majori", "skip", "majorii", "skip", "majoriii", "majoriv", "skip", "majorv", "skip", "majorvi", "skip", "majorvii"];
//maj7, m7, m7, maj7, 7, m7, m7b5;
const naturalMinorRomanNumerals = ["minori", "skip", "minorii", "minoriii", "skip", "minoriv", "skip", "minorv", "minorvi", "skip", "minorvii", "skip"];
//m7, m7b5, maj7, m7, m7, maj7, 7;

const harmonicMinorRomanNumerals = ["harmonic_minori", "skip", "harmonic_minorii", "harmonic_minoriii", "skip", "harmonic_minoriv", "skip", "harmonic_minorv", "harmonic_minorvi", "skip", "skip", "harmonic_minorvii"];
//harmonic minor: i:m maj7, ii:m7b5, III:maj7#5, iv:m7, V:7, VI:maj7, vii:dim7

const harmonicMajorRN = ["harmonic_majori", "skip", "harmonic_majorii", "skip", "harmonic_majoriii", "harmonic_majoriv", "skip", "harmonic_majorv", "harmonic_majorvi", "skip", "skip", "harmonic_majorvii"];
//harmonicMajor: I:maj7, ii:m7b5, iii:m7/7, iv:m maj7, V:7, VI:maj7#5/dim7, vii:dim7;

const melodicMinorRN = ["melodic_minori", "skip", "melodic_minorii", "melodic_minoriii", "skip", "melodic_minoriv", "skip", "melodic_minorv", "skip", "melodic_minorvi", "skip", "melodic_minorvii"];
//melodic minor: i:m maj7, ii:m7, III:maj7#5, IV:7, V:7, vi:m7b5, vii:m7b5/7alt;

const specialCases = ["skip", "tritone sub", "V of V", "skip", "skip", "skip", "skip", "skip", "augmented 6th", "skip", "skip", "skip"];

const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip"];
const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip"];

const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab"];

let firstPrompt = prompt("Enter 1 for Note Input or 2 for Guitar Fret Input", "");

function guitarInput() {
    let guitarNotes = [];
    let guitarArray = [];
    guitarNotes.length = 6;
    for (let i = 6; i > 0; i--) {
        let guitarPrompt = prompt(`List the fret on the ${i} string.
Type anything besides a number to ignore that string.`, "");
        if (!isNaN(guitarPrompt)) {
            guitarPrompt = Number(guitarPrompt) % 12;
            guitarArray.push(guitarPrompt);
        } else {
            guitarArray.push("notAFret");
        }

    }

    let guitarString1 = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"];
    let guitarString2 = ["b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#"];
    let guitarString3 = ["g", "g#", "a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#"];
    let guitarString4 = ["d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#"];
    let guitarString5 = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
    let guitarString6 = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#"];

    let input1 = guitarString1.at(guitarArray[5]);
    let input2 = guitarString2.at(guitarArray[4]);
    let input3 = guitarString3.at(guitarArray[3]);
    let input4 = guitarString4.at(guitarArray[2]);
    let input5 = guitarString5.at(guitarArray[1]);
    let input6 = guitarString6.at(guitarArray[0]);

    if (input6.toLowerCase().charCodeAt() >= 97 && input6.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[0] = input6;
    }
    if (input5.toLowerCase().charCodeAt() >= 97 && input5.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[1] = input5
    }
    if (input4.toLowerCase().charCodeAt() >= 97 && input4.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[2] = input4;
    }
    if (input3.toLowerCase().charCodeAt() >= 97 && input3.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[3] = input3;
    }
    if (input2.toLowerCase().charCodeAt() >= 97 && input2.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[4] = input2;
    }
    if (input1.toLowerCase().charCodeAt() >= 97 && input1.toLowerCase().charCodeAt() <= 103) {
        guitarNotes[5] = input1;
    }
    whatAreTheGuitarNotes(guitarNotes, guitarArray);
}

const scales = {
    majori: [0, 2, 4, 5, 7, 9, 11],
    majorii: [0, 2, 3, 5, 7, 9, 10],
    majoriii: [0, 1, 3, 5, 7, 8, 10],
    majoriv: [0, 2, 4, 6, 7, 9, 11],
    majorv: [0, 2, 4, 5, 7, 9, 10],
    majorvi: [0, 2, 3, 5, 7, 8, 10],
    majorvii: [0, 1, 3, 5, 6, 8, 10],

    minori: [0, 2, 3, 5, 7, 8, 10],
    minorii: [0, 1, 3, 5, 6, 8, 10],
    minoriii: [0, 2, 4, 5, 7, 9, 11],
    minoriv: [0, 2, 3, 5, 7, 9, 10],
    minorv: [0, 1, 3, 5, 7, 8, 10],
    minorvi: [0, 2, 4, 6, 7, 9, 11],
    minorvii: [0, 2, 4, 5, 7, 9, 10],

    harmonic_minori: [0, 2, 3, 5, 7, 8, 11],
    harmonic_minorii: [0, 1, 3, 5, 6, 9, 10],
    harmonic_minoriii: [0, 2, 4, 5, 8, 9, 11],
    harmonic_minoriv: [0, 2, 3, 6, 7, 9, 10],
    harmonic_minorv: [0, 1, 4, 5, 7, 8, 10],
    harmonic_minorvi: [0, 3, 4, 6, 7, 9, 11],
    harmonic_minorvii: [0, 1, 3, 4, 6, 8, 9],

    melodic_minori: [0, 2, 3, 5, 7, 9, 11],
    melodic_minorii: [0, 1, 3, 5, 7, 9, 10],
    melodic_minoriii: [0, 2, 4, 6, 8, 9, 11],
    melodic_minoriv: [0, 2, 4, 6, 7, 9, 10],
    melodic_minorv: [0, 2, 4, 5, 7, 8, 10],
    melodic_minorvi: [0, 2, 3, 5, 6, 8, 10],
    melodic_minorvii: [0, 1, 3, 4, 6, 8, 10],

    harmonic_majori: [0, 2, 4, 5, 7, 8, 11],
    harmonic_majorii: [0, 2, 3, 5, 6, 9, 10],
    harmonic_majoriii: [0, 1, 3, 4, 7, 8, 10],
    harmonic_majoriv: [0, 2, 3, 6, 7, 9, 11],
    harmonic_majorv: [0, 1, 4, 5, 7, 9, 10],
    harmonic_majorvi: [0, 3, 4, 6, 8, 9, 11],
    harmonic_majorvii: [0, 1, 3, 5, 6, 8, 9],

}

function whatAreTheNotes() {
    let noteNumber = prompt("How many notes does the chord have?", "");
    for (let i = 0; i < Number(noteNumber); i++) {
        let chordNotes = prompt(`What's note number ${i + 1}?`);
        chordNotes = chordNotes[0].toUpperCase() + chordNotes.slice(1, chordNotes.length);
        unalteredNoteInput.push(chordNotes);
        for (let j = 0; j < chromaticArrayKey.length; j++) {
            if (chromaticArrayKey[j].slice(2) === chordNotes || chromaticArrayKey[j].slice(0, 2) === chordNotes || chromaticArrayKey[j] === chordNotes) {
                if (!chordArray.includes(chordNotes)) {
                    chordArray.push(chordNotes);
                    indexArray.push(j);
                }
            }
            if (enharmonicEquivalentsHigher[j].slice(1) === chordNotes || enharmonicEquivalentsLower[j].slice(1) === chordNotes) {

                chordArray.push(chromaticArrayKey[j][0]);
                indexArray.push(j);
            }

        }
    }
    completeUnalteredNoteInput = Array.from(unalteredNoteInput);

    unalteredNoteInput = unalteredNoteInput.join(" ");
    runAfterInput();
}

function whatAreTheGuitarNotes(guitarNotes, guitarArray) {
    // guitarNotes = [... new Set(guitarNotes)];
    for (let i = 0; i < guitarNotes.length; i++) {
        let chordNotes = guitarNotes[i];
        if (typeof guitarArray[i] === "number") {
            chordNotes = chordNotes[0].toUpperCase() + chordNotes.slice(1, chordNotes.length);
            unalteredNoteInput.push(chordNotes);
            for (let j = 0; j < chromaticArrayKey.length; j++) {
                if (chromaticArrayKey[j].slice(2) === chordNotes || chromaticArrayKey[j].slice(0, 2) === chordNotes || chromaticArrayKey[j] === chordNotes) {
                    if (!chordArray.includes(chordNotes)) {
                        chordArray.push(chordNotes);
                        indexArray.push(j);
                    }
                }
                if (enharmonicEquivalentsHigher[j].slice(1) === chordNotes || enharmonicEquivalentsLower[j].slice(1) === chordNotes) {

                    chordArray.push(chromaticArrayKey[j][0]);

                    indexArray.push(j);

                }

            }
        }
    }
    unalteredNoteInput = unalteredNoteInput.join(",").replace(/,/g, " ").trim();
    runAfterInput();
}

if (firstPrompt === "1") {
    whatAreTheNotes();
} else {
    guitarInput();
}

function runAfterInput() {

    const uniqueChordArray = [...new Set(chordArray)];

    indexArray = [...new Set(indexArray)];

    let fretArray = indexArray.sort((a, b) => a - b);

    const lowestFret = indexArray[0];
    const lowestNote = uniqueChordArray[0];

    let indexOfLowestNote = 0;
    let alteredIndexOfLowestNote = 0;

    function findIndexOfLowestOriginalNote() {
        for (let i = 0; i < chromaticArrayKey.length; i++) {
            if (chromaticArrayKey[i].slice(2) === lowestNote || chromaticArrayKey[i].slice(0, 2) === lowestNote || chromaticArrayKey[i] === lowestNote) {
                indexOfLowestNote = i;
            }
        }
    }

    findIndexOfLowestOriginalNote();

    function lowerTheRootNote() {

        if (indexOfLowestNote - lowestFret >= 0) {
            alteredIndexOfLowestNote = indexOfLowestNote - lowestFret;
        }
    }

    lowerTheRootNote();

    function lowerTheChordUntilA() {
        if (lowestFret > 0) {
            for (let i = 0; i < fretArray.length; i++) {
                fretArray[i] = fretArray[i] - lowestFret;
            }
        }
    }

    lowerTheChordUntilA();
    function findIndexOfRoot() {
        for (let i = 0; i < fretArray.length; i++) {
            if (alteredIndexOfLowestNote === fretArray[i]) {
                indexOfRoot = i;
            }
        }
    }

    findIndexOfRoot();

    function forceRootIntoPositiveValue() {
        for (let i = 0; i < indexOfRoot; i++) {
            fretArray[i] = fretArray[i] + 12;
        }
    }

    forceRootIntoPositiveValue();

    fretArray = fretArray.sort((a, b) => a - b);

    function moveChordDownToATake2() {
        if (fretArray[0] > 0) {
            let shiftingChordDownAmount = fretArray[0];
            for (let i = 0; i < fretArray.length; i++) {
                fretArray[i] = fretArray[i] - shiftingChordDownAmount;
            }
        }
    }

    moveChordDownToATake2();

    function determineChordQuality() {
        let isAChord = false;
        for (let i = 0; i < indexArray.length; i++) {
            let inversionChecker = Array.from(indexArray);
            let valueToRemove = inversionChecker[i];
            for (let j = 0; j < indexArray.length; j++) {
                inversionChecker[j] = inversionChecker[j] - valueToRemove;
                if (inversionChecker[j] < 0) {
                    inversionChecker[j] = inversionChecker[j] + 12
                }
            }
            inversionChecker = inversionChecker.sort((a, b) => a - b);

            inversionString = inversionChecker.toString();

            switch (inversionString) {

                case "0,7":
                    chordQuality = "5";
                    rootPosition = "0,7";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //MINOR
                case "0,3,7":
                    chordQuality = "minor";
                    rootPosition = "0,3,7";
                    basicChordQuality = "minor";
                    isAChord = true;
                    break;
                // MINOR 7 and 6
                case "0,3,7,10":
                    chordQuality = "minor 7";
                    rootPosition = "0,3,7,10";
                    basicChordQuality = "minor";
                    isAChord = true;

                    hasAlternate = true;

                    altRootPosition.push("0,4,7,9");
                    altBasicChordQuality.push("major");
                    alternateChordQuality.push("6");
                    alternateStepsArray.push(3);

                    break;

                //MINOR MAJ7
                case "0,3,7,11":
                    chordQuality = "m maj7";
                    rootPosition = "0,3,7,11";
                    basicChordQuality = "minor";
                    isAChord = true;
                    break;
                //MINOR 9TH
                case "0,2,3,7,10":
                    rootPosition = "0,2,3,7,10"
                    chordQuality = "m9";
                    isAChord = true;
                    hasAlternate = true;

                    alternateStepsArray.push(3);
                    altRootPosition.push("0,4,7,9,11");
                    alternateChordQuality.push("maj13 (no 9th)");
                    altBasicChordQuality.push("major");
                    break;

                //MAJOR
                case "0,4,7":
                    rootPosition = "0,4,7";
                    chordQuality = "major";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                case "0,5,7":
                    rootPosition = "0,5,7";
                    chordQuality = "suspended";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                case "0,2,4,7,9":
                    rootPosition = "0,2,4,7,9";
                    chordQuality = "6/9";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //DOMINANT 7
                case "0,4,7,10":
                    rootPosition = "0,4,7,10";
                    chordQuality = "dominant 7";
                    basicChordQuality = "major";
                    isAChord = true;

                    break;
                case "0,4,6,10":
                    rootPosition = "0,4,6,10";
                    chordQuality = "7b5";
                    basicChordQuality = "diminished";
                    altBasicChordQuality.push("diminished");
                    isAChord = true;

                    waitUntilStartOver = true;
                    hasAlternate = true;
                    altRootPosition.push(rootPosition);
                    alternateChordQuality.push("7b5");
                    alternateStepsArray.push(0);
                    alternateStepsArray.push(6);
                    break;
                //7#9 chord (Hendrix)
                case "0,3,4,7,10":
                    rootPosition = "0,3,4,7,10";
                    chordQuality = "7#9";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                // 9 Chord
                case "0,2,4,7,10":
                    rootPosition = "0,2,4,7,10";
                    chordQuality = "9";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //11 chord
                case "0,2,4,5,7,10":
                    rootPosition = "0,2,4,5,7,10";
                    chordQuality = "11";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //13 chord
                case "0,2,4,5,7,9,10":
                    rootPosition = "0,2,4,5,7,9,10";
                    chordQuality = "13";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //
                case "0,2,4,5,9,10":
                    rootPosition = "0,2,4,5,9,10";
                    chordQuality = "13 (no 5th)";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                case "0,4,5,7,9,10":
                    rootPosition = "0,4,5,7,9,10";
                    chordQuality = "13 (no 9th)";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                case "0,2,4,7,9,10":
                    rootPosition = "0,2,4,7,9,10";
                    chordQuality = "13 (no 11th)";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //common omissions: as a suggestion fifth, ninth, and eleventh
                //maj13 chord
                case "0,2,4,7,9,11":
                    rootPosition = "0,2,4,7,9,11";
                    chordQuality = "maj13";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                case "0,2,4,9,11":
                    rootPosition = "0,2,4,9,11";
                    chordQuality = "maj13 (no 5th)";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;

                // 7b9 Chord
                case "0,1,4,7,10":
                    rootPosition = "0,1,4,7,10";
                    chordQuality = "7b9";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //AUGMENTED 6TH CHORDS
                // Italian Augmented 6th:
                case "0,4,10":
                    rootPosition = "0,4,10";
                    chordQuality = "dominant 7";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;

                //MAJOR 7
                case "0,4,7,11":
                    rootPosition = "0,4,7,11";
                    chordQuality = "major 7";
                    basicChordQuality = "major";
                    isAChord = true;
                    break;
                //MAJOR 7 #5
                case "0,4,8,11":
                    rootPosition = "0,4,8,11";
                    chordQuality = "maj7 #5";
                    basicChordQuality = "augmented";
                    isAChord = true;
                    break;
                //DIMINISHED
                case "0,3,6":
                    rootPosition = "0,3,6";
                    chordQuality = "diminished";
                    basicChordQuality = "diminished";
                    isAChord = true;
                    break;
                //FULL DIMINISHED 7
                case "0,3,6,9":
                    rootPosition = "0,3,6,9";
                    chordQuality = "full diminished";
                    basicChordQuality = "diminished";
                    isAChord = true;
                    hasAlternate = true;
                    waitUntilStartOver = true;
                    altRootPosition.push(rootPosition);
                    alternateChordQuality.push("full diminished");
                    alternateStepsArray.push(0);
                    alternateStepsArray.push(3);
                    alternateStepsArray.push(6);
                    alternateStepsArray.push(9);
                    break;
                //HALF DIMINISHED 7 AND M7b5
                case "0,3,6,10":
                    rootPosition = "0,3,6,10";
                    chordQuality = "half diminished 7";
                    basicChordQuality = "diminished";
                    isAChord = true;

                    hasAlternate = true;

                    alternateChordQuality.push("m7b5");
                    altBasicChordQuality.push("diminished");
                    alternateStepsArray.push(0);
                    altRootPosition.push(rootPosition);

                    alternateChordQuality.push("m6");
                    altBasicChordQuality.push("minor");
                    alternateStepsArray.push(3);
                    altRootPosition.push("0,3,7,9");

                    break;
                //Diminished Major 7
                case "0,3,6,11":
                    rootPosition = "0,3,6,11";
                    chordQuality = "diminished major 7";
                    basicChordQuality = "diminished";
                    isAChord = true;
                    break;
                //AUGMENTED
                case "0,4,8":
                    rootPosition = "0,4,8";
                    chordQuality = "augmented";
                    basicChordQuality = "augmented";
                    isAChord = true;
                    hasAlternate = true;
                    altRootPosition.push(rootPosition);
                    alternateChordQuality.push("augmented");
                    alternateStepsArray.push(0);
                    alternateStepsArray.push(4);
                    alternateStepsArray.push(8);
                    waitUntilStartOver = true;
                    break;
            }

        }
        if (!isAChord) {
            rootPosition = indexArray.toString();
            chordQuality = "Unknown Chord Type";
            basicChordQuality = "major";
        }
        originalChordQuality = chordQuality;

    }

    determineChordQuality();

    let inversionNumber;
    function determineInversion() {
        for (let i = 0; i < indexArray.length; i++) {
            let inversionChecker = Array.from(indexArray);
            let valueToRemove = inversionChecker[i];
            for (let j = 0; j < indexArray.length; j++) {
                inversionChecker[j] = inversionChecker[j] - valueToRemove;
                if (inversionChecker[j] < 0) {
                    inversionChecker[j] = inversionChecker[j] + 12;
                }

            }
            inversionChecker = inversionChecker.sort((a, b) => a - b);

            inversionString = inversionChecker.toString();
            if (rootPosition.toString() === inversionString) {
                inversionNumber = i;
            }
        }
    }

    determineInversion();

    function findRoot() {
        switch (inversionNumber) {
            case 0:
                fromLowestUpToRoot = fretArray[0];
                break;
            case 1:
                fromLowestUpToRoot = fretArray[1];
                break;
            case 2:
                fromLowestUpToRoot = fretArray[2];
                break;
            case 3:
                fromLowestUpToRoot = fretArray[3];
                break;
            case 4:
                fromLowestUpToRoot = fretArray[4];
                break;
            case 5:
                fromLowestUpToRoot = fretArray[5];
                break;
            case 6:
                fromLowestUpToRoot = fretArray[6];
                break;
        }

    }

    findRoot();
    function applyInversionText() {
        let position = "";
        fromLowestUpToRoot = fromLowestUpToRoot % 12
        switch (fromLowestUpToRoot) {
            case 0:
            case 12:
                position = "Root Position";
                break;
            case 1:
            case 2:
                position = "3rd Inversion";
                break;
            case 3:
                if (chordQuality === "6") {
                    position = "6th Inversion (6th In Bass)"
                } else {
                    position = "6th Inversion (13th in Bass)";
                }
                break;
            case 4:
                position = "2nd Inversion (Sharp 5th in Bass)"
            case 5:
                position = "2nd Inversion";
                break;
            case 6:
                position = "2nd Inversion (Flatted 5th in Bass)";
                break;
            case 7:
                position = "5th Inversion (11th in Bass)";
                break;
            case 8:
            case 9:
                position = "1st Inversion";
                break;
            case 10:
            case 11:
                position = "4th Inversion (9th in Bass)";
                break;
        }
        return position;
    }
    const appliedInversionText = applyInversionText();

    function setIndexArrayToRootPosition() {
        if (startOver === false) {
            indexArray = rootPosition.split(",");
        }
        for (let i = 0; i < chordArray.length; i++) {
            indexArray[i] = Number(indexArray[i]);

        }

    }

    setIndexArrayToRootPosition();

    let whatThisChordCanBe = [];
    //special cases
    const augmented6th = "augmented 6th"
    const tritoneSub = "tritone sub";
    const vofV = "V of V";

    //Determines what function the chord can fulfill based on Roman Numerals
    let matchScaleAndChord = 0;

    function applyChordFunctions() {
        whatThisChordCanBe = [];
        for (let i = 0; i < Object.keys(scales).length; i++) {
            matchScaleAndChord = 0;
            for (let j = 0; j < Object.values(scales)[i].length; j++) {
                if (indexArray.includes(Object.values(scales)[i][j])) {
                    matchScaleAndChord++;
                }
            }
            if (matchScaleAndChord === indexArray.length) {
                whatThisChordCanBe.push(Object.keys(scales)[i]);
            }
        }

    }
    applyChordFunctions();

    //split calculateRootAndNumber into more specific functions soon
    function calculateRootNumber(fromLowestUpToRoot) {
        chordOccursInArray = [];
        let rootCalculation = fromLowestUpToRoot + indexOfLowestNote;
        if (rootCalculation >= 12) {
            rootCalculation = rootCalculation - 12;
        }
        return rootCalculation;
    }
    const rootNumber = calculateRootNumber(fromLowestUpToRoot);

    function calculateRootLetter(rootCalculation) {
        let theRoot = chromaticArrayKey[rootCalculation];
        return theRoot;
    }
    const rootLetter = calculateRootLetter(rootNumber);

    function saveOriginalRoot(theRoot) {
        let originalRoot = theRoot;
        return originalRoot;
    }

    const savedOriginalRoot = saveOriginalRoot(rootLetter);

    function addToChordOccursIn(theRoot, originalRoot) {
        if (startOver === false) {
            chordOccursIn = `${theRoot} ${chordQuality} occurs as a:
`
        }
        if (startOver === true && alternateStepsAboveOriginal === 0) {
            chordOccursIn = `${theRoot} ${originalChordQuality} can function as ${aOrAn} ${chordQuality}:
`
        }

        if (startOver === true && alternateStepsAboveOriginal > 0) {
            chordOccursIn = `${theRoot} ${chordQuality} shares the same notes as ${originalRoot} ${originalChordQuality}.
It occurs as a:
`
        }

    }
    addToChordOccursIn(rootLetter, savedOriginalRoot);

    //should split findRelevantKeysAndSyncChordFunctionsToNotes into more specific functions soon
    function findRelevantKeysAndSyncChordFunctionsToNotes(theRoot, rootCalculation) {
        let intervalForKey1;
        let intervalForKey2;
        let chosenArrayIndex;
        let romanNumeral = "";
        let majorOrMinor = "";
        let stepsToFindRelatedChord = 0;
        for (let q = 0; q < whatThisChordCanBe.length; q++) {
            let chromaticLoop = 0;
            romanNumeral = "";
            if (whatThisChordCanBe[q].slice(0, 5) === "minor" || whatThisChordCanBe[q].slice(0, 5) === "major") {
                majorOrMinor = whatThisChordCanBe[q].slice(0, 5);
                romanNumeral = whatThisChordCanBe[q].slice(5);
            }
            if (whatThisChordCanBe[q].includes("harmonic_minor") || whatThisChordCanBe[q].includes("harmonic_major")) {
                majorOrMinor = whatThisChordCanBe[q].slice(0, 14);
                romanNumeral = whatThisChordCanBe[q].slice(14);
            }

            if (whatThisChordCanBe[q].includes("melodic_minor")) {
                majorOrMinor = whatThisChordCanBe[q].slice(0, 13);
                romanNumeral = whatThisChordCanBe[q].slice(13);
            }

            if (whatThisChordCanBe[q] === "augmented 6th") {
                stepsToFindRelatedChord = 7;
                majorOrMinor = "major and minor";
                romanNumeral = "augmented 6th";
            }

            if (whatThisChordCanBe[q] === "tritone sub") {
                majorOrMinor = "major and minor";
                romanNumeral = "tritoneSub"
                stepsToFindRelatedChord = 7;
            }
            if (whatThisChordCanBe[q] === "V of V") {
                majorOrMinor = "major and minor";
                romanNumeral = "V of V";
                stepsToFindRelatedChord = 7;
            }
            if (majorRomanNumerals.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = majorRomanNumerals.indexOf(whatThisChordCanBe[q]);
            }

            if (naturalMinorRomanNumerals.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = naturalMinorRomanNumerals.indexOf(whatThisChordCanBe[q]);
            }

            if (harmonicMinorRomanNumerals.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = harmonicMinorRomanNumerals.indexOf(whatThisChordCanBe[q]);
            }
            if (specialCases.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = specialCases.indexOf(whatThisChordCanBe[q]);
            }

            if (melodicMinorRN.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = melodicMinorRN.indexOf(whatThisChordCanBe[q]);
            }

            if (harmonicMajorRN.includes(whatThisChordCanBe[q])) {
                chosenArrayIndex = harmonicMajorRN.indexOf(whatThisChordCanBe[q]);
            }

            function makeRomanNumeralsAndKeysLookNice() {
                if (basicChordQuality === "major") {
                    romanNumeral = romanNumeral.toUpperCase();
                }
                if (basicChordQuality === "minor") {
                    romanNumeral = romanNumeral.toLowerCase();
                }
                if (basicChordQuality === "diminished") {
                    romanNumeral = `diminished ` + romanNumeral.toLowerCase();
                }
                if (basicChordQuality === "augmented") {
                    romanNumeral = `augmented ` + romanNumeral.toUpperCase();
                }
                if (majorOrMinor.includes("_")) {
                    majorOrMinor = majorOrMinor.replace("_", " ");
                }
            }
            makeRomanNumeralsAndKeysLookNice();

            intervalForKey1 = rootCalculation - chosenArrayIndex;

            if (rootCalculation >= 6) {

                intervalForKey1 = intervalForKey1 - 12;
            }

            intervalForKey2 = intervalForKey1 + 12;

            //Logic for determining which keys this chord occurs in.
            for (let i = rootCalculation; chromaticLoop < 12; i++) {
                if (i >= 12) {
                    i = 0;
                }

                if (chordQuality[0].toLowerCase() === "a" || chordQuality[0].toLowerCase() === "e" || chordQuality[0].toLowerCase() === "i" || chordQuality[0].toLowerCase() === "o" || chordQuality[0].toLowerCase() === "u") {
                    aOrAn = "an";
                } else {
                    aOrAn = "a";
                }

                let temporaryKey = chromaticArrayKey[chromaticLoop];
                let findRelatedChordNumber = chromaticLoop + stepsToFindRelatedChord;
                if (findRelatedChordNumber > 11) {
                    findRelatedChordNumber = findRelatedChordNumber - 12;
                }
                let temporaryRelatedChord = chromaticArrayKey[findRelatedChordNumber];
                if (temporaryKey.length === 4) {
                    temporaryKey = temporaryKey.slice(0, 2) + "/" + temporaryKey.slice(2);
                }

                if (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2) {

                    chordOccursInArray.push(`${romanNumeral} chord in the key of ${temporaryKey} ${majorOrMinor}.
`);

                }
                chordOccursInArray.sort();

                if (whatThisChordCanBe[q] === augmented6th && stepsToFindRelatedChord > 0 && (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2)) {
                    chordOccursIn += `The ${romanNumeral} chord typically precedes a dominant V chord, in this case the ${temporaryRelatedChord} chord.
`
                }

                if (whatThisChordCanBe[q] === tritoneSub && stepsToFindRelatedChord > 0 && (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2)) {
                    chordOccursIn += `The ${romanNumeral} chord functions as an alternative dominant V7 chord since it shares the 3rd and 7th note of that chord, but flipped.
In this case it's a tritone sub to the ${temporaryRelatedChord}7 chord.
`
                }

                if (whatThisChordCanBe[q] === vofV && stepsToFindRelatedChord > 0 && (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2)) {
                    chordOccursIn += `The ${romanNumeral} chord functions as a dominant chord TO the original dominant chord.  It creates extra momentum and tension.
In this case, it's the V of the ${temporaryRelatedChord}7 chord.
Typical Progression: ${theRoot}7 ${temporaryRelatedChord}7 ${temporaryKey} major or minor`
                }

                chromaticLoop++;
            }
        }
    }

    findRelevantKeysAndSyncChordFunctionsToNotes(rootLetter, rootNumber);

    function logTheChord(theRoot) {
        if (theRoot[1] === "#" || theRoot[1] === "b") {
            theRoot = theRoot.replace(theRoot[1], theRoot[1] + "/")
        }
        chordOccursIn += chordOccursInArray.join(" ");
        if (theRoot[0] === lowestNote || theRoot[0] + theRoot[1] === lowestNote) {
            console.log(`${theRoot} ${chordQuality}`)
        } else {
            console.log(`${theRoot} ${chordQuality} / ${lowestNote}`);
        }
        console.log(`Notes: ${chordArray.join(" ")}`);
        if (unalteredNoteInput !== chordArray.join(" ")) {
            console.log(`Input Notes: ${unalteredNoteInput}`)
        }
        console.log(`${theRoot} ${chordQuality}
${appliedInversionText}`)
        console.log(chordOccursIn);
    }
    if (waitUntilStartOver === false) {
        logTheChord(rootLetter);
        chordOccursIn = "";
    }

    function altLog() {
        for (let i = 0; i < alternateChordQuality.length; i++) {
            basicChordQuality = altBasicChordQuality[i];
            alternateStepsAboveOriginal = alternateStepsArray[i];
            chordQuality = alternateChordQuality[i];
            indexArray = altRootPosition[i].split(",");
            rootPosition = altRootPosition[i];
            findRoot();
            fromLowestUpToRoot = fromLowestUpToRoot + alternateStepsArray[i];
            applyInversionText();
            setIndexArrayToRootPosition();
            applyChordFunctions();
            const altRootNumber = calculateRootNumber(fromLowestUpToRoot);
            const altRootLetter = calculateRootLetter(altRootNumber);
            addToChordOccursIn(altRootLetter, savedOriginalRoot);
            findRelevantKeysAndSyncChordFunctionsToNotes(altRootLetter, rootNumber);
            logTheChord(altRootLetter);
        }
    }
    if (hasAlternate === true) {
        startOver = true;
        altLog();
    }
}