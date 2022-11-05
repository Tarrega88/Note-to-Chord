let noteNumber = prompt("How many notes does the chord have?", "");
let chordArray = [];
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

const majorRomanNumerals = ["majorI", "skip", "majorii", "skip", "majoriii", "majorIV", "skip", "majorV", "skip", "majorvi", "skip", "majorvii"];
//maj7, m7, m7, maj7, 7, m7, m7b5;
const naturalMinorRomanNumerals = ["minori", "skip", "minorii", "minorIII", "skip", "minoriv", "skip", "minorv", "minorVI", "skip", "minorVII", "skip"];
//m7, m7b5, maj7, m7, m7, maj7, 7;

const harmonicMinorRomanNumerals = ["harmonic minori", "skip", "harmonic minorii", "harmonic minorIII", "skip", "harmonic minoriv", "skip", "minorV", "harmonic minorVI", "skip", "skip", "harmonic minorvii"];
//harmonic minor: i:m maj7, ii:m7b5, III:maj7#5, iv:m7, V:7, VI:maj7, vii:dim7

const harmonicMajorRN = ["harmonic majorI", "skip", "harmonic majorii", "skip", "harmonic majoriii", "harmonic majoriv", "skip", "harmonic majorV", "harmonic majorVI", "skip", "skip", "harmonic majorvii"];
//harmonicMajor: I:maj7, ii:m7b5, iii:m7/7, iv:m maj7, V:7, VI:maj7#5/dim7, vii:dim7;

const harmonicMajorAlternateRN = ["skip", "skip", "skip", "skip", "harmonic majorIII", "skip", "skip", "skip", "harmonic majorvi", "skip", "skip", "skip"];

const melodicMinorRN = ["melodic minori", "skip", "melodic minorii", "melodic minorIII", "skip", "melodic minorIV", "skip", "melodic minorV", "skip", "melodic minorvi", "skip", "melodic minorvii"];
//melodic minor: i:m maj7, ii:m7, III:maj7#5, IV:7, V:7, vi:m7b5, vii:m7b5/7alt;

