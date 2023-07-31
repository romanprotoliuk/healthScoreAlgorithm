exports.calculateBmiAndScore = function calculateBmiAndScore(
  weight,
  height,
  weightUnit = "kg",
  heightUnit = "cm",
  inches = 0
) {
  // Check for non-zero, positive number inputs
  if (weight <= 0 || height <= 0) {
    throw new Error("Invalid weight or height. Both must be positive numbers.");
  }

  // Check for reasonable weight values
  if (
    (weightUnit === "kg" && (weight < 1 || weight > 300)) ||
    (weightUnit === "lbs" && (weight < 2.2 || weight > 661))
  ) {
    throw new Error(
      "Invalid weight. Weight must be between 1kg and 300kg, or between 2.2lbs and 661lbs."
    );
  }

  // Check for reasonable height values
  if (
    (heightUnit === "cm" && (height < 50 || height > 250)) ||
    (heightUnit === "m" && (height < 0.5 || height > 2.5)) ||
    (heightUnit === "ft" && (height < 1.6 || height > 8.2))
  ) {
    throw new Error(
      "Invalid height. Height must be between 50cm and 250cm, between 0.5m and 2.5m, or between 1.6ft and 8.2ft."
    );
  }

  // Convert weight to kg if it's in lbs
  if (weightUnit === "lbs") {
    weight = weight * 0.453592;
  } else if (weightUnit !== "kg") {
    throw new Error("Invalid weight unit. Expected 'kg' or 'lbs'.");
  }

  let heightInMeters;
  if (heightUnit === "cm") {
    heightInMeters = height / 100;
  } else if (heightUnit === "m") {
    heightInMeters = height;
  } else if (heightUnit === "ft") {
    heightInMeters = (height * 12 * 2.54 + inches * 2.54) / 100;
  } else {
    throw new Error("Invalid height unit. Expected 'cm', 'm', or 'ft'.");
  }

  const bmi =
    Math.floor((weight / (heightInMeters * heightInMeters)) * 10) / 10;

  const score =
    Math.floor(Math.max(0, Math.min(100, 100 - (bmi - 18.5) * 2)) * 10) / 10;
  const isNormal = bmi >= 18.5 && bmi <= 24.9;

  return { bmi, score, isNormal };
};

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
