// In the context of this health score algorithm, "weights" are used to signify the importance of 
// each health metric (BMI, blood pressure, smoking status, etc.) in calculating the final health score. 
// The weight value is multiplied by the score for each respective metric. Higher weights mean the associated 
// metric has more influence on the final health score.

// bmi: Math.max(0.1, 0.4 - age * 0.005): The weight assigned to BMI decreases with age, starting at a maximum 
// of 0.4 for age zero and decreasing by 0.005 for each year of age. This is capped at a minimum of 0.1 to ensure 
// that BMI always has at least some influence on the health score. The rationale could be that, while BMI is an 
// important health indicator for people of all ages, other factors like blood pressure may become more significant 
// as a person ages.

// bloodPressure: Math.min(0.4, 0.1 + age * 0.005): The weight assigned to blood pressure increases with age, 
// starting at a minimum of 0.1 for age zero and increasing by 0.005 for each year of age, up to a maximum of 0.4. 
// This suggests that the significance of blood pressure as a health indicator increases as a person ages.

// smoking: 0.2: The weight assigned to smoking status is a constant 0.2, suggesting that smoking status is always 
// considered a significant health indicator, regardless of age.

// In the getHealthScore function, these weights are used to calculate the weighted scores for each of BMI, 
// blood pressure, and smoking. These weighted scores are then added together to produce the final health score. 
// An additional term is included to account for a potential interaction effect between BMI and blood pressure. 
// If both BMI and systolic blood pressure are above certain thresholds (25 and 120, respectively), an additional 
// 0.1 is added to the health score.

// This is a simple, illustrative implementation and it could be improved. For instance, the weights could be determined 
// based on empirical health data or medical guidelines, instead of hardcoded linear relationships with age. 
// Additionally, the health metrics could be normalized before calculating the health score to avoid the score being 
// dominated by metrics with larger numerical ranges. The interaction effects between different health metrics could also 
// be explored further.

exports.getWeights = function getWeights(age) {
    if (isNaN(age) || age < 0) throw new Error("Invalid age. Age must be a non-negative number.");
    return {
        bmi: Math.max(0.1, 0.4 - age * 0.005), 
        bloodPressure: Math.min(0.4, 0.1 + age * 0.005),
        smoking: 0.2
    };
}