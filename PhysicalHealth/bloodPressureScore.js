exports.calculateBloodPressureScore = function calculateBloodPressureScore(bloodPressure) {
    // Check that input is an array of two numbers
    if (!Array.isArray(bloodPressure) || bloodPressure.length !== 2 || 
        typeof bloodPressure[0] !== 'number' || typeof bloodPressure[1] !== 'number') {
        throw new Error("Invalid input. Expected an array of two numbers.");
    }

    const [systolic, diastolic] = bloodPressure;
    if (systolic < 120 && diastolic < 80) return 10; // Normal
    else if (systolic >= 120 && systolic < 130 && diastolic < 80) return 8; // Elevated
    else if (systolic >= 130 && systolic < 140 || diastolic >= 80 && diastolic < 90) return 6; // Hypertension stage 1
    else if (systolic >= 140 && systolic < 180 || diastolic >= 90 && diastolic < 120) return 4; // Hypertension stage 2
    else if (systolic >= 180 || diastolic >= 120) return 2; // Hypertensive crisis
}

// // Best scenario: Normal blood pressure
// console.log(calculateBloodPressureScore([115, 75]));  // 10

// // Slightly elevated systolic pressure, but not yet hypertension
// console.log(calculateBloodPressureScore([125, 75]));  // 8

// // Stage 1 hypertension
// console.log(calculateBloodPressureScore([135, 85]));  // 6

// // Stage 2 hypertension
// console.log(calculateBloodPressureScore([145, 95]));  // 4

// // Hypertensive crisis
// console.log(calculateBloodPressureScore([185, 125]));  // 2

// let bloodPressureInvalid1 = [120]; 
// console.log(calculateBloodPressureScore(bloodPressureInvalid1));  // Error: Invalid input. Expected an array of two numbers.

// let bloodPressureInvalid2 = "120, 80"; 
// console.log(calculateBloodPressureScore(bloodPressureInvalid2));  // Error: Invalid input. Expected an array of two numbers.

// let bloodPressureInvalid3 = [120, "80"]; 
// console.log(calculateBloodPressureScore(bloodPressureInvalid3));  // Error: Invalid input. Expected an array of two numbers.
