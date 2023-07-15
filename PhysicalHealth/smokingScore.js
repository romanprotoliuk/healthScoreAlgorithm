exports.calculateSmokingScore = function calculateSmokingScore(smokingStatus) {
    if (smokingStatus === 'non-smoker') return 10;
    else if (smokingStatus === 'ex-smoker') return 7;
    else if (smokingStatus === 'current-smoker') return 0;
    else throw new Error("Invalid smoking status. Expected 'non-smoker', 'ex-smoker', or 'current-smoker'.");
}