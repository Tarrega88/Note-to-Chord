let input = [0,4,7,2,9,10];


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
const has7OrNot = doesChordHave7(input, foundBasicValue);


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
    if (input.includes(9)) {
        upperExtension = "13";
    } else
        if (input.includes(5)) {
            upperExtension = "11";
        } else
            if (input.includes(2)) {
                upperExtension = "9";
            }
    return upperExtension;
}

    const upperExtensionFound = findUpperExtensions(input);

function replace7WithUpperExtension(theUpperExtension, updatedChordTo7) {
let updatedChordToUpperExtension = updatedChordTo7.replace("7", theUpperExtension);
return updatedChordToUpperExtension;
}
const upperExtensionReplacement = replace7WithUpperExtension(upperExtensionFound, updatedChordTo7)
console.log(upperExtensionReplacement);