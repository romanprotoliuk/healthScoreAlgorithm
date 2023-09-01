exports.calculateBmiAndScore = function calculateBmiAndScore(weight, height, weightUnit, heightUnit, inches) {

  console.log("from calculate Bmi", weight, height, weightUnit, heightUnit, inches)
  // Check for non-zero, positive number inputs
  if (weight <= 0 || height <= 0) {
      throw new Error("Invalid weight or height. Both must be positive numbers.");
  }

  let bmi;

  // Calculate BMI based on imperial system
  if (weightUnit === "lbs" && heightUnit === "ft") {
      bmi = calculateBmiImperial(weight, height, inches);
  }
  // Calculate BMI based on metric system
  else if (weightUnit === "kg") {
      if (heightUnit === "cm") {
          height = height / 100;  // Convert height to meters if it's in cm
      }
      bmi = calculateBmiMetric(weight, height);
  } else {
      throw new Error("Invalid combination of weight and height units.");
  }

  // Calculate score based on BMI
  const score = Math.floor(Math.max(0, Math.min(100, 100 - (bmi - 18.5) * 2)) * 10) / 10;
  const isNormal = bmi >= 18.5 && bmi <= 24.9;

  return { bmi, score, isNormal };
};



function calculateBmiMetric(weightKg, heightM) {
  if (heightM <= 0) {
      throw new Error("Height must be a positive value.");
  }
  return weightKg / (heightM * heightM);
}


function calculateBmiImperial(weightLBS, heightFT, heightIN) {
  console.log("expected lbs", weightLBS)
  console.log("expected ft", heightFT)
  console.log("expected in", heightIN)
  const heightTotalInches = heightFT * 12 + heightIN;
  if (heightTotalInches <= 0) {
      throw new Error("Combined height (feet + inches) must be a positive value.");
  }
  
  const weightKg = weightLBS * 0.453592;
  const heightM = heightTotalInches * 0.0254;

  console.log(`weightKg: ${weightKg}`);
console.log(`heightM: ${heightM}`);
console.log(`bmi: ${weightKg / (heightM * heightM)}`);


  return weightKg / (heightM * heightM);
}


// // Testing the function with valid and invalid inputs
// console.log(healthScore.calculateBmiAndScore(70, 180));
// // Output: { bmi: 21.6, score: 86.2, isNormal: true }

// console.log(healthScore.calculateBmiAndScore(70, 180, 'kg', 'cm'));
// // Output: { bmi: 21.6, score: 86.2, isNormal: true }

// console.log(healthScore.calculateBmiAndScore(154, 70, 'lbs', 'in'));
// // Output: { bmi: 22.1, score: 85.2, isNormal: true }

// console.log(healthScore.calculateBmiAndScore(80, 1.75, 'kg', 'm'));
// // Output: { bmi: 26.1, score: 75.2, isNormal: false }

// console.log(healthScore.calculateBmiAndScore(70, 6, 'kg', 'ft', 2));
// // Output: { bmi: 16.7, score: 63.4, isNormal: false }

// // Test with invalid inputs
// try {
//     console.log(healthScore.calculateBmiAndScore(-70, 180));
// } catch (error) {
//     console.log(error.message);
//     // Output: 'Invalid weight or height. Both must be positive numbers.'
// }

// try {
//     console.log(healthScore.calculateBmiAndScore(70, 0));
// } catch (error) {
//     console.log(error.message);
//     // Output: 'Invalid weight or height. Both must be positive numbers.'
// }

// try {
//     console.log(healthScore.calculateBmiAndScore(70, 180, 'pounds'));
// } catch (error) {
//     console.log(error.message);
//     // Output: 'Invalid weight unit. Expected 'kg' or 'lbs'.'
// }

// try {
//     console.log(healthScore.calculateBmiAndScore(70, 180, 'kg', 'meters'));
// } catch (error) {
//     console.log(error.message);
//     // Output: "Invalid height unit. Expected 'cm', 'm', or 'ft'."
// }

// try {
//     console.log(healthScore.calculateBmiAndScore(500, 180, 'kg', 'cm'));
// } catch (error) {
//     console.log(error.message);
//     // Output: 'Invalid weight. Weight must be between 1kg and 300kg, or between 2.2lbs and 661lbs.'
// }

// try {
//     console.log(healthScore.calculateBmiAndScore(70, 300, 'kg', 'cm'));
// } catch (error) {
//     console.log(error.message);
//     // Output: 'Invalid height. Height must be between 50cm and 250cm, between 0.5m and 2.5m, or between 1.6ft and 8.2ft.'
// }
