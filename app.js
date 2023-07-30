const { getHealthScore } = require('./healthScore');



// const score = getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker')
// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker'));
// console.log(score.details.bloodPressure)

// console.log(getHealthScore(50, 'female', 60, 160, 130, 90, 'ex-smoker'));

// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker', 200, 3));

// Sample activityData
const activityData = {
    activityType: 'moderate',
    duration: 120, // minutes of moderate activity
    stepsPerDay: 8000,
    heartRate: 80,
    recoveryTime: 6 // hours of sleep
};

// Sample health data
const age = 35;
const gender = 'male';
const weight = 80; // kg
const height = 180; // cm
const systolicBP = 120;
const diastolicBP = 80;
const smokingStatus = 'non-smoker';
const glucoseLevels = 90; // mg/dL
const alcoholConsumption = 2; // standard drinks per day

// Calculate health score
const healthScoreResult = getHealthScore(age, gender, weight, height, systolicBP, diastolicBP, smokingStatus, glucoseLevels, alcoholConsumption, activityData);

console.log(healthScoreResult);
