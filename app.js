const { getHealthScore } = require("./healthScore");

// const score = getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker')
// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker'));
// console.log(score.details.bloodPressure)

// console.log(getHealthScore(50, 'female', 60, 160, 130, 90, 'ex-smoker'));

// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker', 200, 3));

// // Sample activityData
// const activityData = {
//     activityType: 'moderate',
//     duration: 120, // minutes of moderate activity
//     stepsPerDay: 8000,
//     heartRate: 80,
//     recoveryTime: 6 // hours of sleep
// };

// // Sample health data
// const age = 35;
// const gender = 'male';
// const weight = 80; // kg
// const height = 180; // cm
// const systolicBP = 120;
// const diastolicBP = 80;
// const smokingStatus = 'non-smoker';
// const glucoseLevels = 90; // mg/dL
// const alcoholConsumption = 2; // standard drinks per day

// // Calculate health score
// const healthScoreResult = getHealthScore(age, gender, weight, height, systolicBP, diastolicBP, smokingStatus, glucoseLevels, alcoholConsumption, activityData);

// console.log(healthScoreResult);

const sampleActivityData = {
  activityType: "moderate",
  duration: 180, // minutes
  stepsPerDay: 8000,
  heartRate: 75,
  recoveryTime: 6, // hours
};

const sampleSleepData = {
  nights: [
    // Day 1
    {
      date: "2023-07-01", // Date of the sleep data (YYYY-MM-DD)
      totalTime: 480, // Total sleep time for the night in minutes
      remTime: 80, // Time spent in REM sleep in minutes
      deepTime: 120, // Time spent in deep sleep in minutes
      heartRate: 65, // Resting heart rate during sleep in beats per minute (bpm)
      heartRateVariability: 12, // Heart rate variability during sleep in milliseconds (ms)
    },

    // Day 2
    {
      date: "2023-07-02",
      totalTime: 510,
      remTime: 90,
      deepTime: 130,
      heartRate: 68,
      heartRateVariability: 10,
    },

    // Day 3
    {
      date: "2023-07-03",
      totalTime: 500,
      remTime: 85,
      deepTime: 125,
      heartRate: 70,
      heartRateVariability: 11,
    },

    // Day 4
    {
      date: "2023-07-04",
      totalTime: 490,
      remTime: 75,
      deepTime: 115,
      heartRate: 72,
      heartRateVariability: 14,
    },

    // Day 5
    {
      date: "2023-07-05",
      totalTime: 520,
      remTime: 95,
      deepTime: 135,
      heartRate: 70,
      heartRateVariability: 12,
    },

    // Day 6
    {
      date: "2023-07-06",
      totalTime: 530,
      remTime: 100,
      deepTime: 140,
      heartRate: 69,
      heartRateVariability: 13,
    },

    // Day 7
    {
      date: "2023-07-07",
      totalTime: 480,
      remTime: 80,
      deepTime: 120,
      heartRate: 68,
      heartRateVariability: 11,
    },
  ],
};

const userData2 = {
  dietType: "vegetarian",
  mealPortions: "small",
  junkFoodIntake: "rarely",
  hydration: 0.6,
  addedSugarsIntake: 0.03,
};

const stressData = {
  dailyRoutine: 9,
  emotionalWellBeing: 9,
  socialSupport: 8,
  workRelatedStress: 8,
  stressCopingMechanisms: 10,
  lifeEvents: 8,
  stressPerception: 7,
};

const sampleData = {
  age: 30,
  gender: "male",
  weight: 75, // kg
  height: 180, // cm
  systolicBP: 120,
  diastolicBP: 80,
  smokingStatus: "non-smoker",
  glucoseLevels: 90, // mg/dL
  alcoholConsumption: 20, // %
  activityData: sampleActivityData,
  sleepData: sampleSleepData,
  dietaryHabitsData: userData2,
  stressLevelData: stressData,
};

const result = getHealthScore(
  sampleData.age,
  sampleData.gender,
  sampleData.weight,
  sampleData.height,
  sampleData.systolicBP,
  sampleData.diastolicBP,
  sampleData.smokingStatus,
  sampleData.glucoseLevels,
  sampleData.alcoholConsumption,
  sampleData.activityData,
  sampleData.sleepData,
  sampleData.dietaryHabitsData,
  sampleData.stressLevelData
);

console.log(result);
