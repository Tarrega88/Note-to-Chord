let noteNumber = prompt("How many notes does the chord have?", "");
let chordArray = [];
let indexArray = [];

let root = "";
let majorOrMinor = "";
let romanNumeral = "";
let indexOfRoot = 0;

const majorRomanNumerals = ["majorI", "skip", "majorii", "skip", "majoriii", "majorIV", "skip", "majorV", "skip", "majorvi", "skip", "majorvii"];
const naturalMinorRomanNumerals = ["minori", "skip", "minorii", "minorIII", "skip", "minoriv", "skip", "minorv", "minorVI", "skip", "minorVII", "skip"];
const harmonicMinorRomanNumerals = ["skip", "skip", "skip", "skip", "skip", "skip", "skip", "minorV", "skip", "skip", "skip", "minorvii"];
const specialCases = ["skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "augmented6", "skip", "skip", "skip"]; //will fill later;

const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip"];
const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip"];

const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab"];

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

let uniqueChordArray = [...new Set(chordArray)];
let sortedChordArray = [...new Set(chordArray)].sort();

// console.log(uniqueChordArray)
// console.log(sortedChordArray)

indexArray = [...new Set(indexArray)];
let fretArray = indexArray.sort((a,b)=>a - b);

let lowestFret = indexArray[0];
let lowestNote = uniqueChordArray[0];

let indexOfLowestNote = 0;
let alteredIndexOfLowestNote = 0;

for (let i = 0; i < chromaticArrayKey.length; i++) {
    if (chromaticArrayKey[i].slice(2) === lowestNote || chromaticArrayKey[i].slice(0, 2) === lowestNote || chromaticArrayKey[i] === lowestNote) {
        indexOfLowestNote = i;
    }
}

if (indexOfLowestNote - lowestFret >= 0) {
    alteredIndexOfLowestNote = indexOfLowestNote - lowestFret;
}

// console.log(`Index of Lowest Original Note: ${indexOfLowestNote}`)

//not needed anymore I think
// for (let i = 1; i < sortedChordArray.length; i++) {
//     if (fretArray[i] < lowestFret) {
//         lowestFret = fretArray[i];
//     }
// }

if (lowestFret > 0) {
    for (let i = 0; i < fretArray.length; i++) {
        fretArray[i] = fretArray[i] - lowestFret;
    }
}

for (let i = 0; i < fretArray.length; i++) {
    if (alteredIndexOfLowestNote === fretArray[i]) {
        indexOfRoot = i;
    }
}

for (let i = 0; i < indexOfRoot; i++) {
    fretArray[i] = fretArray[i] + 12;
}

fretArray = fretArray.sort((a,b)=>a - b);

if (fretArray[0] > 0) {
    let shiftingChordDownAmount = fretArray[0];
    for (let i = 0; i < fretArray.length; i++) {
        fretArray[i] = fretArray[i] - shiftingChordDownAmount;
    }
}

// console.log(fretArray)

let chordQuality = "";
let position = "";
let hasAlternate = false;
let alternate = "";
let fromLowestUpToRoot = 0;
let group = 0;
let chordFunctions = [];

let fretString = fretArray.join(",");

// console.log(fretString)

switch (fretString) {
    //MINOR
case "0,3,7":
    position = "Root";
    chordQuality = "minor";
    group = 1;
    break;
case "0,4,9":
    position = "1st Inversion";
    chordQuality = "minor";
    group = 1;
    break;
case "0,5,8":
    position = "2nd Inversion";
    chordQuality = "minor";
    fromLowestUpToRoot = fretArray[1];
    group = 1;
    break;
    // MINOR 7
case "0,3,7,10":
    chordQuality = "minor 7";
    position = "Root";
    group = 2;
    hasAlternate = true;
    alternateChordQuality = "6";
    alternatePosition = "3rd Inversion";
    break;

case "0,4,7,9":
    chordQuality = "minor 7";
    position = "1st Inversion";
    group = 2;
    hasAlternate = true;
    //Major 6

    alternateChordQuality = "6";
    alternatePosition = "Root";
    break;

case "0,3,5,8":
    chordQuality = "minor 7";
    position = "2nd Inversion";
    group = 2;
    hasAlternate = true;
    alternateChordQuality = "6";
    alternatePosition = "1st Inversion";
    break;

case "0,2,5,9":
    chordQuality = "minor 7";
    position = "3rd Inversion";
    group = 2;
    hasAlternate = true;
    alternateChordQuality = "6";
    alternatePosition = "2nd Inversion";
    break;
    //MINOR 9TH
case "0,2,3,7,10":
    chordQuality = "minor 9";
    position = "Root";
    group = 3;
    break;

case "0,1,5,8,10":
    chordQuality = "minor 9";
    position = "4th Inversion";
    group = 3;
    break;

case "0,4,7,9,11":
    chordQuality = "minor 9";
    position = "1st Inversion";
    group = 3;
    break;

case "0,3,5,7,8":
    chordQuality = "minor 9";
    position = "2nd Inversion";
    group = 3;
    break;

case "0,2,4,5,9":
    chordQuality = "minor 9";
    position = "3rd Inversion";
    group = 3;
    break;

    //MAJOR
case "0,4,7":
    chordQuality = "major";
    position = "Root";
    group = 1;
    break;
case "0,3,8":
    chordQuality = "major";
    position = "1st Inversion";
    group = 1;
    break;
case "0,5,9":
    chordQuality = "major";
    position = "2nd Inversion";
    group = 1;
    break;

    // MAJOR 6
    //Covered in minor 7 alternates

    //DOMINANT 7
case "0,4,7,10":
    chordQuality = "dominant 7";
    position = "Root";
    group = 2;
    hasAlternate = true;
    break;
case "0,3,6,8":
    chordQuality = "dominant 7";
    position = "1st Inversion";
    group = 2;
    hasAlternate = true;
    break;
case "0,3,5,9":
    chordQuality = "dominant 7";
    position = "2nd Inversion";
    group = 2;
    hasAlternate = true;
    break;
case "0,2,6,9":
    chordQuality = "dominant 7";
    position = "3rd Inversion";
    group = 2;
    hasAlternate = true;
    break;
// 9 Chord
    case "0,2,4,7,10":
chordQuality = "9";
    position =" Root";
    group = 3;
        break;
 case "0,2,5,8,10":
    chordQuality = "9";
    position = "4th Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,3,6,8,10":
    chordQuality = "9";
    position = "1st Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,3,5,7,9":
    chordQuality = "9";
    position = "2nd Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,2,4,6,9":
    chordQuality = "9";
    position = "3rd Inversion";
    group = 3;
    hasAlternate = true;
    break; 

// 7b9 Chord
    case "0,1,4,7,10":
chordQuality = "7b9";
    position =" Root";
    group = 3;
        break;
 case "0,3,6,9,11":
    chordQuality = "7b9";
    position = "4th Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,3,6,8,9":
    chordQuality = "7b9";
    position = "1st Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,3,5,6,9":
    chordQuality = "7b9";
    position = "2nd Inversion";
    group = 3;
    hasAlternate = true;
    break;
case "0,2,3,6,9":
    chordQuality = "7b9";
    position = "3rd Inversion";
    group = 3;
    hasAlternate = true;
    break;
    //AUGMENTED 6TH CHORDS
    // Italian Augmented 6th:
case "0,4,10":
    chordQuality = "Italian Augmented 6th";
    position = "Root";
    group = 1;
    break;
case "0,6,8":
    chordQuality = "Italian Augmented 6th";
    position = "1st Inversion";
    group = 1;
    break;
case "0,2,6":
    chordQuality = "Italian Augmented 6th";
    position = "2nd Inversion";
    group = 1;
    break;
    // French Augmented 6th
case "0,4,6,10":
    chordQuality = "French Augmented 6th";
    position = "Root";
    group = 2;
    hasAlternate = true;
    break;
case "0,2,6,8":
    chordQuality = "French Augmented 6th";
    position = "1st Inversion";
    group = 2;
    hasAlternate = true;
    break;
    //MAJOR 7
case "0,4,7,11":
    chordQuality = "major 7";
    position = "Root";
    group = 2;
    break;
case "0,3,7,8":
    chordQuality = "major 7";
    position = "1st Inversion";
    group = 2;
    break;
case "0,4,5,9":
    chordQuality = "major 7";
    position = "2nd Inversion";
    group = 2;
    break;
case "0,1,5,8":
    chordQuality = "major 7";
    position = "3rd Inversion";
    group = 2;
    break;
    //DIMINISHED
case "0,3,6":
    chordQuality = "diminished";
    position = "Root";
    group = 1;
    break;
case "0,3,9":
    chordQuality = "diminished";
    position = "1st Inversion";
    group = 1;
    break;
case "0,6,9":
    chordQuality = "diminished";
    position = "2nd Inversion";
    group = 1;
    break;
    //FULL DIMINISHED 7
case "0,3,6,9":
    chordQuality = "full diminished 7";
    position = "Rootless"
    group = 2;
    break;
    //HALF DIMINISHED 7 AND M7b5
case "0,3,6,10":
    chordQuality = "half diminished 7";
    position = "Root";
    alternate = "minor 7 b 5"
    hasAlternate = true;
    group = 2;
    break;
case "0,3,7,9":
    chordQuality = "half diminished 7";
    position = "1st Inversion";
    alternate = "minor 7 b 5"
    hasAlternate = true;
    group = 2;
    break;
case "0,4,6,9":
    chordQuality = "half diminished 7";
    position = "2nd Inversion";
    alternate = "minor 7 b 5"
    hasAlternate = true;
    group = 2;
    break;
case "0,2,5,8":
    chordQuality = "half diminished 7";
    position = "3rd Inversion";
    alternate = "minor 7 b 5"
    hasAlternate = true;
    group = 2;
    break;
    //AUGMENTED
case "0,4,8":
    chordQuality = "augmented";
    position = "Rootless";
    group = 1;
    break;
}

if (group === 1) {
    switch (position) {
    case "Root":
    case "Rootless":
        fromLowestUpToRoot = 0;
        break;

    case "1st Inversion":
        fromLowestUpToRoot = fretArray[2];
        break;
    case "2nd Inversion":
        fromLowestUpToRoot = fretArray[1];
        break;
    }
}

if (group === 2) {
    switch (position) {
    case "Rootless":
    case "Root":
        fromLowestUpToRoot = 0;
        break;
    case "1st Inversion":
        fromLowestUpToRoot = fretArray[3];
        break;
    case "2nd Inversion":
        fromLowestUpToRoot = fretArray[2];
        break;
    case "3rd Inversion":
        fromLowestUpToRoot = fretArray[1];
        break;
    }
}

if (group === 3) {
    switch (position) {
    case "Root":
        fromLowestUpToRoot = 0;
        break;
    case "1st Inversion":
        fromLowestUpToRoot = fretArray[3];
        break;
    case "2nd Inversion":
        fromLowestUpToRoot = fretArray[2];
        break;
    case "3rd Inversion":
        fromLowestUpToRoot = fretArray[1];
        break;
    case "4th Inversion":
        fromLowestUpToRoot = fretArray[4];
        break;
    }
}

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
const minorvii = "minorvii";

//Determines what function the chord can fulfill based on Roman Numerals
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
}

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

for (let q = 0; q < whatThisChordCanBe.length; q++) {
    let chromaticLoop = 0;
    if (whatThisChordCanBe[q].includes("minor") || whatThisChordCanBe[q].includes("major")) {
    majorOrMinor = whatThisChordCanBe[q].slice(0, 5);
    romanNumeral = whatThisChordCanBe[q].slice(5);
    }
    if (whatThisChordCanBe[q].includes("augmented 6")) {


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
        chromaticLoop++;
    }
}
//

if (theRoot === lowestNote) {
    console.log(theRoot)
} else {
    console.log(`${theRoot} / ${lowestNote}`);
}
console.log(`${theRoot} ${chordQuality}
Inversion: ${position}`)
console.log(chordOccursIn);

if (hasAlternate === true) {
    console.log(alternate)
}