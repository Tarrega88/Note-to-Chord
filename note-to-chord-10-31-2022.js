let noteNumber = prompt("How many notes does the chord have?", "");
let chordArray = [];
let indexArray = [];

let root = "";
let majorOrMinor = "";
let romanNumeral = "";
let indexOfRoot = 0;
let specialCase = false;

const majorRomanNumerals = ["majorI", "skip", "majorii", "skip", "majoriii", "majorIV", "skip", "majorV", "skip", "majorvi", "skip", "majorvii"];
const naturalMinorRomanNumerals = ["minori", "skip", "minorii", "minorIII", "skip", "minoriv", "skip", "minorv", "minorVI", "skip", "minorVII", "skip"];
const harmonicMinorRomanNumerals = ["skip", "skip", "skip", "skip", "skip", "skip", "skip", "minorV", "skip", "skip", "skip", "skip"];
const specialCases = ["skip", "tritone sub", "V of V", "skip", "skip", "skip", "skip", "skip", "augmented 6", "skip", "skip", "full diminished"];
//will fill later;

const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip"];
const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip"];

const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab"];

function whatAreTheNotes() {
    for (let i = 0; i < Number(noteNumber); i++) {
        let chordNotes = prompt(`What's note number ${i + 1}?`);
        chordNotes = chordNotes[0].toUpperCase() + chordNotes.slice(1, chordNotes.length);
        // console.log(chordNotes)
        for (let j = 0; j < chromaticArrayKey.length; j++) {
            if (chromaticArrayKey[j].slice(2) === chordNotes || chromaticArrayKey[j].slice(0, 2) === chordNotes || chromaticArrayKey[j] === chordNotes) {
                chordArray.push(chordNotes);
                indexArray.push(j);
            }
            if (enharmonicEquivalentsHigher[j].slice(1) === chordNotes || enharmonicEquivalentsLower[j].slice(1) === chordNotes) {

                chordArray.push(chromaticArrayKey[j][0]);
                indexArray.push(j);
            }

        }
    }
}
whatAreTheNotes();

const uniqueChordArray = [...new Set(chordArray)];
const sortedChordArray = [...new Set(chordArray)].sort();

// console.log(uniqueChordArray)
// console.log(sortedChordArray)

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
let fromLowestUpToRoot = 0;
let group = 0;
let chordFunctions = [];

let fretString = fretArray.join(",");

let rootPosition;

