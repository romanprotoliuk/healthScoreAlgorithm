exports.calculateAlcoholScore = function calculateAlcoholScore(weeklyDrinks) {
  // Validation
  if (typeof weeklyDrinks !== "number" || weeklyDrinks < 0) {
    throw new Error(
      "Invalid alcohol consumption data. Weekly drinks must be a non-negative number."
    );
  }

  let score;
  let category;
  let isNormal;

  if (weeklyDrinks === 0) {
    score = 100;
    category = "Non-drinker";
    isNormal = true;
  } else if (weeklyDrinks <= 3) {
    score = 80;
    category = "Low alcohol consumption";
    isNormal = true;
  } else if (weeklyDrinks <= 7) {
    score = 50;
    category = "Moderate alcohol consumption";
    isNormal = false;
  } else {
    score = 20;
    category = "High alcohol consumption";
    isNormal = false;
  }

  return { score, category, isNormal };
};
