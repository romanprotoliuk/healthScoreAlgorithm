const { getWeights } = require("./helpers/weights");
const { calculateBmiAndScore } = require("./LifestyleAndHabits/bmiANDscore");
const { calculateSmokingScore } = require("./LifestyleAndHabits/smokingScore");
const {
  calculateBloodPressureScore,
} = require("./CardiovascularAndMetabolicHealth/bloodPressureScore");
const {
  calculateGlucoseLevelsScore,
} = require("./CardiovascularAndMetabolicHealth/calculateGlucoseLevelScore");
const {
  calculateAlcoholScore,
} = require("./LifestyleAndHabits/calculateAlcoholScore");
const {
  calculatePhysicalActivityScore,
} = require("./LifestyleAndHabits/calculatePhysicalActivityScore");
const {
  calculateSleepScore,
} = require("./LifestyleAndHabits/calculateSleepScore");
const {
  calculateDietaryHabitsScore,
} = require("./LifestyleAndHabits/DietaryHabitsScore");
const {
  calculateStressLevelsScore,
} = require("./LifestyleAndHabits/stressLevelsScore");

module.exports.getHealthScore = function getHealthScore(
  age,
  gender,
  weight,
  height,
  weightUnit,
  heightUnit,
  systolicBP,
  diastolicBP,
  smokingStatus,
  glucoseLevels,
  alcoholConsumption,
  activityData,
  sleepData,
  dietaryHabitsData,
  stressLevelData,
  inches = 0
) {
  // Validations
  if (
    age === undefined ||
    gender === undefined ||
    weight === undefined ||
    height === undefined ||
    systolicBP === undefined ||
    diastolicBP === undefined ||
    smokingStatus === undefined ||
    glucoseLevels === undefined
  ) {
    throw new Error("All parameters must be provided.");
  }

  if (
    typeof age !== "number" ||
    typeof weight !== "number" ||
    typeof height !== "number" ||
    typeof systolicBP !== "number" ||
    typeof diastolicBP !== "number" ||
    typeof glucoseLevels !== "number"
  ) {
    throw new Error(
      "Age, weight, height, systolicBP, diastolicBP, and glucoseLevels must be numbers."
    );
  }

  if (typeof gender !== "string" || typeof smokingStatus !== "string") {
    throw new Error("Gender and smokingStatus must be strings.");
  }

  console.log("height from getHealthScore", height)
  const bmiResult = calculateBmiAndScore(
    weight,
    height,
    weightUnit,
    heightUnit,
    inches
  );
  const bloodPressureResult = calculateBloodPressureScore(
    systolicBP,
    diastolicBP
  );
  const smokingResult = calculateSmokingScore(smokingStatus);
  const glucoseResult = calculateGlucoseLevelsScore(glucoseLevels);
  const alcoholResult = calculateAlcoholScore(alcoholConsumption);
  const physicalActivityResult = calculatePhysicalActivityScore(activityData);
  const sleepResult = calculateSleepScore(sleepData);
  const dietaryHabitsResult = calculateDietaryHabitsScore(dietaryHabitsData);
  const stressLevelsResults = calculateStressLevelsScore(stressLevelData);

  const weights = getWeights(
    age,
    gender,
    alcoholConsumption,
    sleepResult.averageSleepDuration,
    sleepResult.sleepQuality
  );

  const finalScore = Math.round(
    (bmiResult.score * weights.bmi +
      bloodPressureResult.score * weights.bloodPressure +
      smokingResult.score * weights.smoking +
      glucoseResult.score * weights.glucose +
      alcoholResult.score * weights.alcohol +
      physicalActivityResult.score * weights.activity +
      sleepResult.sleepScore * weights.sleep +
      dietaryHabitsResult.score * weights.diet +
      stressLevelsResults.stressScore * weights.stress) /
      (weights.bmi +
        weights.bloodPressure +
        weights.smoking +
        weights.glucose +
        weights.alcohol +
        weights.activity +
        weights.sleep +
        weights.diet +
        weights.stress)
  );

  return {
    finalScore,
    user: { age, gender },
    details: {
      bmi: {
        value: bmiResult.bmi,
        score: bmiResult.score,
        normalRange: "18.5 - 24.9",
        isNormal: bmiResult.isNormal,
      },
      bloodPressure: {
        value: { systolic: systolicBP, diastolic: diastolicBP },
        score: bloodPressureResult.score,
        category: bloodPressureResult.category,
        isNormal: bloodPressureResult.isNormal,
      },
      smoking: {
        value: smokingStatus,
        score: smokingResult.score,
        normalRange: "Non-smoker",
        isNormal: smokingResult.isNormal,
      },
      glucose: {
        value: glucoseLevels,
        score: glucoseResult.score,
        category: glucoseResult.level,
        isNormal: glucoseResult.isNormal,
      },
      alcohol: {
        value: alcoholConsumption,
        score: alcoholResult.score,
        category: alcoholResult.category,
        isNormal: alcoholResult.isNormal,
      },
      physicalActivity: {
        activityType: activityData.activityType,
        duration: activityData.duration,
        stepsPerDay: activityData.stepsPerDay,
        heartRate: activityData.heartRate,
        recoveryTime: activityData.recoveryTime,
        score: physicalActivityResult.score,
        description: physicalActivityResult.description,
        isNormal: physicalActivityResult.isNormal
      },
      sleep: {
        averageSleepDuration: sleepResult.averageSleepDuration,
        averageRemTime: sleepResult.averageRemTime,
        averageDeepTime: sleepResult.averageDeepTime,
        averageRestingHeartRate: sleepResult.averageRestingHeartRate,
        averageHeartRateVariability: sleepResult.averageHeartRateVariability,
        sleepQuality: sleepResult.sleepQuality,
        score: sleepResult.sleepScore,
        sleepQualityLabel: sleepResult.sleepQualityLabel,
        sleepIdentifier: "Weekly average",
        isNormal: sleepResult.isNormal
      },
      dietaryHabits: {
        score: dietaryHabitsResult.score,
        influencingFactors: dietaryHabitsResult.influencingFactors,
      },
      stressLevels: {
        stressScore: stressLevelsResults.stressScore,
        factors: stressLevelsResults.factors,
      },
    },
  };
};

// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker'));
// // Outputs a health score object with all the details as in the given example

// console.log(getHealthScore(50, 'female', 60, 160, 130, 90, 'ex-smoker'));
// // Outputs a health score object with all the details

// console.log(getHealthScore(60, 'male', 80, 180, 140, 90, 'current-smoker', 'kg', 'cm'));
// // Outputs a health score object with all the details

// try {
//     console.log(getHealthScore(24, 'non-binary', 70, 170, 120, 80, 'non-smoker')); // Invalid gender
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid gender. Gender must be either "male" or "female"."
// }

// try {
//     console.log(getHealthScore(130, 'male', 70, 170, 120, 80, 'non-smoker')); // Invalid age
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid age. Age must be a positive number between 0 and 120."
// }

// try {
//     console.log(getHealthScore(24, 'male', -70, 170, 120, 80, 'non-smoker')); // Invalid weight
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid weight or height. Both must be positive numbers."
// }

// try {
//     console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'occasional-smoker')); // Invalid smoking status
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid smoking status. Expected 'non-smoker', 'ex-smoker', or 'current-smoker'."
// }