let inversionChecker = Array.from(indexArray);

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
                break;
            // MINOR 7
            case "0,3,7,10":
                chordQuality = "minor 7";
                group = 2;
                rootPosition = "0,3,7,10";
                // hasAlternate = true;
                // alternateChordQuality = "6";
                // alternatePosition = "3rd Inversion";
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
                break;
            // MAJOR 6
            //Covered in minor 7 alternates

            //DOMINANT 7
            case "0,4,7,10":
                rootPosition = "0,4,7,10";
                chordQuality = "dominant 7";
                group = 2;
                hasAlternate = true;
                break;
            // 9 Chord
            case "0,2,4,7,10":
                rootPosition = "0,2,4,7,10";
                chordQuality = "9";
                group = 3;
                break;

            // 7b9 Chord
            case "0,1,4,7,10":
                rootPosition = "0,1,4,7,10";
                chordQuality = "7b9";
                group = 3;
                break;
            //AUGMENTED 6TH CHORDS
            // Italian Augmented 6th:
            case "0,4,10":
                rootPosition = "0,4,10";
                chordQuality = "Italian Augmented 6th";
                group = 1;
                break;
            // French Augmented 6th
            case "0,4,6,10":
                rootPosition = "0,4,6,10";
                chordQuality = "French Augmented 6th";
                group = 2;
                hasAlternate = true;
                break;
            //MAJOR 7
            case "0,4,7,11":
                rootPosition = "0,4,7,11";
                chordQuality = "major 7";
                group = 2;
                break;
            //DIMINISHED
            case "0,3,6":
                rootPosition = "0,3,6";
                chordQuality = "diminished";
                group = 1;
                break;
            //FULL DIMINISHED 7
            case "0,3,6,9":
                rootPosition = "0,3,6,9";
                chordQuality = "full diminished";
                group = 0;
                specialCase = true;
                break;
            //HALF DIMINISHED 7 AND M7b5
            case "0,3,6,10":
                rootPosition = "0,3,6,10";
                chordQuality = "half diminished 7";
                alternate = "minor 7 b 5"
                hasAlternate = true;
                group = 2;
                break;
            //AUGMENTED
            case "0,4,8":
                rootPosition = "0,4,8";
                chordQuality = "augmented";
                group = 0;
                break;
        }

    }
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
        switch (inversionNumber) {
            case 0:
                fromLowestUpToRoot = fretArray[3];
                position = "Root Position";
                break;
        }
    }

    if (group === 1) {
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

    if (group === 2) {
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

    if (group === 3) {
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
}

findRootAndApplyInversionText();

let whatThisChordCanBe = [];
const majorI = "majorI";
const majorii = "majorii";
const majoriii = "majoriii";
const majorIV = "majorIV";
const majorV = "majorV";
const majorvi = "majorvi";
const majorvii = "majorvii";

const minori = "minori";
const minorii = "minorii";
const minorIII = "minorIII";
const minoriv = "minoriv";
const minorv = "minorv";
const minorV = "minorV";
const minorVI = "minorVI";
const minorVII = "minorVII";
const fullDiminished = "full diminished";

const augmented = "augmented";

//Determines what function the chord can fulfill based on Roman Numerals

function applyChordFunctions() {
    switch (chordQuality) {
        case "major":
            whatThisChordCanBe.push(majorI);
            whatThisChordCanBe.push(majorIV);
            whatThisChordCanBe.push(majorV);
            whatThisChordCanBe.push(minorIII);
            whatThisChordCanBe.push(minorVI);
            whatThisChordCanBe.push(minorVII);
            break;
        case "major 7":
            whatThisChordCanBe.push(majorI);
            whatThisChordCanBe.push(majorIV);
            whatThisChordCanBe.push(minorIII);
            whatThisChordCanBe.push(minorVI);
            break;
        case "dominant 7":
            whatThisChordCanBe.push(majorV);
            whatThisChordCanBe.push(minorV);
            break;
        case "minor":
        case "minor 7":
            whatThisChordCanBe.push(minori);
            whatThisChordCanBe.push(minoriv);
            whatThisChordCanBe.push(minorv);

            whatThisChordCanBe.push(majorii);
            whatThisChordCanBe.push(majoriii);
            whatThisChordCanBe.push(majorvi);
            break;
        case "minor 9":
            whatThisChordCanBe.push(minori);
            whatThisChordCanBe.push(minoriv);
            whatThisChordCanBe.push(majorii);
            whatThisChordCanBe.push(majorvi);
            break;
        case "9":
            whatThisChordCanBe.push(majorV);
            break;
        case "7b9":
            whatThisChordCanBe.push(minorV);
            break;
        case "half diminished 7":
            whatThisChordCanBe.push(majorvii);
            whatThisChordCanBe.push(minorii);
            break;
        case "full diminished":
            whatThisChordCanBe.push(fullDiminished);
            break;
        case "augmented":
            whatThisChordCanBe.push(augmented);
    }
}
applyChordFunctions();

let rootCalculation = fromLowestUpToRoot + indexOfLowestNote;

if (rootCalculation >= 12) {
    rootCalculation = rootCalculation - 12;
}

let theRoot = chromaticArrayKey[rootCalculation];

let chordOccursIn = `${theRoot} ${chordQuality} occurs in the key of:

`;

let intervalForKey1;
let intervalForKey2;
let chosenArrayIndex;
let chosenArrayGroup = [];

function findRelevantKeysAndSyncChordFunctionsToNotes() {
    for (let q = 0; q < whatThisChordCanBe.length; q++) {
        let chromaticLoop = 0;
        if (whatThisChordCanBe[q].includes("minor") || whatThisChordCanBe[q].includes("major")) {
            majorOrMinor = whatThisChordCanBe[q].slice(0, 5);
            romanNumeral = whatThisChordCanBe[q].slice(5);
        }
        if (whatThisChordCanBe[q].includes("augmented 6")) {//something;
        }
        if (whatThisChordCanBe[q].includes("full diminished")) {
            majorOrMinor = "minor";
            romanNumeral = "vii";
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
            if (whatThisChordCanBe[q] === fullDiminished) {
                chosenArrayIndex = specialCases.indexOf(whatThisChordCanBe[q]);
            }
        }

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

            let temporaryKey = chromaticArrayKey[chromaticLoop];
            if (temporaryKey.length === 4) {
                temporaryKey = temporaryKey.slice(0, 2) + "/" + temporaryKey.slice(2);
            }

            if (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2) {
                chordOccursIn += `${temporaryKey} ${majorOrMinor} as the ${romanNumeral} chord.
`
            }
            if (chordQuality === fullDiminished) {
                if (i - 3 === rootCalculation + intervalForKey1 || i - 3 === rootCalculation + intervalForKey2) {
                    chordOccursIn += `${temporaryKey} ${majorOrMinor} as the ${romanNumeral} chord.
`
                }
                if (i - 6 === rootCalculation + intervalForKey1 || i - 6 === rootCalculation + intervalForKey2) {
                    chordOccursIn += `${temporaryKey} ${majorOrMinor} as the ${romanNumeral} chord.
`
                }
                if (i - 9 === rootCalculation + intervalForKey1 || i - 9 === rootCalculation + intervalForKey2) {
                    chordOccursIn += `${temporaryKey} ${majorOrMinor} as the ${romanNumeral} chord.
`
                }

            }

            chromaticLoop++;
        }
    }
}

findRelevantKeysAndSyncChordFunctionsToNotes();

if (theRoot === lowestNote) {
    console.log(`Root: ${theRoot}`)
} else {
    console.log(`${theRoot} / ${lowestNote}`);
}
console.log(`Notes: ${chordArray.join(" ")}`)
console.log(`${theRoot} ${chordQuality}
${position}`)
console.log(chordOccursIn);

if (hasAlternate === true) {
    console.log(alternate)
}
