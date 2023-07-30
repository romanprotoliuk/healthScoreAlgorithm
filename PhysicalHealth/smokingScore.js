exports.calculateSmokingScore = function calculateSmokingScore(smokingStatus) {
    const smokingScores = {
        'non-smoker': { score: 100, isNormal: true },
        'ex-smoker': { score: 70, isNormal: false },
        'current-smoker': { score: 0, isNormal: false }
    };

    if (!(smokingStatus in smokingScores)) {
        throw new Error("Invalid smoking status. Expected 'non-smoker', 'ex-smoker', or 'current-smoker'.");
    }

    return smokingScores[smokingStatus];
};

// // Testing the function with valid and invalid inputs
// console.log(calculateSmokingScore('non-smoker'));
// // Outputs: { score: 100, isNormal: true }

// console.log(calculateSmokingScore('ex-smoker'));
// // Outputs: { score: 70, isNormal: false }

// console.log(calculateSmokingScore('current-smoker'));
// // Outputs: { score: 0, isNormal: false }

// try {
//   console.log(calculateSmokingScore('occasional-smoker')); // Invalid input
// } catch (error) {
//   console.log(error.message); 
//   // Outputs: "Invalid smoking status. Expected one of ['non-smoker', 'ex-smoker', 'current-smoker']."
// }

// try {
//   console.log(calculateSmokingScore(null)); // Missing input
// } catch (error) {
//   console.log(error.message); 
//   // Outputs: "Invalid smoking status. Expected one of ['non-smoker', 'ex-smoker', 'current-smoker']."
// }
