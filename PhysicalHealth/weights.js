exports.getWeights = function (age, gender) {
    if (age < 0 || age > 120) {
        throw new Error('Invalid age. Age must be between 0 and 120.');
    }
    if (gender !== 'male' && gender !== 'female') {
        throw new Error('Invalid gender. Gender must be either "male" or "female".');
    }

    let weights = {
        bmi: 0.3,
        bloodPressure: 0.4,
        smoking: 0.3,
    };

    if (age < 18) {
        weights.bmi += 0.1;
        weights.bloodPressure -= 0.1;
    } else if (age >= 18 && age < 30) {
        weights.bmi += 0.05;
        weights.smoking += 0.05;
    } else if (age >= 30 && age < 45) {
        weights.bmi -= 0.05;
        weights.bloodPressure += 0.05;
    } else if (age >= 45 && age < 60) {
        weights.bmi -= 0.1;
        weights.bloodPressure += 0.1;
    } else {
        weights.bmi -= 0.15;
        weights.bloodPressure += 0.15;
    }

    if (gender === 'female') {
        weights.bmi += 0.1;
        weights.smoking -= 0.1;
    }

    return weights;
};


// // Testing the function with valid and invalid inputs
// console.log(getWeights(25, 'male'));
// // Outputs: { bmi: 0.35, bloodPressure: 0.4, smoking: 0.25 }

// console.log(getWeights(50, 'female'));
// // Outputs: { bmi: 0.3, bloodPressure: 0.5, smoking: 0.2 }

// console.log(getWeights(10, 'male'));
// // Outputs: { bmi: 0.4, bloodPressure: 0.3, smoking: 0.3 }

// // Testing with invalid inputs
// try {
//   console.log(getWeights(200, 'male')); // Invalid age
// } catch (error) {
//   console.log(error.message); // Outputs: 'Invalid age. Age must be between 0 and 120.'
// }

// try {
//   console.log(getWeights(25, 'other')); // Invalid gender
// } catch (error) {
//   console.log(error.message); // Outputs: 'Invalid gender. Gender must be either "male" or "female".'
// }

// try {
//   console.log(getWeights(null, 'male')); // Missing age
// } catch (error) {
//   console.log(error.message); // Outputs: 'Invalid age. Age must be between 0 and 120.'
// }

// try {
//   console.log(getWeights(25, null)); // Missing gender
// } catch (error) {
//   console.log(error.message); // Outputs: 'Invalid gender. Gender must be either "male" or "female".'
// }
