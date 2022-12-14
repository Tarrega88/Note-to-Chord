let input = [0, 4, 9];


function doesChordHave5th(input) {
    let has5th = false;
    if (input.includes(7)) {
        has5th = true;
    }
    return has5th;
}

const chordHas5thOrNot = doesChordHave5th(input);

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


const foundBasicValue = findBasicValue(input, basicChords);

function doesChordHave7(input, foundBasicValue) {
    let has7th = false;
    if (input.includes(11) || input.includes(10) || foundBasicValue === "dim" && input.includes(9)) {
        has7th = true;
    }
    return has7th;
}
const has7 = doesChordHave7(input, foundBasicValue);

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


    const found7th = which7th(input, foundBasicValue);

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

    const upperExtensionFound = findUpperExtensions(input, foundBasicValue);

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

    const specialExtensionsFound = findSpecialExtensions(input, upperExtensionReplacement, chordHas5thOrNot, has7, foundBasicValue);
    console.log(specialExtensionsFound);
} else
    if (!has7) {
        function findTriadExtensions(unalteredChordName, chordName, has5th) {
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
        const triadExtensionsFound = findTriadExtensions(foundBasicValue, foundBasicValue, chordHas5thOrNot);
        console.log(triadExtensionsFound);
    }