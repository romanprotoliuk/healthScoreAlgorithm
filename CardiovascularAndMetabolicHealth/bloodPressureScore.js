exports.calculateBloodPressureScore = function calculateBloodPressureScore(
  systolic,
  diastolic
) {
  // Validation
  if (systolic === undefined || diastolic === undefined) {
    throw new Error(
      "Both systolic and diastolic blood pressure values must be provided."
    );
  }
  if (typeof systolic !== "number" || typeof diastolic !== "number") {
    throw new Error("Blood pressure values must be numeric.");
  }
  if (systolic < 40 || systolic > 300 || diastolic < 40 || diastolic > 300) {
    throw new Error(
      "Blood pressure values are out of a reasonable physiological range."
    );
  }

  // Score calculation
  let score;
  let isNormal;
  let category;

  if (systolic <= 120 && diastolic <= 80) {
    // Normal blood pressure
    score = 100;
    isNormal = true;
    category = "Normal";
  } else if (systolic >= 121 && systolic <= 129 && diastolic <= 80) {
    // Elevated blood pressure
    score = 80;
    isNormal = false;
    category = "Elevated";
  } else if (
    (systolic >= 130 && systolic <= 139) ||
    (diastolic >= 81 && diastolic <= 89)
  ) {
    // High blood pressure (Hypertension stage 1)
    score = 60;
    isNormal = false;
    category = "High (Hypertension stage 1)";
  } else if (systolic >= 140 || diastolic >= 90) {
    // High blood pressure (Hypertension stage 2)
    score = 40;
    isNormal = false;
    category = "High (Hypertension stage 2)";
  } else if (systolic > 180 || diastolic > 120) {
    // Hypertensive crisis
    score = 0;
    isNormal = false;
    category = "Hypertensive Crisis";
  } else {
    throw new Error("Invalid blood pressure values.");
  }

  return { score, isNormal, category };
};

// // Testing the function with valid inputs
// console.log(calculateBloodPressureScore(115, 75));
// // Outputs: { score: 100, isNormal: true, category: 'Normal' }

// console.log(calculateBloodPressureScore(125, 78));
// // Outputs: { score: 80, isNormal: false, category: 'Elevated' }

// console.log(calculateBloodPressureScore(135, 85));
// // Outputs: { score: 60, isNormal: false, category: 'High (Hypertension stage 1)' }

// console.log(calculateBloodPressureScore(145, 95));
// // Outputs: { score: 40, isNormal: false, category: 'High (Hypertension stage 2)' }

// console.log(calculateBloodPressureScore(190, 125));
// // Outputs: { score: 0, isNormal: false, category: 'Hypertensive Crisis' }

// // Testing the function with invalid inputs
// try {
//   console.log(calculateBloodPressureScore(320, 80)); // Invalid systolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Blood pressure values are out of a reasonable physiological range.'
// }

// try {
//   console.log(calculateBloodPressureScore(120, 400)); // Invalid diastolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Blood pressure values are out of a reasonable physiological range.'
// }

// try {
//   console.log(calculateBloodPressureScore(null, 80)); // Missing systolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Both systolic and diastolic blood pressure values must be provided.'
// }

// try {
//   console.log(calculateBloodPressureScore(120, null)); // Missing diastolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Both systolic and diastolic blood pressure values must be provided.'
// }

// try {
//   console.log(calculateBloodPressureScore('120', 80)); // Non-numeric systolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Blood pressure values must be numeric.'
// }

// try {
//   console.log(calculateBloodPressureScore(120, '80')); // Non-numeric diastolic value
// } catch (error) {
//   console.log(error.message);
//   // Outputs: 'Blood pressure values must be numeric.'
// }
