exports.calculateGlucoseLevelsScore = function calculateGlucoseLevelsScore(glucoseLevel) {
    // Validation
    if (glucoseLevel === undefined || typeof glucoseLevel !== 'number' || glucoseLevel <= 0) {
        throw new Error("Invalid glucose level. Glucose level must be a positive number.");
    }

    // Score calculation
    let score;
    let isNormal;
    let level;

    if (glucoseLevel >= 70 && glucoseLevel <= 130) {
        // Normal glucose level
        score = 100;
        isNormal = true;
        level = "Normal";
    } else if (glucoseLevel >= 130 && glucoseLevel <= 180) {
        // Elevated glucose level
        score = 80;
        isNormal = false;
        level = "Elevated";
    } else if (glucoseLevel > 180) {
        // High glucose level
        score = 60;
        isNormal = false;
        level = "High";
    } else {
        // Low glucose level
        score = 40;
        isNormal = false;
        level = "Low";
    }

    return { score, isNormal, level };
};