const melodicMinorAlternateRN = ["skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "skip", "melodicMinorVII"];

const specialCases = ["skip", "tritone sub", "V of V", "skip", "skip", "skip", "skip", "skip", "augmented 6th", "skip", "skip", "skip"];

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
let alternateStepsAboveOriginal = 0;
let alternateStepsArray = [];

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
                break;
            // MINOR 7 and 6
            case "0,3,7,10":
                chordQuality = "minor 7";
                group = 2;
                rootPosition = "0,3,7,10";

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

            //DOMINANT 7
            case "0,4,7,10":
                rootPosition = "0,4,7,10";
                chordQuality = "dominant 7";
                group = 2;
                hasAlternate = true;
                //Alternates
                //German Augmented 6th:
                alternateChordQuality.push("German Augmented 6th");
                alternateStepsArray.push(0);
                alternateGroup.push(2);
                //Tritone:
                alternateChordQuality.push("tritone sub");
                alternateStepsArray.push(0);
                alternateGroup.push(2);

                alternateChordQuality.push("V of V");
                alternateStepsArray.push(0);
                alternateGroup.push(2);

                break;
            // 9 Chord
            case "0,2,4,7,10":
                rootPosition = "0,2,4,7,10";
                chordQuality = "9";
                group = 3;
                break;
            case "0,2,4,5,7,9,10":
                rootPosition = "0,2,4,5,7,9,10";
                chordQuality = "13";
                group = 5;
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
                group = 6;
                hasAlternate = true;
                alternateChordQuality.push("dominant 7");
                alternateStepsArray.push(0);
                alternateGroup.push(6);

                alternateChordQuality.push("tritone sub");
                alternateStepsArray.push(0);
                alternateGroup.push(6);

                alternateChordQuality.push("V of V");
                alternateStepsArray.push(0);
                alternateGroup.push(6);
                break;
            // French Augmented 6th
            case "0,4,6,10":
                rootPosition = "0,4,6,10";
                chordQuality = "French Augmented 6th";
                group = 6;
                hasAlternate = true;

                break;
            //MAJOR 7
            case "0,4,7,11":
                rootPosition = "0,4,7,11";
                chordQuality = "major 7";
                group = 2;
                break;
            //MAJOR 7 #5
            case "0,4,8,11":
                rootPosition = "0,4,8,11";
                chordQuality = "maj7 #5";
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
                hasAlternate = true;
                waitUntilStartOver = true;

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
                group = 2;

                alternateChordQuality.push("m7b5");
                alternateStepsArray.push(0);
                break;
            //AUGMENTED
            case "0,4,8":
                rootPosition = "0,4,8";
                chordQuality = "augmented";
                group = 0;
                hasAlternate = true;
                alternateChordQuality.push("augmented");
                alternateStepsArray.push(0);
                alternateStepsArray.push(4);
                alternateStepsArray.push(8);
                waitUntilStartOver = true;
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

let whatThisChordCanBe = [];
//major
const majorI = "majorI";
const majorii = "majorii";
const majoriii = "majoriii";
const majorIV = "majorIV";
const majorV = "majorV";
const majorvi = "majorvi";
const majorvii = "majorvii";

//natural minor
const minori = "minori";
const minorii = "minorii";
const minorIII = "minorIII";
const minoriv = "minoriv";
const minorv = "minorv";
const minorV = "minorV";
const minorVI = "minorVI";
const minorVII = "minorVII";
const fullDiminished = "full diminished";

//harmonic minor
//harmonic minor: m maj7, m7b5, maj7#5, m7, 7, maj7, dim7
const harmonicMinori = "harmonic minori";
const harmonicMinorii = "harmonic minorii";
const harmonicMinorIII = "harmonic minorIII";
const harmonicMinoriv = "harmonic minoriv";
const harmonicMinorV = "harmonic minorV";
const harmonicMinorVI = "harmonic minorVI";
const harmonicMinorvii = "harmonic minorvii";

//harmonic major
//harmonicMajor: maj7, m7b5, m7/7, m maj7, 7, maj7#5/dim7, dim7;
const harmonicMajorI = "harmonic majorI";
const harmonicMajorii = "harmonic majorii";
const harmonicMajoriii = "harmonic majoriii";
const harmonicMajoriv = "harmonic majoriv";
const harmonicMajorV = "harmonic majorV";
const harmonicMajorVI = "harmonic majorVI";
const harmonicMajorvii = "harmonic major vii";

const harmonicMajorvi = "harmonic majorvi"
const harmonicMajorIII = "harmonic majorIII";
//const melodicMinorRN = "melodic minorV", "skip", "melodic minorvi", "skip", "melodic minorvii"];
//melodic minor: m maj7, m7, maj7#5, 7, 7, m7b5, m7b5/7alt;
const melodicMinori = "melodic minori";
const melodicMinorii = "melodic minorii";
const melodicMinorIII = "melodic minorIII";
const melodicMinorIV = "melodic minorIV";
const melodicMinorV = "melodic minorV";
const melodicMinorvi = "melodic minorvi";
const melodicMinorvii = "melodic minorvii";

//special cases
const augmented = "augmented";
const augmented6th = "augmented 6th"
const tritoneSub = "tritone sub";
const vofV = "V of V";

//Determines what function the chord can fulfill based on Roman Numerals

function applyChordFunctions() {
    whatThisChordCanBe = [];
    switch (chordQuality) {
        case "major":
            whatThisChordCanBe.push(majorI);
            whatThisChordCanBe.push(minorIII);
            whatThisChordCanBe.push(majorIV);
            whatThisChordCanBe.push(majorV);
            whatThisChordCanBe.push(minorVI);
            whatThisChordCanBe.push(minorVII);
            break;
        case "major 7":
        case "6":
            whatThisChordCanBe.push(majorI);
            whatThisChordCanBe.push(minorIII);
            whatThisChordCanBe.push(majorIV);
            whatThisChordCanBe.push(minorVI);
            whatThisChordCanBe.push(harmonicMajorI);
            whatThisChordCanBe.push(harmonicMinorVI);
            break;
        case "maj7 #5":
            whatThisChordCanBe.push(harmonicMinorIII);
            whatThisChordCanBe.push(melodicMinorIII);
            whatThisChordCanBe.push(harmonicMajorVI);
            break;
        case "dominant 7":
            whatThisChordCanBe.push(majorV);
            whatThisChordCanBe.push(harmonicMinorV);
            whatThisChordCanBe.push(melodicMinorV);
            whatThisChordCanBe.push(harmonicMajorV);

            whatThisChordCanBe.push(minorVII);
            whatThisChordCanBe.push(harmonicMajorIII);
            whatThisChordCanBe.push(melodicMinorIV);

            break;
        case "minor":
        case "minor 7":
            whatThisChordCanBe.push(minori);
            whatThisChordCanBe.push(majorii);
            whatThisChordCanBe.push(majoriii);
            whatThisChordCanBe.push(minoriv);
            whatThisChordCanBe.push(minorv);
            whatThisChordCanBe.push(majorvi);

            whatThisChordCanBe.push(melodicMinorii);
            whatThisChordCanBe.push(harmonicMajoriii);
            whatThisChordCanBe.push(harmonicMinoriv);
            break;
        case "minor 9":
            whatThisChordCanBe.push(minori);
            whatThisChordCanBe.push(majorii);
            whatThisChordCanBe.push(minoriv);
            whatThisChordCanBe.push(majorvi);
            break;
        case "9":
        case "13":
            whatThisChordCanBe.push(majorV);
            break;
        case "7b9":
            whatThisChordCanBe.push(minorV);
            break;
        case "half diminished 7":
        case "m7b5":
            whatThisChordCanBe.push(majorvii);
            whatThisChordCanBe.push(minorii);
            whatThisChordCanBe.push(melodicMinorvi);
            whatThisChordCanBe.push(melodicMinorvii);
            whatThisChordCanBe.push(harmonicMajorii);
            break;
        case "full diminished":
            whatThisChordCanBe.push(harmonicMinorvii);
            whatThisChordCanBe.push(harmonicMajorvii);
            whatThisChordCanBe.push(harmonicMajorvi)
            whatThisChordCanBe.push(fullDiminished);
            break;
        case "augmented":
            whatThisChordCanBe.push(augmented);
            break;
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
        case "m maj7":
            whatThisChordCanBe.push(melodicMinori);
            whatThisChordCanBe.push(harmonicMinori);
            whatThisChordCanBe.push(harmonicMajoriv);
            break;
    }

}
applyChordFunctions();

let rootCalculation;
let theRoot;
let chordOccursIn = "";

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
        chordOccursIn = `${theRoot} ${chordQuality} occurs in the key of:
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
        if (whatThisChordCanBe[q].includes("harmonic minor") || whatThisChordCanBe[q].includes("harmonic major")) {
            majorOrMinor = whatThisChordCanBe[q].slice(0, 14);
            romanNumeral = whatThisChordCanBe[q].slice(14);
        }

        if (whatThisChordCanBe[q].includes("melodic minor")) {
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

        if (melodicMinorAlternateRN.includes(whatThisChordCanBe[q])) {
            chosenArrayIndex = melodicMinorAlternateRN.indexOf(whatThisChordCanBe[q]);
        }

        if (harmonicMajorRN.includes(whatThisChordCanBe[q])) {
            chosenArrayIndex = harmonicMajorRN.indexOf(whatThisChordCanBe[q]);
        }

        if (harmonicMajorAlternateRN.includes(whatThisChordCanBe[q])) {
            chosenArrayIndex = harmonicMajorAlternateRN.indexOf(whatThisChordCanBe[q]);
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
                chordOccursIn += `${temporaryKey} ${majorOrMinor} as the ${romanNumeral} chord.
`
            }
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

    if (theRoot === lowestNote) {
        console.log(`Root: ${theRoot}`)
    } else {
        console.log(`${theRoot} ${chordQuality} / ${lowestNote}`);
    }
    console.log(`Notes: ${chordArray.join(" ")}`)
    console.log(`${theRoot} ${chordQuality}
${position}`)
    console.log(chordOccursIn);

    console.log(additionalInfo);
}
if (waitUntilStartOver === false) {
    logTheChord();
}

if (hasAlternate === true) {
    startOver = true;
    for (let i = 0; i < alternateChordQuality.length; i++) {
        group = alternateGroup[i];
        alternateStepsAboveOriginal = alternateStepsArray[i];
        chordQuality = alternateChordQuality[i];
        determineInversion();
        findRootAndApplyInversionText();
        applyChordFunctions();
        calculateRootNumberAndLetter();
        findRelevantKeysAndSyncChordFunctionsToNotes();
        logTheChord();
    }
}
