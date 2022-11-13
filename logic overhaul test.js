let chordArray = []; //adding notes for future refactors: inside of 5 functions 
let unalteredNoteInput = []; //inside of 3 functions
let indexArray = []; //inside of 8 functions

//further refactoring should probably put indexArray, unalteredNoteInput, and chordArray into an object; there should also be a second version of the chordArray that does not change the input to the enharmonic equivalents

let aOrAn = "";

let whatThisChordCanBe = [];

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


const basicChords = {

    dim: {
        intervals: [0, 3, 6],
        restrictions: ["skip", 4, 7],
    },

    aug: {
        intervals: [0, 4, 8],
        restrictions: ["skip", 3, 7],
    },

    major: {
        intervals: [0, 4],
        restrictions: ["skip", "skip"],
    },

    m: {
        intervals: [0, 3],
        restrictions: ["skip", "skip"],
    },
    sus: {
        intervals: [0, 5],
        restrictions: ["skip", "skip"],
    },

}

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

    function doesChordHave5th(input) {
        let has5th = false;
        if (input.includes(7)) {
            has5th = true;
        }
        return has5th;
    }

    const uniqueChordArray = [...new Set(chordArray)];

    indexArray = [...new Set(indexArray)];

    let fretArray = indexArray.sort((a, b) => a - b);

    const lowestFret = indexArray[0];
    const lowestNote = uniqueChordArray[0];

    let indexOfLowestNote = 0;

    function findIndexOfLowestOriginalNote() {
        for (let i = 0; i < chromaticArrayKey.length; i++) {
            if (chromaticArrayKey[i].slice(2) === lowestNote || chromaticArrayKey[i].slice(0, 2) === lowestNote || chromaticArrayKey[i] === lowestNote) {
                indexOfLowestNote = i;
            }
        }
    }

    findIndexOfLowestOriginalNote();

    function lowerTheRootNote() {
        let alteredIndexOfLowestNote = 0;
        if (indexOfLowestNote - lowestFret >= 0) {
            alteredIndexOfLowestNote = indexOfLowestNote - lowestFret;
        }
        return alteredIndexOfLowestNote;
    }

    const loweredRootNote = lowerTheRootNote();

    function lowerTheChordUntilA() {
        if (lowestFret > 0) {
            for (let i = 0; i < fretArray.length; i++) {
                fretArray[i] = fretArray[i] - lowestFret;
            }
        }
    }

    lowerTheChordUntilA();
    function findIndexOfRoot(alteredIndexOfLowestNote) {
        let indexOfRoot = 0;
        for (let i = 0; i < fretArray.length; i++) {
            if (alteredIndexOfLowestNote === fretArray[i]) {
                indexOfRoot = i;
            }
        }
        return indexOfRoot;
    }

    const foundIndexOfRoot = findIndexOfRoot(loweredRootNote);

    function forceRootIntoPositiveValue(indexOfRoot) {
        for (let i = 0; i < indexOfRoot; i++) {
            fretArray[i] = fretArray[i] + 12;
        }
    }

    forceRootIntoPositiveValue(foundIndexOfRoot);

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
        let allChordInfo = [];
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

            const chordHas5thOrNot = doesChordHave5th(inversionChecker);

            function findBasicValue(input, basicChords) {
                for (let i = 0; i < Object.keys(basicChords).length; i++) {
                    let counter = 0;
                    for (let j = 0; j < Object.values(basicChords)[i].intervals.length; j++) {
                        if (input.includes(Object.values(basicChords)[i].intervals[j]) && !input.includes(Object.values(basicChords)[i].restrictions[j])) {
                            counter++;

                        }
                    }
                    if (counter === Object.values(basicChords)[i].intervals.length) {
                        return (Object.keys(basicChords)[i])
                    }
                }

            }

            const foundBasicValue = findBasicValue(inversionChecker, basicChords);

            function doesChordHave7(input, foundBasicValue) {
                let has7th = false;
                if (input.includes(11) || input.includes(10) || foundBasicValue === "dim" && input.includes(9)) {
                    has7th = true;
                }
                return has7th;
            }
            const has7 = doesChordHave7(inversionChecker, foundBasicValue);

            if (has7) {
                function which7th(input, foundBasicValue) {
                    let the7th;
                    if (input.includes(9) && foundBasicValue === "dim") {
                        the7th = "full diminished 7";
                    } else
                        if (input.includes(10)) {
                            the7th = "7";
                        } else
                            if (input.includes(11)) {
                                the7th = "maj7";
                            }
                    return the7th;
                }


                const found7th = which7th(inversionChecker, foundBasicValue);

                function updateChordQualityTo7(found7th, foundBasicValue) {
                    if (foundBasicValue === "major") {
                        foundBasicValue = "";
                    }

                    foundBasicValue = foundBasicValue + found7th;
                    return foundBasicValue;
                }
                const updatedChordTo7 = updateChordQualityTo7(found7th, foundBasicValue);
                function findUpperExtensions(input) {
                    let upperExtension = "noUpperExtension";
                    if (has7) {
                        if (input.includes(9) && foundBasicValue !== "dim") {
                            upperExtension = "13";
                        } else
                            if (input.includes(5) && foundBasicValue !== "sus") {
                                upperExtension = "11";
                            } else
                                if (input.includes(2)) {
                                    upperExtension = "9";
                                }
                        return upperExtension;
                    }
                }

                const upperExtensionFound = findUpperExtensions(inversionChecker, foundBasicValue);

                function replace7WithUpperExtension(theUpperExtension, updatedChordTo7) {
                    let updatedChordToUpperExtension = updatedChordTo7;
                    if (theUpperExtension !== "noUpperExtension") {
                        updatedChordToUpperExtension = updatedChordTo7.replace("7", theUpperExtension);
                    }
                    return updatedChordToUpperExtension;
                }
                const upperExtensionReplacement = replace7WithUpperExtension(upperExtensionFound, updatedChordTo7)

                function findSpecialExtensions(input, chordName, has5th, has7, basicChord) {
                    if (has7) {
                        if (input.includes(1)) {
                            chordName = chordName + "b9";
                        }
                        if (input.includes(3) && basicChord !== "m" && basicChord !== "dim") {
                            chordName = chordName + "#9";
                        }

                        if (input.includes(6) && has5th) {
                            chordName = chordName + "#11";
                        }
                        if (input.includes(6) && !has5th && basicChord !== "dim") {
                            chordName = chordName + "b5";
                        }
                        if (input.includes(8) && !has5th && basicChord !== "aug") {
                            chordName = chordName + "#5";
                        }
                        if (input.includes(8) && has5th) {
                            chordName = chordName + "b13";
                        }
                        return chordName;
                    }
                }

                const specialExtensionsFound = findSpecialExtensions(inversionChecker, upperExtensionReplacement, chordHas5thOrNot, has7, foundBasicValue);
                allChordInfo.push({
                    rootPosition: inversionString,
                    chordQuality: specialExtensionsFound,
                    basicChordQuality: foundBasicValue
                });
                console.log(specialExtensionsFound);
            } else
                if (!has7) {
                    function findTriadExtensions(unalteredChordName, chordName, has5th, input) {
                        if (chordName === "major") {
                            chordName = "";
                        }
                        if (input.includes(3) && unalteredChordName !== "dim" && unalteredChordName !== "m") {
                            chordName = chordName + "add #9"
                        }
                        if (input.includes(5) && chordName !== "sus") {
                            chordName = chordName + "add11";
                        }
                        if (input.includes(9) && input.includes(2)) {
                            chordName = chordName + "6/9";
                        } else
                            if (input.includes(2)) {
                                chordName = chordName + "add9"
                            } else
                                if (input.includes(9)) {
                                    chordName = chordName + "6";
                                };
                        if (input.includes(6) && !has5th && unalteredChordName !== "dim") {
                            chordName = chordName + "b5"
                        };
                        if (input.includes(8) && !has5th && unalteredChordName !== "aug") {
                            chordName = chordName + "#5";
                        };
                        if (input.includes(8) && has5th) {
                            chordName = chordName + "add b6";
                        }
                        if (input.includes(1)) {
                            chordName = chordName + "add b9";
                        };

                        return chordName;
                    }
                    const triadExtensionsFound = findTriadExtensions(foundBasicValue, foundBasicValue, chordHas5thOrNot, inversionChecker);
                    console.log(triadExtensionsFound);
                    allChordInfo.push({
                        rootPosition: inversionString,
                        chordQuality: triadExtensionsFound,
                        basicChordQuality: foundBasicValue
                    }
                    )
                }
        }
        return allChordInfo
    }

    const allChordInfo = determineChordQuality();

    for (let i = 0; i < allChordInfo.length; i++) {
        let chordInfoPassThrough = allChordInfo[i];
        function saveOriginalChordQuality(determinedChordQuality) {
            let originalChordQuality = determinedChordQuality.chordQuality;
            return originalChordQuality;
        }

        const savedOriginalChordQuality = saveOriginalChordQuality(chordInfoPassThrough);

        function determineInversion(determinedChordQuality) {
            let inversionNumber;
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
                if (determinedChordQuality.rootPosition.toString() === inversionString) {
                    inversionNumber = i;
                }
                console.log(`determinedChordQuality rootPosition to String: ${determinedChordQuality.rootPosition.toString()}`);
                console.log(`inversionString: ${inversionString}`)
            }
            console.log(`inversionNumber: ${inversionNumber}`)
            return inversionNumber;
        }

        const determinedInversionNumber = determineInversion(chordInfoPassThrough);
        console.log(`Determined Inversion Number: ${determinedInversionNumber}`)

        function findRoot(inversionNumber) {
            let fromLowestUpToRoot;
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
            return fromLowestUpToRoot;
        }

        const foundRoot = findRoot(determinedInversionNumber);

        function applyInversionText(fromLowestUpToRoot, determinedChordQuality) {
            let position = "";
            chordQuality = determinedChordQuality.chordQuality;
            fromLowestUpToRoot = fromLowestUpToRoot % 12;
            console.log(`fromLowestUpToRoot: ${fromLowestUpToRoot}`)
            switch (fromLowestUpToRoot) {
                case 0:
                    position = "Root Position";
                    break;
                case 1:
                    position = "3rd Inversion (Major 7 in Bass)"
                    break;
                case 2:
                    position = "3rd Inversion (7 in Bass)";
                    break;
                case 3:
                    position = "6th Inversion (13 in Bass)";
                    break;
                case 4:
                    position = "2nd Inversion (Sharp 5 in Bass)"
                    break;
                case 5:
                    position = "2nd Inversion";
                    break;
                case 6:
                    position = "2nd Inversion (Flatted 5 in Bass)";
                    break;
                case 7:
                    position = "5th Inversion (11 in Bass)";
                    break;
                case 8:
                    position = "1st Inversion (Major 3rd in Bass)";
                    break;
                case 9:
                    position = "1st Inversion (Minor 3rd in Bass)";
                    break;
                case 10:
                    position = "4th Inversion (9 in Bass)"
                    break;
                case 11:
                    position = "4th Inversion (b9 in Bass)";
                    break;
            }
            return position;
        }
        const appliedInversionText = applyInversionText(foundRoot, chordInfoPassThrough);

        function setIndexArrayToRootPosition(determinedChordQuality) {
            indexArray = determinedChordQuality.rootPosition.split(",");
            console.log(`indexArray: ${indexArray}`)
            for (let i = 0; i < chordArray.length; i++) {
                indexArray[i] = Number(indexArray[i]);

            }
            return indexArray;
        }

        const indexSetToRootPosition = setIndexArrayToRootPosition(chordInfoPassThrough);



        function applyChordFunctions(indexArray) {
            whatThisChordCanBe = [];
            let matchScaleAndChord = 0;
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
        applyChordFunctions(indexSetToRootPosition);

        function calculateRootNumber(fromLowestUpToRoot) {
            let rootCalculation = fromLowestUpToRoot + indexOfLowestNote;
            if (rootCalculation >= 12) {
                rootCalculation = rootCalculation - 12;
            }
            console.log(`rootCalc: ${rootCalculation}`)
            return rootCalculation;
        }
        const rootNumber = calculateRootNumber(foundRoot);
        // console.log(rootNumber);

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

        function addToChordOccursIn(theRoot, originalRoot, originalChordQuality, alternateStepsAboveOriginal, determinedChordQuality) {
            chordQuality = determinedChordQuality.chordQuality;
            let chordOccursIn = ""
            chordOccursIn = `${theRoot}${chordQuality} occurs as a:
`

            return chordOccursIn;
        }
        let determinedChordOccursIn = addToChordOccursIn(rootLetter, savedOriginalRoot, savedOriginalChordQuality, 0, chordInfoPassThrough);

        //should split findRelevantKeysAndSyncChordFunctionsToNotes into more specific functions soon
        function findRelevantKeysAndSyncChordFunctionsToNotes(rootLetter, rootCalculation, determinedChordQuality) {
            let chordQuality = determinedChordQuality.chordQuality;
            let intervalForKey1;
            let intervalForKey2;
            let chosenArrayIndex;
            let romanNumeral = "";
            let majorOrMinor = "";
            let stepsToFindRelatedChord = 0;
            let chordOccursInArray = [];
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

                function makeRomanNumeralsAndKeysLookNice(determinedChordQuality) {
                    let basicChordQuality = determinedChordQuality.basicChordQuality;
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
                makeRomanNumeralsAndKeysLookNice(chordInfoPassThrough);

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
                    if (temporaryKey.length === 4) {
                        temporaryKey = temporaryKey.slice(0, 2) + "/" + temporaryKey.slice(2);
                    }

                    if (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2) {

                        chordOccursInArray.push(`${romanNumeral} chord in the key of ${temporaryKey} ${majorOrMinor}.
`);

                    }
                    chordOccursInArray.sort();

                    chromaticLoop++;
                }
            }
            return chordOccursInArray;
        }

        const determinedChordFunctions = findRelevantKeysAndSyncChordFunctionsToNotes(rootLetter, rootNumber, chordInfoPassThrough);

        function logTheChord(theRoot, determinedChordQuality, determinedChordFunctions, chordOccursIn) {
            let inversionText;
            // if (startOver === false) {
            inversionText = appliedInversionText;
            chordQuality = determinedChordQuality.chordQuality
            // } 
            // else {
            //     inversionText = appliedAltText;
            //     chordQuality = determinedChordQuality.alternateChordQuality
            // }
            if (theRoot[1] === "#" || theRoot[1] === "b") {
                theRoot = theRoot.replace(theRoot[1], theRoot[1] + "/")
            }
            chordOccursIn += determinedChordFunctions.join(" ");
            if (theRoot[0] === lowestNote || theRoot[0] + theRoot[1] === lowestNote) {
                console.log(`${theRoot}${chordQuality}`)
            } else {
                console.log(`${theRoot}${chordQuality} / ${lowestNote}`);
            }
            console.log(`Notes: ${chordArray.join(" ")}`);
            if (unalteredNoteInput !== chordArray.join(" ")) {
                console.log(`Input Notes: ${unalteredNoteInput}`)
            }
            console.log(`${theRoot}${chordQuality}
${inversionText}`)
            console.log(chordOccursIn);
        }
        logTheChord(rootLetter, chordInfoPassThrough, determinedChordFunctions, determinedChordOccursIn);
    }
}