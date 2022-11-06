let chordArray = [];
let unalteredNoteInput = [];
let indexArray = [];

let root = "";
let majorOrMinor = "";
let romanNumeral = "";
let extraInformation = "";
let indexOfRoot = 0;
let specialCase = false;
let startOver = false;
let waitUntilStartOver = false;
let additionalInfo = "";
let stepsToFindRelatedChord = 0;
let originalRoot = [];
let aOrAn = "";
let guitarArray = [];

let guitarNotes = [];

let basicChordQuality = "";

const majorRomanNumerals = ["majori", "skip", "majorii", "skip", "majoriii", "majoriv", "skip", "majorv", "skip", "majorvi", "skip", "majorvii"];
//maj7, m7, m7, maj7, 7, m7, m7b5;
const naturalMinorRomanNumerals = ["minori", "skip", "minorii", "minoriii", "skip", "minoriv", "skip", "minorv", "minorvi", "skip", "minorvii", "skip"];
//m7, m7b5, maj7, m7, m7, maj7, 7;

const harmonicMinorRomanNumerals = ["harmonic_minori", "skip", "harmonic_minorii", "harmonic_minoriii", "skip", "harmonic_minoriv", "skip", "harmonic_minorv", "harmonic_minorvi", "skip", "skip", "harmonic_minorvii"];
//harmonic minor: i:m maj7, ii:m7b5, III:maj7#5, iv:m7, V:7, VI:maj7, vii:dim7

const harmonicMajorRN = ["harmonic_majori", "skip", "harmonic_majorii", "skip", "harmonic_majoriii", "harmonic_majoriv", "skip", "harmonic_majorv", "harmonic_majorvi", "skip", "skip", "harmonic_majorvii"];
//harmonicMajor: I:maj7, ii:m7b5, iii:m7/7, iv:m maj7, V:7, VI:maj7#5/dim7, vii:dim7;

// const harmonicMajorAlternateRN = ["skip", "skip", "skip", "skip", "harmonic_majorIII", "skip", "skip", "skip", "harmonic_majorvi", "skip", "skip", "skip"];

const melodicMinorRN = ["melodic_minori", "skip", "melodic_minorii", "melodic_minoriii", "skip", "melodic_minoriv", "skip", "melodic_minorv", "skip", "melodic_minorvi", "skip", "melodic_minorvii"];
//melodic minor: i:m maj7, ii:m7, III:maj7#5, IV:7, V:7, vi:m7b5, vii:m7b5/7alt;

// const melodicMinorAlternateRN = ["skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "melodic_minorVII"];

const specialCases = ["skip", "tritone sub", "V of V", "skip", "skip", "skip", "skip", "skip", "augmented 6th", "skip", "skip", "skip"];

const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip"];
const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip"];

const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab"];


let firstPrompt = prompt("Enter 1 for Note Input or 2 for Guitar Fret Input", "");




function guitarInput() {
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
    whatAreTheGuitarNotes();
}





scales = {
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
    unalteredNoteInput = unalteredNoteInput.join(" ");
    runAfterInput();
}

