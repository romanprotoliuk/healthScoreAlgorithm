exports.calculateBmiAndScore = function calculateBmiAndScore(weight, height, weightUnit = 'kg', heightUnit = 'cm', inches = 0) {
    // Convert weight to kg if it's in lbs
    if (weightUnit === 'lbs') {
        weight = weight * 0.453592;
    } else if (weightUnit !== 'kg') {
        throw new Error("Invalid weight unit. Expected 'kg' or 'lbs'.");
    }

    let heightInMeters;
    if (heightUnit === 'cm') {
        heightInMeters = height / 100;
    } else if (heightUnit === 'm') {
        heightInMeters = height;
    } else if (heightUnit === 'ft') {
        heightInMeters = (height * 12 * 2.54 + inches * 2.54) / 100;
    } else {
        throw new Error("Invalid height unit. Expected 'cm', 'm', or 'ft'.");
    }

    const bmi = weight / (heightInMeters * heightInMeters);

    let score;
    if (bmi < 18.5) score = 5; // underweight
    else if (bmi >= 18.5 && bmi <= 24.9) score = 10; // healthy weight
    else if (bmi >= 25 && bmi <= 29.9) score = 7; // overweight
    else score = 4; // obesity

    return {bmi, score};
}


// // Example for weight in kilograms and height in centimeters
// console.log(calculateBmiAndScore(70, 'kg', 180, 'cm')); 

// // Example for weight in pounds and height in feet
// console.log(calculateBmiAndScore(154, 'lbs', 5.9, 'ft')); 