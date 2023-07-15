const { getWeights } = require("./weights");
const { calculateBmiAndScore } = require("./bmiANDscore");
const { calculateSmokingScore } = require("./smokingScore");
const { calculateBloodPressureScore } = require("./bloodPressureScore");

module.exports.getHealthScore = function getHealthScore(age, weight, height, bloodPressure, smokingStatus, weightUnit = 'kg', heightUnit = 'cm', inches = 0, ...restOfMetrics) {
    const weights = getWeights(age);
    console.log(weights);
    const {bmi, score: bmiScore} = calculateBmiAndScore(weight, height, weightUnit, heightUnit, inches);
    console.log(`bmi: ${bmi}, score: ${bmiScore}`);
    const bloodPressureScore = calculateBloodPressureScore(bloodPressure);
    console.log(`bloodPressureScore: ${bloodPressureScore}`);
    const smokingScore = calculateSmokingScore(smokingStatus);
    console.log(`smokingScore: ${smokingScore}`);
    const bmiBloodPressureInteraction = (bmi > 25 && bloodPressure[0] > 120) ? 0.1 : 0;
    console.log(`bmiBloodPressureInteraction: ${bmiBloodPressureInteraction}`);
    let score = (weights.bmi * bmiScore) + (weights.bloodPressure * bloodPressureScore) + (weights.smoking * smokingScore) + (bmiBloodPressureInteraction * bmiScore * bloodPressureScore);
    // Add scores from restOfMetrics here
    return score;
}