function whatAreTheGuitarNotes() {
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
    const sortedChordArray = [...new Set(chordArray)].sort();

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

    let chordQuality = "";
    let position = "";
    let hasAlternate = false;
    let alternate = "";
    let alternateStepsAboveOriginal = 0;
    let alternateStepsArray = [];
    let fullDiminishedType = false;

    let fromLowestUpToRoot = 0;
    let fromLowestUpToRootAlternate = 0;
    let group = 0;
    let alternateGroup = [];
    let chordFunctions = [];

    let fretString = fretArray.join(",");

    let rootPosition;

    let inversionChecker = Array.from(indexArray);

    let alternateChordQuality = [];

    let originalChordQuality = "";

    function determineChordQuality() {
        for (let i = 0; i < indexArray.length; i++) {
            inversionChecker = Array.from(indexArray);
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
                //MINOR
                case "0,3,7":
                    chordQuality = "minor";
                    rootPosition = "0,3,7";
                    group = 1;
                    basicChordQuality = "minor";
                    break;
                // MINOR 7 and 6
                case "0,3,7,10":
                    chordQuality = "minor 7";
                    group = 2;
                    rootPosition = "0,3,7,10";
                    basicChordQuality = "minor";

                    hasAlternate = true;
                    alternateChordQuality.push("6");
                    alternateStepsArray.push(3);
                    alternateGroup.push(4);

                    break;

                //MINOR MAJ7
                case "0,3,7,11":
                    chordQuality = "m maj7";
                    group = 2;
                    rootPosition = "0,3,7,11";
                    basicChordQuality = "minor";
                    break;
                //MINOR 9TH
                case "0,2,3,7,10":
                    rootPosition = "0,2,3,7,10"
                    chordQuality = "minor 9";
                    group = 3;
                    break;

                //MAJOR
                case "0,4,7":
                    rootPosition = "0,4,7";
                    chordQuality = "major";
                    group = 1;
                    basicChordQuality = "major";
                    break;

                //DOMINANT 7
                case "0,4,7,10":
                    rootPosition = "0,4,7,10";
                    chordQuality = "dominant 7";
                    group = 2;
                    // hasAlternate = true;
                    basicChordQuality = "major";
                    //Alternates
                    //German Augmented 6th:
                    // alternateChordQuality.push("German Augmented 6th");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(2);
                    // //Tritone:
                    // alternateChordQuality.push("tritone sub");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(2);

                    // alternateChordQuality.push("V of V");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(2);

                    break;
                // 9 Chord
                case "0,2,4,7,10":
                    rootPosition = "0,2,4,7,10";
                    chordQuality = "9";
                    group = 3;
                    basicChordQuality = "major";
                    break;
                case "0,2,4,5,7,9,10":
                    rootPosition = "0,2,4,5,7,9,10";
                    chordQuality = "13";
                    group = 5;
                    basicChordQuality = "major";
                    break;
                // 7b9 Chord
                case "0,1,4,7,10":
                    rootPosition = "0,1,4,7,10";
                    chordQuality = "7b9";
                    group = 3;
                    basicChordQuality = "major";
                    break;
                //AUGMENTED 6TH CHORDS
                // Italian Augmented 6th:
                case "0,4,10":
                    rootPosition = "0,4,10";
                    chordQuality = "dominant 7";
                    group = 6;
                    basicChordQuality = "major";

                    // rootPosition = "0,4,10";
                    // chordQuality = "Italian Augmented 6th";
                    // group = 6;
                    // basicChordQuality = "major";
                    // hasAlternate = true;
                    // alternateChordQuality.push("dominant 7");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(6);

                    // alternateChordQuality.push("tritone sub");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(6);

                    // alternateChordQuality.push("V of V");
                    // alternateStepsArray.push(0);
                    // alternateGroup.push(6);
                    // break;
                    // French Augmented 6th
                    // case "0,4,6,10":
                    //     rootPosition = "0,4,6,10";
                    //     chordQuality = "French Augmented 6th";
                    //     group = 6;
                    //     hasAlternate = true;
                    //     basicChordQuality = "major";

                    break;
                //MAJOR 7
                case "0,4,7,11":
                    rootPosition = "0,4,7,11";
                    chordQuality = "major 7";
                    group = 2;
                    basicChordQuality = "major";
                    break;
                //MAJOR 7 #5
                case "0,4,8,11":
                    rootPosition = "0,4,8,11";
                    chordQuality = "maj7 #5";
                    group = 2;
                    basicChordQuality = "augmented";
                    break;
                //DIMINISHED
                case "0,3,6":
                    rootPosition = "0,3,6";
                    chordQuality = "diminished";
                    group = 1;
                    basicChordQuality = "diminished";
                    break;
                //FULL DIMINISHED 7
                case "0,3,6,9":
                    rootPosition = "0,3,6,9";
                    chordQuality = "full diminished";
                    group = 0;
                    basicChordQuality = "diminished";
                    // specialCase = true;
                    hasAlternate = true;
                    // waitUntilStartOver = true;
                    // fullDiminishedType = true;

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
                    alternate = "minor 7 b 5"
                    hasAlternate = true;
                    basicChordQuality = "diminished";
                    group = 2;

                    alternateChordQuality.push("m7b5");
                    alternateStepsArray.push(0);
                    break;
                //AUGMENTED
                case "0,4,8":
                    rootPosition = "0,4,8";
                    chordQuality = "augmented";
                    group = 0;
                    basicChordQuality = "augmented";
                    // hasAlternate = true;
                    // alternateChordQuality.push("augmented");
                    // alternateStepsArray.push(0);
                    // alternateStepsArray.push(4);
                    // alternateStepsArray.push(8);
                    // waitUntilStartOver = true;
                    break;
            }

        }
        originalChordQuality = chordQuality;
    }

    determineChordQuality();

    let inversionNumber;
    function determineInversion() {
        for (let i = 0; i < indexArray.length; i++) {
            inversionChecker = Array.from(indexArray);
            let valueToRemove = inversionChecker[i];
            for (let j = 0; j < indexArray.length; j++) {
                inversionChecker[j] = inversionChecker[j] - valueToRemove;
                if (inversionChecker[j] < 0) {
                    inversionChecker[j] = inversionChecker[j] + 12
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

    function findRootAndApplyInversionText() {
        //group 0 is for symmetrical chords (full dim 7 and augmented)
        if (group === 0) {
            function group0() {
                switch (inversionNumber) {
                    case 0:

                        fromLowestUpToRoot = fretArray[3];
                        position = "Root Position";
                        break;
                }
            }
            group0();

        }
        if (group === 1) {
            //triads like major and minor
            function group1() {

                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "Root Position";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "2nd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "1st Inversion";
                        break;
                }

            }
            group1();

        }
        if (group === 2) {
            //7 chords
            function group2() {
                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "Root Position";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "3rd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "2nd Inversion";
                        break;
                    case 3:
                        fromLowestUpToRoot = fretArray[3];
                        position = "1st Inversion";
                        break;
                }
            }
            group2();

        }

        if (group === 3) {
            //9 chords
            function group3() {
                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "Root Position";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "3rd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "2nd Inversion"
                        break;
                    case 3:
                        fromLowestUpToRoot = fretArray[3];
                        position = "1st Inversion";
                        break;
                    case 4:
                        fromLowestUpToRoot = fretArray[4];
                        position = "4th Inversion";
                        break;
                }
            }
            group3();
        }
        if (group === 4) {
            //for 6 chords, since they share the same notes as m7 chords but on different root.  may work for others- will have to check
            function group4() {
                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "3rd Inversion";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "2nd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "1st Inversion";
                        break;
                    case 3:
                        fromLowestUpToRoot = fretArray[3];
                        position = "Root Position";
                        break;
                }
            }
            group4();

        }
        if (group === 5) {
            //13 chords
            function group5() {
                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "Root Position";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "3rd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "6th Inversion (13th in bass)";
                        break;
                    case 3:
                        fromLowestUpToRoot = fretArray[3];
                        position = "2nd Inversion";
                        break;
                    case 4:
                        fromLowestUpToRoot = fretArray[4];
                        position = "5th Inversion (11th in bass)";
                        break;
                    case 5:
                        fromLowestUpToRoot = fretArray[5];
                        position = "1st Inversion";
                        break;
                    case 6:
                        fromLowestUpToRoot = fretArray[6];
                        position = "4th Inversion (9th in bass)";
                        break;
                }
            }
            group5();

        }
        if (group === 6) {
            //7 chords with omitted 5th (and augmented 6th chords)
            function group6() {
                switch (inversionNumber) {
                    case 0:
                        fromLowestUpToRoot = fretArray[0];
                        position = "Root Position";
                        break;
                    case 1:
                        fromLowestUpToRoot = fretArray[1];
                        position = "3rd Inversion";
                        break;
                    case 2:
                        fromLowestUpToRoot = fretArray[2];
                        position = "1st inversion";
                        break;
                }
            }
            group6();

        }

    }

    findRootAndApplyInversionText();

    function setIndexArrayToRootPosition() {

        indexArray = rootPosition.split(",");
        for (let i = 0; i < chordArray.length; i++) {
            indexArray[i] = Number(indexArray[i]);
        }

    }

    setIndexArrayToRootPosition();

    let whatThisChordCanBe = [];

    //harmonic minor
    //harmonic minor: m maj7, m7b5, maj7#5, m7, 7, maj7, dim7

    //harmonic major
    //harmonicMajor: maj7, m7b5, m7/7, m maj7, 7, maj7#5/dim7, dim7;

    //const melodicMinorRN = "melodic minorV", "skip", "melodic minorvi", "skip", "melodic minorvii"];
    //melodic minor: m maj7, m7, maj7#5, 7, 7, m7b5, m7b5/7alt;

    //special cases
    const augmented = "augmented";
    const augmented6th = "augmented 6th"
    const tritoneSub = "tritone sub";
    const vofV = "V of V";

    //Determines what function the chord can fulfill based on Roman Numerals
    let matchScaleAndChord = 0;

    function applyChordFunctions() {

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

    function applySpecialFunctions() {
        switch (chordQuality) {
            case "French Augmented 6th":
            case "Italian Augmented 6th":
            case "German Augmented 6th":
                whatThisChordCanBe.push(augmented6th)
                break;
            case "tritone sub":
                whatThisChordCanBe.push(tritoneSub);
                break;
            case "V of V":
                whatThisChordCanBe.push(vofV);
                break;
            // case "full diminished":
            //     whatThisChordCanBe = [];
            //     whatThisChordCanBe.push(harmonicMinorvii);
            //     whatThisChordCanBe.push(harmonicMajorvii);
            //     whatThisChordCanBe.push(harmonicMajorvi)
            //     whatThisChordCanBe.push(fullDiminished);
            //     break;
        }

    }
    applySpecialFunctions();

    let rootCalculation;
    let theRoot;
    let chordOccursIn = "";
    let chordOccursInArray = [];

    function calculateRootNumberAndLetter() {
        rootCalculation = fromLowestUpToRoot + indexOfLowestNote;
        if (startOver) {
            rootCalculation = rootCalculation + alternateStepsAboveOriginal;
        }
        if (rootCalculation >= 12) {
            rootCalculation = rootCalculation - 12;
        }

        theRoot = chromaticArrayKey[rootCalculation];
        if (originalRoot.length === 0) {
            originalRoot.push(theRoot);
        }

        if (startOver === false) {
            chordOccursIn = `${theRoot} ${chordQuality} occurs as a:
`
        }
        if (startOver === true && alternateStepsAboveOriginal === 0) {
            chordOccursIn = `${theRoot} ${originalChordQuality} can function as ${aOrAn} ${chordQuality} chord in the key of:
`
        }

        if (startOver === true && alternateStepsAboveOriginal > 0) {
            chordOccursIn = `${theRoot} ${chordQuality} shares the same notes as ${originalRoot[0]} ${originalChordQuality}.
It occurs in the key of:
`
        }

    }
    calculateRootNumberAndLetter();

    let intervalForKey1;
    let intervalForKey2;
    let chosenArrayIndex;
    let chosenArrayGroup = [];
    let specificArray;

    function findRelevantKeysAndSyncChordFunctionsToNotes() {
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

            // if (whatThisChordCanBe[q] === "full diminished") {
            //     majorOrMinor = "minor";
            //     romanNumeral = "vii";
            // }

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
            // if (fullDiminishedType === false) {
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

            // }
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

                let concatting = false;

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

    findRelevantKeysAndSyncChordFunctionsToNotes();


    function logTheChord() {
        chordOccursIn += chordOccursInArray.join(" ");
        if (theRoot === lowestNote) {
            console.log(`Root: ${theRoot}`)
        } else {
            console.log(`${theRoot} ${chordQuality} / ${lowestNote}`);
        }
        console.log(`Notes: ${chordArray.join(" ")}`);
        if (unalteredNoteInput !== chordArray.join(" ")) {
            console.log(`Input Notes: ${unalteredNoteInput}`)
        }
        console.log(`${theRoot} ${chordQuality}
${position}`)
        console.log(chordOccursIn);

        console.log(additionalInfo);
    }
    if (waitUntilStartOver === false) {
        logTheChord();
    }

    // if (hasAlternate === true) {
    //     startOver = true;
    //     for (let i = 0; i < alternateChordQuality.length; i++) {
    //         group = alternateGroup[i];
    //         alternateStepsAboveOriginal = alternateStepsArray[i];
    //         chordQuality = alternateChordQuality[i];
    //         determineInversion();
    //         findRootAndApplyInversionText();
    //         applyChordFunctions();
    //         calculateRootNumberAndLetter();
    //         findRelevantKeysAndSyncChordFunctionsToNotes();
    //         logTheChord();
    //     }
    // }
}