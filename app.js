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
  stepsPerDay: 100,
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

// dietery habets 
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
  weight: 100, // kg
  height: 175, // cm
  systolicBP: 120,
  diastolicBP: 80,
  smokingStatus: "non-smoker",
  glucoseLevels: 90, // mg/dL
  alcoholConsumption: 2, // drinks per week 
  activityData: sampleActivityData,
  sleepData: sampleSleepData,
  dietaryHabitsData: userData2,
  stressLevelData: stressData,
};

// const result = getHealthScore(
//   sampleData.age,
//   sampleData.gender,
//   sampleData.weight,
//   sampleData.height,
//   sampleData.systolicBP,
//   sampleData.diastolicBP,
//   sampleData.smokingStatus,
//   sampleData.glucoseLevels,
//   sampleData.alcoholConsumption,
//   sampleData.activityData,
//   sampleData.sleepData,
//   sampleData.dietaryHabitsData,
//   sampleData.stressLevelData
// );


function processUserData(data) {
  if (data.measurementSystem === 'metric') {
      return {
          age: data.age,
          gender: "male",
          height: +(data.heightCM.toFixed(1)),
          weightUnit: "kg",
          heightUnit: "cm",
          weight: +(data.weightKG.toFixed(4)),
          inches: 0,
          activityData: data.activityData,
          sleepData: data.sleepData,
          stressLevelData: data.stressLevelData,
          smokingStatus: data.smokingStatus,
          alcoholConsumption: data.alcoholConsumption,
          systolicBP: data.systolicBP,
          diastolicBP: data.diastolicBP,
          glucoseLevels: data.glucoseLevels,
          dietaryHabitsData: data.dietaryHabitsData
      };
  } else if (data.measurementSystem === 'imperial') {
      return {
          age: data.age,
          gender: "male",
          height: data.heightFT,
          weightUnit: "lbs",
          heightUnit: "ft",
          weight: data.weightLBS,
          inches: data.heightIN,
          activityData: data.activityData,
          sleepData: data.sleepData,
          stressLevelData: data.stressLevelData,
          smokingStatus: data.smokingStatus,
          alcoholConsumption: data.alcoholConsumption,
          systolicBP: data.systolicBP,
          diastolicBP: data.diastolicBP,
          glucoseLevels: data.glucoseLevels,
          dietaryHabitsData: data.dietaryHabitsData
      };
  }
}



const sampleRefactorDataFrom = {
  "age": 23,
  "gender": "male",
  "measurementSystem": "metric",
  "weightKG": 70,
  "heightCM": 175,
  "heightFT": 0,
  "heightIN": 0,
  "weightLBS": 0,
  "activityData": {
      "activityType": "sedentary",
      "duration": 50,
      "stepsPerDay": 11000,
      "heartRate": 47,
      "recoveryTime": 40
  },
  "sleepData": {
      "nights": [
          {
              "date": "2023-08-24",
              "totalTime": 7,
              "remTime": 2,
              "deepTime": 2,
              "heartRate": 47,
              "heartRateVariability": 87
          }
      ]
  },
  "stressLevelData": {
      "dailyRoutine": 8,
      "emotionalWellBeing": 6,
      "socialSupport": 9,
      "workRelatedStress": 6,
      "stressCopingMechanisms": 7,
      "lifeEvents": 5,
      "stressPerception": 8
  },
  "smokingStatus": "non-smoker",
  "alcoholConsumption": 5,
  "systolicBP": 122,
  "diastolicBP": 79,
  "glucoseLevels": 72,
  "dietaryHabitsData": {
      "dietType": "balanced",
      "mealPortions": "regular",
      "junkFoodIntake": "often",
      "hydration": 11,
      "addedSugarsIntake": 35
  }
}


const sampleRefactoredOutput = processUserData(sampleRefactorDataFrom)
console.log("sample refactor data", sampleRefactoredOutput)

const result2 = getHealthScore(
  sampleRefactoredOutput.age,
  sampleRefactoredOutput.gender,
  sampleRefactoredOutput.weight,
  sampleRefactoredOutput.height,
  sampleRefactoredOutput.weightUnit,
  sampleRefactoredOutput.heightUnit,
  sampleRefactoredOutput.systolicBP,
  sampleRefactoredOutput.diastolicBP,
  sampleRefactoredOutput.smokingStatus,
  sampleRefactoredOutput.glucoseLevels,
  sampleRefactoredOutput.alcoholConsumption,
  sampleRefactoredOutput.activityData,
  sampleRefactoredOutput.sleepData,
  sampleRefactoredOutput.dietaryHabitsData,
  sampleRefactoredOutput.stressLevelData
);

 console.log(result2)

// console.log(sampleRefactoredOutput)


// console.log(result);
