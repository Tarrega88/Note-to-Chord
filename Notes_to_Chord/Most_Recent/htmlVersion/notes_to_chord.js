document.querySelector(".confirmNotes").addEventListener("click", function () {
let chordArray = [];

//adding notes for future refactors: inside of 5 functions
let unalteredNoteInput = [];
//inside of 3 functions
let indexArray = [];
//inside of 8 functions

let aOrAn = "";

let whatThisChordCanBe = [];

const romanNumerals = {
    majorRN: ["major-i", "skip", "major-ii", "skip", "major-iii", "major-iv", "skip", "major-v", "skip", "major-vi", "skip", "major-vii",],
    naturalMinorRN: ["minor-i", "skip", "minor-ii", "minor-iii", "skip", "minor-iv", "skip", "minor-v", "minor-vi", "skip", "minor-vii", "skip",],
    harmonicMinorRN: ["harmonic_minor-i", "skip", "harmonic_minor-ii", "harmonic_minor-iii", "skip", "harmonic_minor-iv", "skip", "harmonic_minor-v", "harmonic_minor-vi", "skip", "skip", "harmonic_minor-vii",],
    melodicMinorRN: ["melodic_minor-i", "skip", "melodic_minor-ii", "melodic_minor-iii", "skip", "melodic_minor-iv", "skip", "melodic_minor-v", "skip", "melodic_minor-vi", "skip", "melodic_minor-vii",],
    harmonicMajorRN: ["harmonic_major-i", "skip", "harmonic_major-ii", "skip", "harmonic_major-iii", "harmonic_major-iv", "skip", "harmonic_major-v", "harmonic_major-vi", "skip", "skip", "harmonic_major-vii",],
};

const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip",];
const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip",];

const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab",];

const basicChords = {
    dim: {
        intervals: [0, 3, 6],
        restrictions: [4, 7, 8],
    },

    aug: {
        intervals: [0, 4, 8],
        restrictions: [3, 7],
    },
    major: {
        intervals: [0, 4],
        restrictions: ["skip"],
    },
    m: {
        intervals: [0, 3],
        restrictions: [4],
    },

    sus: {
        intervals: [0, 5, 7],
        restrictions: [3, 4],
    },
};

const restrictedChords = {//Restriction logic is more general now, but I'm keeping this here for a while until I'm certain there are no extra strange ones that need to be thrown out of the display possibilities.
    //This restriction logic requires the basicChord from above and then an array including the string of the exact chord type to be ignored on that basicChord type.
    // dim: ,
    // m: ["m6add11", "madd b6", "madd11#5","madd11add b6", "m7b5#5", "m6add11#5add b9"],
    // major: ["6add11", "6/9b5", "6b5", "maj7#9b5#5", "6add11add b9",],
    // sus: ["susadd9"],
};

let chordPriorityObject = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
};

// let firstPrompt = prompt("Enter 1 for Note Input or 2 for Guitar Fret Input", "");

// function guitarInput() {
//     let guitarNotes = [];
//     let guitarArray = [];
//     guitarNotes.length = 6;
//     for (let i = 6; i > 0; i--) {
//         let guitarPrompt = prompt(`List the fret on the ${i} string.
// Type anything besides a number to ignore that string.`, "");
//         if (!isNaN(guitarPrompt)) {
//             guitarPrompt = Number(guitarPrompt) % 12;
//             guitarArray.push(guitarPrompt);
//         } else {
//             guitarArray.push("notAFret");
//         }
//     }

//     let guitarString1 = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#",];
//     let guitarString2 = ["b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#",];
//     let guitarString3 = ["g", "g#", "a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#",];
//     let guitarString4 = ["d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#",];
//     let guitarString5 = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#",];
//     let guitarString6 = ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#",];

//     let input1 = guitarString1.at(guitarArray[5]);
//     let input2 = guitarString2.at(guitarArray[4]);
//     let input3 = guitarString3.at(guitarArray[3]);
//     let input4 = guitarString4.at(guitarArray[2]);
//     let input5 = guitarString5.at(guitarArray[1]);
//     let input6 = guitarString6.at(guitarArray[0]);

//     if (input6.toLowerCase().charCodeAt() >= 97 && input6.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[0] = input6;
//     }
//     if (input5.toLowerCase().charCodeAt() >= 97 && input5.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[1] = input5;
//     }
//     if (input4.toLowerCase().charCodeAt() >= 97 && input4.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[2] = input4;
//     }
//     if (input3.toLowerCase().charCodeAt() >= 97 && input3.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[3] = input3;
//     }
//     if (input2.toLowerCase().charCodeAt() >= 97 && input2.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[4] = input2;
//     }
//     if (input1.toLowerCase().charCodeAt() >= 97 && input1.toLowerCase().charCodeAt() <= 103) {
//         guitarNotes[5] = input1;
//     }
//     whatAreTheGuitarNotes(guitarNotes, guitarArray);
// }

function determineScalesToPush() {

    const rootScalesToPush = {
        "major-": [0, 2, 4, 5, 7, 9, 11],
        "minor-": [0, 2, 3, 5, 7, 8, 10],
        "harmonic_minor-": [0, 2, 3, 5, 7, 8, 11],
        "melodic_minor-": [0, 2, 3, 5, 7, 9, 11],
        "harmonic_major-": [0, 2, 4, 5, 7, 8, 11],
    }
    return rootScalesToPush
}

const rootScalesToPush = determineScalesToPush();

function convertRootScalesToAllModes(rootScalesToPush) {

    const scalesToPush = rootScalesToPush;

    let scales = {

    }

    for (let i = 0; i < Object.keys(scalesToPush).length; i++) {
        let scaleToTweak = Object.values(scalesToPush)[i];
        for (let j = 0; j < Object.values(scalesToPush)[i].length; j++) {
            let romanNumeral = "";
            switch (j) {
                case 0: romanNumeral = "i";
                    break;
                case 1: romanNumeral = "ii";
                    break;
                case 2: romanNumeral = "iii";
                    break;
                case 3: romanNumeral = "iv";
                    break;
                case 4: romanNumeral = "v";
                    break;
                case 5: romanNumeral = "vi";
                    break;
                case 6: romanNumeral = "vii";
                    break;
            }

            scales[Object.keys(scalesToPush)[i] + romanNumeral] = scaleToTweak
            let removalAmount = scaleToTweak[1];

            scaleToTweak = scaleToTweak.map(e => e - removalAmount);
            scaleToTweak[0] = scaleToTweak[0] += 12;
            scaleToTweak.sort((a, b) => a - b);
        }
    }
    return scales;
}

const scales = convertRootScalesToAllModes(rootScalesToPush);
        // let noteNumber = prompt("How many notes does the chord have?", "");
    function whatAreTheNotes() {
        let chordNotes = {};
                chordNotes = {
                    7: document.querySelector("#input7").value,
                    6: document.querySelector("#input6").value,
                    5: document.querySelector("#input5").value,
                    4: document.querySelector("#input4").value,
                    3: document.querySelector("#input3").value,
                    2: document.querySelector("#input2").value,
                    1: document.querySelector("#input1").value,
                }

        for (let i = 0; i < Object.keys(chordNotes).length; i++) {
            // let chordNotes = prompt(`What's note number ${i + 1}?`);
            if (Object.values(chordNotes)[i].length > 0) {
            Object.values(chordNotes)[i] = Object.values(chordNotes)[i][0].toUpperCase() + Object.values(chordNotes)[i].slice(1, Object.values(chordNotes)[i].length);
            unalteredNoteInput.push(Object.values(chordNotes)[i]);
            for (let j = 0; j < chromaticArrayKey.length; j++) {
                if (chromaticArrayKey[j].slice(2) === Object.values(chordNotes)[i] || chromaticArrayKey[j].slice(0, 2) === Object.values(chordNotes)[i] || chromaticArrayKey[j] === Object.values(chordNotes)[i]) {
                    if (!chordArray.includes(Object.values(chordNotes)[i])) {
                        chordArray.push(Object.values(chordNotes)[i]);
                        indexArray.push(j);
                    }
                }
                if (enharmonicEquivalentsHigher[j].slice(1) === Object.values(chordNotes)[i] || enharmonicEquivalentsLower[j].slice(1) === Object.values(chordNotes)[i]) {
                    chordArray.push(chromaticArrayKey[j][0]);
                    indexArray.push(j);
                }
            }
        }
    }
        unalteredNoteInput = unalteredNoteInput.join(" ");
        runAfterInput();
}

whatAreTheNotes();

// function whatAreTheGuitarNotes(guitarNotes, guitarArray) {
//     for (let i = 0; i < guitarNotes.length; i++) {
//         let chordNotes = guitarNotes[i];
//         if (typeof guitarArray[i] === "number") {
//             chordNotes = chordNotes[0].toUpperCase() + chordNotes.slice(1, chordNotes.length);
//             unalteredNoteInput.push(chordNotes[i]);
//             for (let j = 0; j < chromaticArrayKey.length; j++) {
//                 if (chromaticArrayKey[j].slice(2) === chordNotes || chromaticArrayKey[j].slice(0, 2) === chordNotes || chromaticArrayKey[j] === chordNotes) {
//                     if (!chordArray.includes(chordNotes)) {
//                         chordArray.push(chordNotes);
//                         indexArray.push(j);
//                     }
//                 }
//                 if (enharmonicEquivalentsHigher[j].slice(1) === chordNotes || enharmonicEquivalentsLower[j].slice(1) === chordNotes) {
//                     chordArray.push(chromaticArrayKey[j][0]);

//                     indexArray.push(j);
//                 }
//             }
//         }
//     }
//     unalteredNoteInput = unalteredNoteInput.join(",").replace(/,/g, " ").trim();
//     runAfterInput();
// }

// if (firstPrompt === "1") {
//     whatAreTheNotes();
// } else {
//     guitarInput();
// }

function runAfterInput() {

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
        // console.log(indexArray);
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

            function doesChordHave5th(input) {
                let has5th = false;
                if (input.includes(7)) {
                    has5th = true;
                }
                return has5th;
            }

            const hasPerfect5th = doesChordHave5th(inversionChecker);

            function doesChordHaveFlat5(input, has5th) {
                let hasb5 = false;
                if (input.includes(6) && !has5th && (!input.includes(10) || !input.includes(11))) {
                    hasb5 = true;
                }
                return hasb5;
            }
            const hasFlat5th = doesChordHaveFlat5(inversionChecker, hasPerfect5th);

            function doesChordHaveSharp5(input, has5th) {
                let hasSharp5 = false;
                if (input.includes(8) && !has5th && (!input.includes(10) || !input.includes(11))) {
                    hasSharp5 = true;
                }
                return hasSharp5;
            }
            const hasSharp5th = doesChordHaveSharp5(inversionChecker, hasPerfect5th);

            function findBasicValue(input, basicChords) {
                for (let i = 0; i < Object.keys(basicChords).length; i++) {
                    const containsAll = Object.values(basicChords)[i].intervals.every((e) => {
                        return input.includes(e);
                    }
                    );
                    const doesNotContainRestrictions = Object.values(basicChords)[i].restrictions.every((e) => {
                        return !input.includes(e);
                    }
                    );
                    if (containsAll && doesNotContainRestrictions) {
                        return Object.keys(basicChords)[i];
                    }
                }
            }

            const foundBasicValue = findBasicValue(inversionChecker, basicChords);
            function doesChordHave3rd(input, foundBasicValue) {
                let has3rd = false;
                if (input.includes(3) || input.includes(4) || foundBasicValue === "sus") {
                    has3rd = true;
                }
                return has3rd;
            }
            const has3rd = doesChordHave3rd(inversionChecker, foundBasicValue);

            function doesChordHave7(input, foundBasicValue) {
                let has7th = false;
                if (input.includes(11) || input.includes(10) || (foundBasicValue === "dim" && input.includes(9))) {
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
                    } else if (input.includes(10)) {
                        the7th = "7";
                    } else if (input.includes(11)) {
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
                        } else if (input.includes(5) && foundBasicValue !== "sus") {
                            upperExtension = "11";
                        } else if (input.includes(2)) {
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
                const upperExtensionReplacement = replace7WithUpperExtension(upperExtensionFound, updatedChordTo7);

                let extraExtensionsCounter = 0;
                function findSpecialExtensions(input, chordName, has5th, has7, basicChord) {
                    if (has7) {
                        if (input.includes(1)) {
                            chordName = chordName + "b9";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(3) && basicChord !== "m" && basicChord !== "dim") {
                            chordName = chordName + "#9";
                            extraExtensionsCounter++;
                        }

                        if (input.includes(6) && has5th) {
                            chordName = chordName + "#11";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(6) && !has5th && basicChord !== "dim") {
                            chordName = chordName + "b5";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(8) && !has5th && basicChord !== "aug") {
                            chordName = chordName + "#5";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(8) && has5th) {
                            chordName = chordName + "b13";
                            extraExtensionsCounter++;
                        }
                        return chordName;
                    }
                }

                const specialExtensionsFound = findSpecialExtensions(inversionChecker, upperExtensionReplacement, hasPerfect5th, has7, foundBasicValue);
                allChordInfo.push({
                    rootPosition: inversionString,
                    chordQuality: specialExtensionsFound,
                    basicChordQuality: foundBasicValue,
                    numberOfExtraExtensions: extraExtensionsCounter,
                });
                console.log(allChordInfo)
            } else if (!has7) {
                let extraExtensionsCounter = 0;
                function findTriadExtensions(unalteredChordName, chordName, has5th, input) {
                    if (chordName === "major") {
                        chordName = "";
                    }
                    if (input.length > 3 || (has3rd && (has5th || hasFlat5th || hasSharp5th))) {
                        if (input.includes(9) && input.includes(2)) {
                            chordName = chordName + "6/9";
                            extraExtensionsCounter++;
                        } else if (input.includes(2)) {
                            chordName = chordName + "add9";
                            extraExtensionsCounter++;
                        } else if (input.includes(9)) {
                            chordName = chordName + "6";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(3) && unalteredChordName !== "dim" && unalteredChordName !== "m") {
                            chordName = chordName + "add #9";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(5) && unalteredChordName !== "sus") {
                            chordName = chordName + "add11";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(6) && !has5th && unalteredChordName !== "dim") {
                            chordName = chordName + "b5";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(8) && !has5th && unalteredChordName !== "aug") {
                            chordName = chordName + "#5";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(8) && has5th) {
                            chordName = chordName + "add b6";
                            extraExtensionsCounter++;
                        }
                        if (input.includes(1)) {
                            chordName = chordName + "add b9";
                            extraExtensionsCounter++;
                        }
                        return chordName;
                    }
                }
                const triadExtensionsFound = findTriadExtensions(foundBasicValue, foundBasicValue, hasPerfect5th, inversionChecker);
                allChordInfo.push({
                    rootPosition: inversionString,
                    chordQuality: triadExtensionsFound,
                    basicChordQuality: foundBasicValue,
                    numberOfExtraExtensions: extraExtensionsCounter,
                });
                console.log(allChordInfo)
            }
        }

        return allChordInfo;
    }

    const allChordInfo = determineChordQuality();
    for (let i = 0; i < allChordInfo.length; i++) {
        if (Object.values(allChordInfo)[i].basicChordQuality !== undefined) {
            let chordInfoPassThrough = allChordInfo[i];
            function saveOriginalChordQuality(determinedChordQuality) {
                let originalChordQuality = determinedChordQuality.chordQuality;
                return originalChordQuality;
            }

            const savedOriginalChordQuality = saveOriginalChordQuality(chordInfoPassThrough);

            function determineInversion() {
                let inversionNumberArray = [];
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
                    // fretArray = inversionChecker;

                    inversionString = inversionChecker.toString();
                    inversionNumberArray.push(i);
                }
                return inversionNumberArray;
            }

            const determinedInversionNumberArray = determineInversion(chordInfoPassThrough);

            let determinedInversionNumber = determinedInversionNumberArray[i];
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
                switch (fromLowestUpToRoot) {
                    case 0:
                        position = "Root Position";
                        break;
                    case 1:
                        position = "3rd Inversion (Major 7 in Bass)";
                        break;
                    case 2:
                        position = "3rd Inversion (7 in Bass)";
                        break;
                    case 3:
                        position = "6th Inversion (13 in Bass)";
                        break;
                    case 4:
                        position = "2nd Inversion (Sharp 5 in Bass)";
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
                        position = "4th Inversion (9 in Bass)";
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
                // console.log(fromLowestUpToRoot);
                let rootCalculation = fromLowestUpToRoot + indexOfLowestNote;
                if (rootCalculation >= 12) {
                    rootCalculation = rootCalculation - 12;
                }
                return rootCalculation;
            }
            const rootNumber = calculateRootNumber(foundRoot);

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

            function addToChordOccursIn(theRoot, determinedChordQuality) {
                chordQuality = determinedChordQuality.chordQuality;
                let chordOccursIn = "";
                chordOccursIn = `
${theRoot}${chordQuality} occurs as a:`;

                return chordOccursIn;
            }
            let determinedChordOccursIn = addToChordOccursIn(rootLetter, chordInfoPassThrough);

            //should split findRelevantKeysAndSyncChordFunctionsToNotes into more specific functions soon
            function findRelevantKeysAndSyncChordFunctionsToNotes(rootCalculation) {
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

                    romanNumeral = whatThisChordCanBe[q].slice(whatThisChordCanBe[q].indexOf("-") + 1);
                    majorOrMinor = whatThisChordCanBe[q].slice(0, whatThisChordCanBe[q].indexOf("-"));

                    for (let i = 0; i < Object.keys(romanNumerals).length; i++) {
                        if (Object.values(romanNumerals)[i].includes(whatThisChordCanBe[q])) {
                            chosenArrayIndex = Object.values(romanNumerals)[i].indexOf(whatThisChordCanBe[q]);
                        }
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

                        // if (chordQuality[0].toLowerCase() === "a" || chordQuality[0].toLowerCase() === "e" || chordQuality[0].toLowerCase() === "i" || chordQuality[0].toLowerCase() === "o" || chordQuality[0].toLowerCase() === "u") {
                        //     aOrAn = "an";
                        // } else {
                        //     aOrAn = "a";
                        // }

                        let temporaryKey = chromaticArrayKey[chromaticLoop];
                        let findRelatedChordNumber = chromaticLoop + stepsToFindRelatedChord;
                        if (findRelatedChordNumber > 11) {
                            findRelatedChordNumber = findRelatedChordNumber - 12;
                        }
                        if (temporaryKey.length === 4) {
                            temporaryKey = temporaryKey.slice(0, 2) + "/" + temporaryKey.slice(2);
                        }

                        if (i === rootCalculation + intervalForKey1 || i === rootCalculation + intervalForKey2) {
                            chordOccursInArray.push(`
${romanNumeral} chord in the key of ${temporaryKey} ${majorOrMinor}.`);
                        }
                        chordOccursInArray.sort();

                        chromaticLoop++;
                    }
                }
                return chordOccursInArray;
            }

            const determinedChordFunctions = findRelevantKeysAndSyncChordFunctionsToNotes(rootNumber);

            function determineValidChord(chordInfo) {
                let valid = true;
                for (let i = 0; i < Object.keys(restrictedChords).length; i++) {
                    if (chordInfo.basicChordQuality === Object.keys(restrictedChords)[i]) {
                        for (let j = 0; j < Object.values(restrictedChords)[i].length; j++) {
                            if (chordInfo.chordQuality === Object.values(restrictedChords)[i][j]) {
                                valid = false;
                            }
                        }
                    }
                }
                return valid;
            }
            const determinedChordValidity = determineValidChord(chordInfoPassThrough);

            function determineNumberOfExtraExtensions(chordInfo) {
                return chordInfo.numberOfExtraExtensions;
            }
            const chordExtraExtensionNumber = determineNumberOfExtraExtensions(chordInfoPassThrough);

            //This function is currently unused but its purpose would be to restrict the display of chords down to only those with less than a number of extra extensions.  May make this a checkbox option for displaying only simple chords.
            function determineIfChordHasCommonName(chordInfo) {// let valid = true;
                // if (chordInfo.numberOfExtraExtensions > 1) {
                //     valid = false;
                // }
            }
            const chordHasCommonName = determineIfChordHasCommonName(chordInfoPassThrough);

            function logTheChord(theRoot, determinedChordQuality, determinedChordFunctions, chordOccursIn, chordInfo) {
                let inversionText;
                let log = "";
                if (chordInfo.numberOfExtraExtensions === 2) {
                    log += `
The following may be an uncommon naming convention.

`;
                }
                if (chordInfo.numberOfExtraExtensions > 2) {
                    log += `
This naming convention is extremely uncommon - better to call it something else.

`;
                }
                inversionText = appliedInversionText;
                chordQuality = determinedChordQuality.chordQuality;

                if (theRoot[1] === "#" || theRoot[1] === "b") {
                    theRoot = theRoot.replace(theRoot[1], theRoot[1] + "/");
                }
                chordOccursIn += `
${determinedChordFunctions.join(" ")}`;
                if (theRoot[0] === lowestNote || theRoot[0] + theRoot[1] === lowestNote) {
                    log += `${theRoot}${chordQuality}`;
                } else {
                    log += `${theRoot}${chordQuality} / ${lowestNote}`;
                }
                log += `
Notes: ${chordArray.join(" ")}`;
                if (unalteredNoteInput !== chordArray.join(" ")) {
                    log += `Input Notes: ${unalteredNoteInput}`;
                }
                log += `
${inversionText}`;
                log += `${chordOccursIn}`;
                return log;
            }
            if (determinedChordValidity) {
                const loggedChord = logTheChord(rootLetter, chordInfoPassThrough, determinedChordFunctions, determinedChordOccursIn, chordInfoPassThrough);
                function fillTheChordObject(chordExtraExtensionNumber) {
                    chordPriorityObject[chordExtraExtensionNumber].push(loggedChord);
                }
                fillTheChordObject(chordExtraExtensionNumber);
            }
        }
    }
    for (const [key, value] of Object.entries(chordPriorityObject)) {
        if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                console.log(`${value[i]}`);
            }
        }
    }
    document.querySelector(".chordOutput").textContent = Object.values(chordPriorityObject);
}
});



