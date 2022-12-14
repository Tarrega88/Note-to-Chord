function runMain() {
    let chordArray = [];
    let unalteredNoteInput = [];
    let indexArray = [];
    let whatThisChordCanBe = [];

    const guitarStrings = {
        1: ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#",],
        2: ["b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#",],
        3: ["g", "g#", "a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#",],
        4: ["d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#",],
        5: ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#",],
        6: ["e", "f", "f#", "g", "g#", "a", "a#", "b", "c", "c#", "d", "d#",],
        7: ["b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#",],
    }

    const enharmonicEquivalentsHigher = ["ABbb", "skip", "BCb", "CDbb", "skip", "DEbb", "skip", "EFb", "FGbb", "skip", "GAbb", "skip",];
    const enharmonicEquivalentsLower = ["AGx", "skip", "BAx", "CB#", "skip", "DCx", "skip", "EDx", "FE#", "skip", "GFx", "skip",];

    const chromaticArrayKey = ["A", "A#Bb", "B", "C", "C#Db", "D", "D#Eb", "E", "F", "F#Gb", "G", "G#Ab",];

    const basicChords = {
        dim: {
            intervals: [0, 3, 6],
            restrictions: [2, 4, 5, 7, 8, 11],
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
            intervals: [0, 5],
            restrictions: [3, 4],
        },
        " Power Chord": {
            intervals: [0, 7],
            restrictions: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
        },
        " Tritone": {
            intervals: [0, 6],
            restrictions: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11],
        },
    };

    let chordPriorityObject = {
        0: { Root: [], Position: [], ChordFunction: [], },
        1: { Root: [], Position: [], ChordFunction: [], },
        2: { Root: [], Position: [], ChordFunction: [], },
        3: { Root: [], Position: [], ChordFunction: [], },
        4: { Root: [], Position: [], ChordFunction: [], },
        5: { Root: [], Position: [], ChordFunction: [], },
        6: { Root: [], Position: [], ChordFunction: [], },
        7: { Root: [], Position: [], ChordFunction: [], },
    };
    function emptyDisplay() {
        for (let i = 1; i <= 7; i++) {
            document.querySelector(`#root` + i).textContent = "";
            document.querySelector(`#position` + i).textContent = "";
            document.querySelector(`#chordFunction` + i).textContent = "";
            document.querySelector('#note' + i).textContent = "";
        }
    }

    emptyDisplay();
    function guitarInput(guitarStrings) {
        let guitarNotes = [];
        let guitarArray = [];
        guitarNotes.length = 7;

        let chordNotes = {
            7: document.querySelector("#input7").value.replace(/ /g, ""),
            6: document.querySelector("#input6").value.replace(/ /g, ""),
            5: document.querySelector("#input5").value.replace(/ /g, ""),
            4: document.querySelector("#input4").value.replace(/ /g, ""),
            3: document.querySelector("#input3").value.replace(/ /g, ""),
            2: document.querySelector("#input2").value.replace(/ /g, ""),
            1: document.querySelector("#input1").value.replace(/ /g, ""),
        };

        const chordNoteValue = Object.values(chordNotes);

        for (let i = 0; i < 7; i++) {
            let guitarNote = "x";
            if (chordNoteValue[i].length > 0) {
                guitarNote = chordNoteValue[i]
            };
            if (!isNaN(guitarNote)) {
                guitarNote = Number(guitarNote) % 12;
                guitarArray.push(guitarNote);
            } else {
                guitarArray.push("notAFret");
            }
        }

        let input1 = guitarStrings[1].at(guitarArray[6]);
        let input2 = guitarStrings[2].at(guitarArray[5]);
        let input3 = guitarStrings[3].at(guitarArray[4]);
        let input4 = guitarStrings[4].at(guitarArray[3]);
        let input5 = guitarStrings[5].at(guitarArray[2]);
        let input6 = guitarStrings[6].at(guitarArray[1]);
        let input7 = guitarStrings[7].at(guitarArray[0]);

        if (input7.length > 0 && input7.toLowerCase().charCodeAt() >= 97 && input7.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[0] = input7;
        }
        if (input6.toLowerCase().charCodeAt() >= 97 && input6.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[1] = input6;
        }
        if (input5.toLowerCase().charCodeAt() >= 97 && input5.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[2] = input5;
        }
        if (input4.toLowerCase().charCodeAt() >= 97 && input4.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[3] = input4;
        }
        if (input3.toLowerCase().charCodeAt() >= 97 && input3.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[4] = input3;
        }
        if (input2.toLowerCase().charCodeAt() >= 97 && input2.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[5] = input2;
        }
        if (input1.length > 0 && input1.toLowerCase().charCodeAt() >= 97 && input1.toLowerCase().charCodeAt() <= 103) {
            guitarNotes[6] = input1;
        }
        whatAreTheGuitarNotes(guitarNotes, guitarArray);
    }
    if (guitarChecked) {
        guitarInput(guitarStrings);
    }
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

    function fillRomanNumerals(rootScalesToPush) {
        let romanNumerals = {};
        let array = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
        const keysOfRootScales = Object.keys(rootScalesToPush);
        const valuesOfRootScales = Object.values(rootScalesToPush);
        for (let i = 0; i < keysOfRootScales.length; i++) {
            let counter = 0;
            romanNumerals[keysOfRootScales[i]] = [];
            romanNumerals[keysOfRootScales[i]].length = 12;
            for (let j = 0; j < valuesOfRootScales[i].length; j++) {
                romanNumerals[keysOfRootScales[i]][(valuesOfRootScales[i][j])] = keysOfRootScales[i];
                if (romanNumerals[keysOfRootScales[i]][(valuesOfRootScales[i][j])]) {
                    romanNumerals[keysOfRootScales[i]][(valuesOfRootScales[i][j])] += array[counter];
                    counter++;
                }
            }
        }
        return romanNumerals;
    }
    const romanNumerals = fillRomanNumerals(rootScalesToPush);

    function convertRootScalesToAllModes(scalesToPush) {

        let scales = {}

        for (let i = 0; i < Object.keys(scalesToPush).length; i++) {
            let scaleToTweak = Object.values(scalesToPush)[i];
            for (let j = 0; j < scaleToTweak.length; j++) {
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

    function whatAreTheNotes() {

        let chordNotes = {
            7: document.querySelector("#input7").value.replace(/ /g, ""),
            6: document.querySelector("#input6").value.replace(/ /g, ""),
            5: document.querySelector("#input5").value.replace(/ /g, ""),
            4: document.querySelector("#input4").value.replace(/ /g, ""),
            3: document.querySelector("#input3").value.replace(/ /g, ""),
            2: document.querySelector("#input2").value.replace(/ /g, ""),
            1: document.querySelector("#input1").value.replace(/ /g, ""),
        };

        const chordNoteValue = Object.values(chordNotes);

        for (let i = 0; i < 7; i++) {
            let chordNote = "";
            if (chordNoteValue[i].length > 0) {
                chordNote = chordNoteValue[i][0].toUpperCase() + chordNoteValue[i].slice(1, chordNoteValue[i].length);

                // let chordNotes = prompt(`What's note number ${i + 1}?`);
                chordNote = chordNote[0].toUpperCase() + chordNote.slice(1, chordNote.length);
                unalteredNoteInput.push(chordNote);
                for (let j = 0; j < chromaticArrayKey.length; j++) {
                    if (chromaticArrayKey[j].slice(2) === chordNote || chromaticArrayKey[j].slice(0, 2) === chordNote || chromaticArrayKey[j] === chordNote) {
                        if (!chordArray.includes(chordNote)) {
                            chordArray.push(chordNote);
                            indexArray.push(j);
                        }
                    }
                    if (enharmonicEquivalentsHigher[j].slice(1) === chordNote || enharmonicEquivalentsLower[j].slice(1) === chordNote) {
                        chordArray.push(chromaticArrayKey[j][0]);
                        indexArray.push(j);
                    }
                }
            }
        }
        unalteredNoteInput = unalteredNoteInput.join(" ");
    }
    if (!guitarChecked) {
        whatAreTheNotes();
    };
    function whatAreTheGuitarNotes(guitarNotes, guitarArray) {
        for (let i = 0; i < guitarNotes.length; i++) {
            const guitarInput = document.querySelector("#input" + (i + 1));
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
            if (guitarInput.value.length > 0 && Number(guitarInput.value) >= 0 && Number(guitarInput.value) <= 24) {
                document.querySelector('#note' + (i + 1)).textContent = + guitarInput.value + ": " + chordNotes;
            }

        }
        unalteredNoteInput = unalteredNoteInput.join(",").replace(/,/g, " ").trim();

    }

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
                    fretArray[i] -= lowestFret;
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
                            if (input.includes(5) && basicChord === "sus") {
                                extraExtensionsCounter++;
                            }
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
                        uncommonCounter: extraExtensionsCounter,
                    });
                } else if (!has7) {
                    let extraExtensionsCounter = 0;
                    function findTriadExtensions(unalteredChordName, chordName, has5th, input) {
                        if (chordName === "major") {
                            chordName = "";
                        }
                        if (input.length >= 3 && has3rd || unalteredChordName === "dim" || unalteredChordName === "aug") {
                            if (!has5th && !hasFlat5th && !hasSharp5th) {
                                extraExtensionsCounter++;
                            }
                            if (input.includes(9) && input.includes(2)) {
                                chordName = chordName + "6/9";
                            } else if (input.includes(2)) {
                                chordName = chordName + "add9";
                                extraExtensionsCounter++;
                            } else if (input.includes(9)) {
                                chordName = chordName + "6";
                            }
                            if (input.includes(5) && unalteredChordName === "sus") {
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
                            if (input.includes(6)) {
                                if (!has5th && unalteredChordName !== "dim") {
                                    chordName = chordName + "b5";
                                    extraExtensionsCounter++;
                                } else
                                    if (has5th && unalteredChordName !== "dim") {
                                        chordName = chordName + "add#11";
                                        extraExtensionsCounter++;
                                    }
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

                        } else
                            if (chordName === " Power Chord" || chordName == " Tritone") {
                                return chordName;
                            } else
                                return;

                    }
                    const triadExtensionsFound = findTriadExtensions(foundBasicValue, foundBasicValue, hasPerfect5th, inversionChecker);
                    allChordInfo.push({
                        rootPosition: inversionString,
                        chordQuality: triadExtensionsFound,
                        basicChordQuality: foundBasicValue,
                        uncommonCounter: extraExtensionsCounter,
                    });
                }
            }

            return allChordInfo;
        }

        const allChordInfo = determineChordQuality();
        for (let i = 0; i < allChordInfo.length; i++) {
            if (Object.values(allChordInfo)[i].basicChordQuality !== undefined) {
                let chordInfoPassThrough = allChordInfo[i];

                function determineInversion() {
                    let inversionNumberArray = [];
                    for (let i = 0; i < indexArray.length; i++) {
                        let inversionChecker = Array.from(indexArray);
                        let valueToRemove = inversionChecker[i];
                        for (let j = 0; j < indexArray.length; j++) {
                            inversionChecker[j] -= valueToRemove;
                            if (inversionChecker[j] < 0) {
                                inversionChecker[j] += 12;
                            }
                        }
                        inversionChecker = inversionChecker.sort((a, b) => a - b);

                        inversionString = inversionChecker.toString();
                        inversionNumberArray.push(i);
                    }
                    return inversionNumberArray;
                }

                const determinedInversionNumberArray = determineInversion(chordInfoPassThrough);

                let determinedInversionNumber = determinedInversionNumberArray[i];
                function findRoot(inversionNumber) {
                    let fromLowestUpToRoot = fretArray[inversionNumber];
                    return fromLowestUpToRoot;
                }

                const foundRoot = findRoot(determinedInversionNumber);

                function applyInversionText(fromLowestUpToRoot, chordInfo) {
                    let position = "";
                    fromLowestUpToRoot %= 12;
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
                            chordInfo.uncommonCounter++;
                            break;
                        case 4:
                            position = "2nd Inversion (Sharp 5 in Bass)";
                            chordInfo.uncommonCounter++;
                            break;
                        case 5:
                            position = "2nd Inversion (5th in Bass)";
                            break;
                        case 6:
                            position = "2nd Inversion (Flat 5 in Bass)";
                            chordInfo.uncommonCounter++;
                            break;
                        case 7:
                            position = "5th Inversion (11 in Bass)";
                            chordInfo.uncommonCounter++;
                            break;
                        case 8:
                            position = "1st Inversion (Major 3rd in Bass)";
                            break;
                        case 9:
                            position = "1st Inversion (Minor 3rd in Bass)";
                            break;
                        case 10:
                            position = "4th Inversion (9 in Bass)";
                            chordInfo.uncommonCounter++;
                            break;
                        case 11:
                            position = "4th Inversion (b9 in Bass)";
                            chordInfo.uncommonCounter++;
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
                    let rootCalculation = fromLowestUpToRoot + indexOfLowestNote;
                    if (rootCalculation >= 12) {
                        rootCalculation -= 12;
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

                saveOriginalRoot(rootLetter);

                //should split findRelevantKeysAndSyncChordFunctionsToNotes into more specific functions soon
                function findRelevantKeysAndSyncChordFunctionsToNotes(rootCalculation) {
                    let intervalForKey1;
                    let intervalForKey2;
                    let chosenArrayIndex;
                    let majorOrMinor = "";
                    let stepsToFindRelatedChord = 0;
                    let chordOccursInArray = [];
                    for (let q = 0; q < whatThisChordCanBe.length; q++) {
                        let chromaticLoop = 0;
                        let romanNumeral = "";

                        romanNumeral = whatThisChordCanBe[q].slice(whatThisChordCanBe[q].indexOf("-") + 1);
                        majorOrMinor = whatThisChordCanBe[q].slice(0, whatThisChordCanBe[q].indexOf("-"));

                        for (let i = 0; i < Object.keys(romanNumerals).length; i++) {
                            if (Object.values(romanNumerals)[i].includes(whatThisChordCanBe[q])) {
                                chosenArrayIndex = Object.values(romanNumerals)[i].indexOf(whatThisChordCanBe[q]);
                            }
                        }

                        function makeRomanNumeralsAndKeysLookNice(determinedChordQuality) {
                            let basicChordQuality = determinedChordQuality.basicChordQuality;
                            if (basicChordQuality === "major" || basicChordQuality === " Power Chord" || basicChordQuality === " Tritone" || basicChordQuality === "sus") {
                                romanNumeral = romanNumeral.toUpperCase();
                            }
                            if (basicChordQuality === "m") {
                                romanNumeral = romanNumeral.toLowerCase();
                            }
                            if (basicChordQuality === "dim") {
                                romanNumeral = `Diminished ` + romanNumeral.toLowerCase();
                            }
                            if (basicChordQuality === "aug") {
                                romanNumeral = `Augmented ` + romanNumeral.toUpperCase();
                            }
                            if (majorOrMinor.includes("_")) {
                                majorOrMinor = majorOrMinor.replace("_", " ");
                            }
                        }
                        makeRomanNumeralsAndKeysLookNice(chordInfoPassThrough);

                        intervalForKey1 = rootCalculation - chosenArrayIndex;

                        if (rootCalculation >= 6) {
                            intervalForKey1 -= 12;
                        }

                        intervalForKey2 = intervalForKey1 + 12;
                        //Logic for determining which keys this chord occurs in.
                        for (let i = rootCalculation; chromaticLoop < 12; i++) {
                            if (i >= 12) {
                                i = 0;
                            }

                            let temporaryKey = chromaticArrayKey[chromaticLoop];
                            let findRelatedChordNumber = chromaticLoop + stepsToFindRelatedChord;
                            if (findRelatedChordNumber >= 12) {
                                findRelatedChordNumber -= 12;
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

                const determinedChordFunctions = findRelevantKeysAndSyncChordFunctionsToNotes(rootNumber, romanNumerals);

                function determineuncommonCounter(chordInfo) {
                    return chordInfo.uncommonCounter;
                }
                const chordExtraExtensionNumber = determineuncommonCounter(chordInfoPassThrough);
                function determineIfChordHasCommonName(chordInfo, allChordInfo) {
                    let valid = true// let valid = true;
                    if (!checked) {
                        if (chordInfo.uncommonCounter > 1 && allChordInfo.length > 1) {
                            valid = false;
                        }
                    }
                    return valid;
                }
                const determinedChordValidity = determineIfChordHasCommonName(chordInfoPassThrough, allChordInfo);

                function fixChordQuality(chordInfo) {
                    let chordQuality = chordInfo.chordQuality;
                    if (chordInfo.chordQuality) {
                        if (chordQuality.includes("sus")) {
                            chordQuality = chordQuality.replace("sus", "") + " sus";
                        }
                        if (chordQuality.includes("dimfull")) {
                            chordQuality = chordQuality.replace("dimfull", " full")
                        }
                        if (chordQuality.includes("dim7")) {
                            chordQuality = chordQuality.replace("dim7", " half diminished 7");
                        }
                        if (chordQuality.includes("add")) {
                            chordQuality = chordQuality.replace("add", " add");
                        }
                        if (chordQuality.includes("maj")) {
                            chordQuality = chordQuality.replace("maj", " maj");
                        }
                    }
                    return chordQuality;
                }
                const fixedChordQuality = fixChordQuality(chordInfoPassThrough);

                function fixRoot(theRoot) {
                    if (theRoot.length > 2) {
                        for (let i = 0; i < chordArray.length; i++) {
                            if (theRoot.slice(2) === (chordArray[i]) || theRoot.slice(0, 2) === chordArray[i]) {
                                theRoot = chordArray[i];
                            }
                        }
                    }
                    return theRoot;
                }

                const fixedRoot = fixRoot(rootLetter);
                function mergeRootAndQuality(theRoot, fixedChordQuality) {
                    let mergedRoot = "";
                    let chordQuality = fixedChordQuality;

                    if (theRoot[1] === "#" || theRoot[1] === "b") {
                        mergedRoot = theRoot.replace(theRoot[1], theRoot[1] + "/");
                    }
                    if (theRoot[0] === lowestNote || theRoot[0] + theRoot[1] === lowestNote) {
                        mergedRoot = `${theRoot}${chordQuality}`;
                    } else {
                        mergedRoot = `${theRoot}${chordQuality} / ${lowestNote}`;
                    }
                    return mergedRoot;
                }

                const mergedRoot = mergeRootAndQuality(fixedRoot, fixedChordQuality);
                if (determinedChordValidity) {
                    function fillTheChordObject(chordExtraExtensionNumber, mergedRoot, chordInfo, appliedInversionText, chordFunction) {

                        if (chordInfo.basicChordQuality !== undefined && chordInfo.chordQuality !== undefined) {
                            chordPriorityObject[chordExtraExtensionNumber].Root.push(mergedRoot);
                            chordPriorityObject[chordExtraExtensionNumber].Position.push(appliedInversionText);
                            chordPriorityObject[chordExtraExtensionNumber].ChordFunction.push(chordFunction);
                        }
                        return chordPriorityObject;
                    }
                    fillTheChordObject(chordExtraExtensionNumber, mergedRoot, chordInfoPassThrough, appliedInversionText, determinedChordFunctions);

                }

            } //if !undefined

        } //allChordInfo.length
        function sortTheChordObjectByInversion() {
            for (let i = 0; i < Object.keys(chordPriorityObject).length; i++) {
                let array = [];
                if (Object.values(chordPriorityObject)[i].Root.length > 0) {
                }
                for (let j = 0; j < Object.values(chordPriorityObject)[i].Position.length; j++) {
                    if (Object.values(chordPriorityObject)[i].Position[j] === "Root Position") {
                        Object.values(chordPriorityObject)[i].Position[j] = "0" + Object.values(chordPriorityObject)[i].Position[j]
                    }
                    array.push({ Root: Object.values(chordPriorityObject)[i].Root[j], Position: Object.values(chordPriorityObject)[i].Position[j], ChordFunction: Object.values(chordPriorityObject)[i].ChordFunction[j] });
                }

                array.sort(function (a, b) {
                    return ((a.Position < b.Position) ? -1 : ((a.Position === b.Position) ? 0 : 1));
                });

                for (let j = 0; j < array.length; j++) {
                    if (array[j].Position[0] === "0") {
                        array[j].Position = array[j].Position.replace("0", "");
                    }
                    chordPriorityObject[i].Root[j] = array[j].Root;
                    chordPriorityObject[i].Position[j] = array[j].Position;
                    chordPriorityObject[i].ChordFunction[j] = array[j].ChordFunction;
                }
            }
        }
        sortTheChordObjectByInversion();

        function displayTheRootAndQuality() {
            let counter = 1;
            for (let i = 0; i < Object.keys(chordPriorityObject).length; i++) {
                for (let j = 0; j < Object.values((chordPriorityObject)[i].Root).length; j++) {
                    document.querySelector('#root' + counter).textContent = Object.values(chordPriorityObject)[i].Root[j];
                    document.querySelector('#position' + counter).textContent = Object.values(chordPriorityObject)[i].Position[j];
                    document.querySelector('#chordFunction' + counter).textContent = Object.values(chordPriorityObject)[i].ChordFunction[j].join(" ");
                    counter++;
                }
            }
        }
        displayTheRootAndQuality();
        function displayInputNotes() {
            if (!guitarChecked) {
                for (let i = 1; i <= uniqueChordArray.length; i++) {
                    document.querySelector('#note' + i).textContent = uniqueChordArray[i - 1];
                }
            }
        }
        displayInputNotes();
    }
    runAfterInput();
}

let inputChoice = 1;

function clearInput() {
    for (let i = 1; i <= 7; i++) {
        document.querySelector("#input" + i).value = "";
    }
}

document.querySelector("#confirmNotes").addEventListener("click", function () {
    runMain();
    clearInput();
    document.getElementById("input1").focus();
    inputChoice = 1;
});
document.getElementById("input1").focus();

document.querySelector("#repeatNotes").addEventListener("click", function () {
    for (let i = 1; i <= 7; i ++) {
    if (!guitarChecked) {
    document.querySelector("#input" + i).value = document.querySelector('#note' + i).textContent;
} else {
    document.querySelector("#input" + i).value = document.querySelector('#note' + i).textContent.split(":")[0]
    }
}
});

document.querySelector("#clearAll").addEventListener("click", function () {
    for (let i = 1; i <= 7; i ++) {
        document.querySelector("#input" + i).value = "";
    }
});


document.addEventListener("keydown", function (e) {
    if ((e.key === "ArrowUp" || e.key === " ") && inputChoice < 7) {
        inputChoice++;
        document.getElementById("input" + inputChoice).focus();
    }
    if (e.key === "ArrowDown" && inputChoice > 1) {
        inputChoice--;
        document.getElementById("input" + inputChoice).focus();
    }
    if (e.key === "Enter") {
        runMain();
        clearInput();
        document.getElementById("input1").focus();
        inputChoice = 1;
    }

    function leftAndRightKeys() {

        if (!guitarChecked) {
            let keyValue;
            const chromaticNoteSharps = ["", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
            const chromaticNoteFlats = ["", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
            const inputSelection = document.querySelector("#input" + inputChoice)
            keyValue = chromaticNoteSharps.indexOf(inputSelection.value)

            if (e.key === "ArrowRight") {

                if (!inputSelection.value.includes("b")) {
                    keyValue = chromaticNoteSharps.indexOf(inputSelection.value) + 1;
                } else {
                    keyValue = chromaticNoteFlats.indexOf(inputSelection.value) + 1;
                }

                if (keyValue > 12) {
                    keyValue = 0;
                }
                inputSelection.value = chromaticNoteSharps[keyValue];
            } else
                if (e.key === "ArrowLeft") {
                    if (!inputSelection.value.includes("#")) {
                        keyValue = chromaticNoteFlats.indexOf(inputSelection.value) - 1;
                    } else {
                        keyValue = chromaticNoteSharps.indexOf(inputSelection.value) - 1;
                    }
                    if (keyValue < 0) {
                        keyValue = 12;
                    }
                    inputSelection.value = chromaticNoteFlats[keyValue];
                }

        } else {

            const guitarFrets = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
            if (e.key === "ArrowRight") {
                let keyValue = guitarFrets.indexOf(document.querySelector("#input" + inputChoice).value) + 1;
                if (keyValue >= guitarFrets.length) {
                    keyValue = 0;
                }
                document.querySelector("#input" + inputChoice).value = guitarFrets[keyValue];
            } else
                if (e.key === "ArrowLeft") {
                    let keyValue = guitarFrets.indexOf(document.querySelector("#input" + inputChoice).value) - 1;
                    if (keyValue < 0) {
                        keyValue = guitarFrets.length - 1;
                    }
                    document.querySelector("#input" + inputChoice).value = guitarFrets[keyValue];
                }
        }
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        leftAndRightKeys(inputChoice);
    }
});

function saveInputClickLocation() {
    for (let i = 1; i <= 7; i++) {
        document.querySelector("#input" + i).addEventListener("click", function () {
            inputChoice = i;
        });
    }
}
saveInputClickLocation();

let checked = false;
document.querySelector("#extraChordCheckBox").addEventListener("change", function () {
    checked === false ? checked = true : checked = false;
});

let guitarChecked = false;
document.querySelector("#guitarCheckBox").addEventListener("change", function () {
    guitarChecked === false ? guitarChecked = true : guitarChecked = false;
    if (guitarChecked) {
        for (let i = 1; i <= 7; i++) {
            document.getElementById("guitarString" + i).style.visibility = "visible";
        }
    } else {
        for (let i = 1; i <= 7; i++) {
            document.getElementById("guitarString" + i).style.visibility = "hidden";
        }
    }
});