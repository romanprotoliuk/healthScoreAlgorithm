function calculateFactorScore(
  weight,
  description,
  value,
  isPercentage = false
) {
  const factorWeight = weight;
  let factorScore = factorWeight;

  if (isPercentage) {
    const valuePercentage = value * 100;
    if (valuePercentage >= 80) {
      factorScore += factorWeight;
    } else if (valuePercentage >= 60) {
      factorScore += factorWeight * 0.6;
    } else if (valuePercentage >= 40) {
      factorScore += factorWeight * 0.4;
    } else {
      factorScore += factorWeight * 0.2;
    }
  } else {
    if (value <= 1) {
      factorScore += factorWeight * 0.8;
    } else if (value <= 2) {
      factorScore += factorWeight * 0.6;
    } else if (value <= 3) {
      factorScore += factorWeight * 0.4;
    } else if (value <= 4) {
      factorScore += factorWeight * 0.2;
    }
  }

  return {
    factor: description,
    weight: factorWeight,
    isNormal: factorScore > factorWeight,
    description,
  };
}

exports.calculateDietaryHabitsScore = function calculateDietaryHabitsScore(
  userData
) {
  if (typeof userData !== "object" || userData === null) {
    throw new Error("Input data must be an object.");
  }

  // Validate and extract data from the userData object
  const {
    dietType,
    mealPortions,
    junkFoodIntake,
    hydration,
    addedSugarsIntake,
  } = userData;

  // Validate that required properties exist in the userData object
  if (
    typeof dietType !== "string" ||
    typeof mealPortions !== "string" ||
    typeof junkFoodIntake !== "string" ||
    typeof hydration !== "number" ||
    typeof addedSugarsIntake !== "number"
  ) {
    throw new Error("Invalid input data. Missing or incorrect property types.");
  }

  // Define the factors and their corresponding weights
  const factors = {
    dietType: {
      weight: 0.3,
      descriptions: {
        balanced: "Following a balanced diet",
        "high-fiber": "Following a high-fiber diet",
        "high-protein": "Following a high-protein diet",
        keto: "Following a keto diet",
        "kidney-friendly": "Following a kidney-friendly diet",
        kosher: "Following a kosher diet",
        "low-carb": "Following a low-carb diet",
        "low-fat": "Following a low-fat diet",
        "low-potassium": "Following a low-potassium diet",
        "low-sodium": "Following a low-sodium diet",
        "no-oil-added": "Following a no-oil-added diet",
        "no-sugar": "Following a no-sugar diet",
        paleo: "Following a paleo diet",
        pescatarian: "Following a pescatarian diet",
        "pork-free": "Following a pork-free diet",
        "red-meat-free": "Following a red-meat-free diet",
        "sugar-conscious": "Following a sugar-conscious diet",
        vegan: "Following a vegan diet",
        vegetarian: "Following a vegetarian diet",
      },
    },
    mealPortions: {
      weight: 0.2,
      descriptions: {
        regular: "Eating regular-sized meal portions",
        big: "Eating big meal portions",
        small: "Eating small meal portions",
      },
    },
    junkFoodIntake: {
      weight: -0.2,
      descriptions: {
        regular: "Regularly consuming junk food",
        often: "Frequently consuming junk food",
        sometimes: "Occasionally consuming junk food",
        occasionally: "Rarely consuming junk food",
        rarely: "Rarely or never consuming junk food",
      },
    },
    hydration: {
      weight: 0.1,
      descriptions: {
        0.8: "Maintaining good hydration levels",
        0.6: "Maintaining average hydration levels",
        0.4: "Maintaining below average hydration levels",
        0.2: "Maintaining poor hydration levels",
      },
      isPercentage: true,
    },
    addedSugarsIntake: {
      weight: -0.15,
      descriptions: {
        1: "Very low added sugars intake",
        2: "Low added sugars intake",
        3: "Moderate added sugars intake",
        4: "High added sugars intake",
        5: "Very high added sugars intake",
      },
    },
  };

  // Calculate the DietaryHabitsScore based on the defined factors and their weights
  let dietaryHabitsScore = 0;
  const influencingFactors = [];

  // Calculate scores and collect influencing factors for each factor
  for (const factorName in factors) {
    if (factors.hasOwnProperty(factorName)) {
      const { weight, descriptions, isPercentage } = factors[factorName];
      if (descriptions.hasOwnProperty(userData[factorName])) {
        const factorScore = calculateFactorScore(
          weight,
          descriptions[userData[factorName]],
          userData[factorName],
          isPercentage
        );
        dietaryHabitsScore += factorScore.weight;
        influencingFactors.push(factorScore);
      }
    }
  }

  // Calculate overall score out of 100
  dietaryHabitsScore = Math.round((dietaryHabitsScore + 0.3) * 100);

  // Return the result object with the overall score and influencing factors
  return {
    score: dietaryHabitsScore,
    influencingFactors,
  };
};

//   function testCalculateDietaryHabitsScore() {
//     // Good Scenarios
//     const userData1 = {
//       dietType: 'balanced',
//       mealPortions: 'regular',
//       junkFoodIntake: 'occasionally',
//       hydration: 0.8,
//       addedSugarsIntake: 0.01,
//     };
//     const result1 = calculateDietaryHabitsScore(userData1);
//     console.log('Result 1:', result1);

// const userData2 = {
//   dietType: 'vegetarian',
//   mealPortions: 'small',
//   junkFoodIntake: 'rarely',
//   hydration: 0.6,
//   addedSugarsIntake: 0.03,
// };
//     const result2 = calculateDietaryHabitsScore(userData2);
//     console.log('Result 2:', result2);

//     // Bad Scenarios
//     try {
//       // Test with missing properties
//       const userData3 = {
//         dietType: 'balanced',
//         mealPortions: 'regular',
//         junkFoodIntake: 'occasionally',
//         hydration: 0.8,
//         // addedSugarsIntake is missing
//       };
//       const result3 = calculateDietaryHabitsScore(userData3);
//       console.log('Result 3:', result3);
//     } catch (error) {
//       console.error('Error in Result 3:', error.message);
//     }

//     try {
//       // Test with invalid input data (string for hydration)
//       const userData4 = {
//         dietType: 'balanced',
//         mealPortions: 'regular',
//         junkFoodIntake: 'occasionally',
//         hydration: '80%',
//         addedSugarsIntake: 0.01,
//       };
//       const result4 = calculateDietaryHabitsScore(userData4);
//       console.log('Result 4:', result4);
//     } catch (error) {
//       console.error('Error in Result 4:', error.message);
//     }

//     // Test with unknown values
//     const userData5 = {
//       dietType: 'unknown',
//       mealPortions: 'medium',
//       junkFoodIntake: 'sometimes',
//       hydration: 0.7,
//       addedSugarsIntake: 0.02,
//     };
//     const result5 = calculateDietaryHabitsScore(userData5);
//     console.log('Result 5:', result5);

//     // Test with hydration and addedSugarsIntake values outside the valid range
//     const userData6 = {
//       dietType: 'balanced',
//       mealPortions: 'large',
//       junkFoodIntake: 'often',
//       hydration: -0.1,
//       addedSugarsIntake: 1.5,
//     };
//     const result6 = calculateDietaryHabitsScore(userData6);
//     console.log('Result 6:', result6);
//   }

//   // Run the testing function
//   testCalculateDietaryHabitsScore();
