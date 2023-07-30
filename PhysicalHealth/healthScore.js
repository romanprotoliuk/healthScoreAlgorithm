const { getWeights } = require("./weights");
const { calculateBmiAndScore } = require("./bmiANDscore");
const { calculateSmokingScore } = require("./smokingScore");
const { calculateBloodPressureScore } = require("./bloodPressureScore");

module.exports.getHealthScore = function getHealthScore(age, gender, weight, height, systolicBP, diastolicBP, smokingStatus, weightUnit = 'kg', heightUnit = 'cm', inches = 0) {
        // Validations
        if (age === undefined || gender === undefined || weight === undefined || height === undefined || systolicBP === undefined || diastolicBP === undefined || smokingStatus === undefined) {
            throw new Error("All parameters must be provided.");
        }
    
        if (typeof age !== 'number' || typeof weight !== 'number' || typeof height !== 'number' || typeof systolicBP !== 'number' || typeof diastolicBP !== 'number') {
            throw new Error("Age, weight, height, systolicBP, and diastolicBP must be numbers.");
        }
    
        if (typeof gender !== 'string' || typeof smokingStatus !== 'string') {
            throw new Error("Gender and smokingStatus must be strings.");
        }
    
        const bmiResult = calculateBmiAndScore(weight, height, weightUnit, heightUnit, inches);
        const bloodPressureResult = calculateBloodPressureScore(systolicBP, diastolicBP);
        const smokingResult = calculateSmokingScore(smokingStatus);
        const weights = getWeights(age, gender);
    
        const finalScore = Math.round((bmiResult.score * weights.bmi + bloodPressureResult.score * weights.bloodPressure + smokingResult.score * weights.smoking) / (weights.bmi + weights.bloodPressure + weights.smoking));
    
        return {
            finalScore,
            user: { age, gender },
            details: {
                bmi: {
                    value: bmiResult.bmi,
                    score: bmiResult.score,
                    normalRange: '18.5 - 24.9',
                    isNormal: bmiResult.isNormal
                },
                bloodPressure: {
                    value: { systolic: systolicBP, diastolic: diastolicBP },
                    score: bloodPressureResult.score,
                    category: bloodPressureResult.category,
                    isNormal: bloodPressureResult.isNormal
                },
                smoking: {
                    value: smokingStatus,
                    score: smokingResult.score,
                    normalRange: 'Non-smoker',
                    isNormal: smokingResult.isNormal
                }
            }
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

