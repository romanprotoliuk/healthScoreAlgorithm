exports.calculateAlcoholScore = function calculateAlcoholScore(weeklyDrinks) {
  // Validation
  if (typeof weeklyDrinks !== "number" || weeklyDrinks < 0) {
    throw new Error(
      "Invalid alcohol consumption data. Weekly drinks must be a non-negative number."
    );
  }

  let score;
  let category;

  if (weeklyDrinks === 0) {
    score = 100;
    category = "Non-drinker";
  } else if (weeklyDrinks <= 3) {
    score = 80;
    category = "Low alcohol consumption";
  } else if (weeklyDrinks <= 7) {
    score = 50;
    category = "Moderate alcohol consumption";
  } else {
    score = 20;
    category = "High alcohol consumption";
  }

  return { score, category };
};
