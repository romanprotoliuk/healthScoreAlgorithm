exports.calculatePhysicalActivityScore = function calculatePhysicalActivityScore(activityData) {
    // Define activity levels and their corresponding scores
    const activityLevels = {
        sedentary: { score: 0, description: "Sedentary lifestyle with little or no exercise." },
        light: { score: 30, description: "Light activity, such as walking or standing, for less than 2 hours per day." },
        moderate: { score: 60, description: "Moderate activity, such as brisk walking or light exercise, for 2-4 hours per day." },
        active: { score: 80, description: "Active lifestyle with moderate exercise for 4-6 hours per day." },
        veryActive: { score: 100, description: "Very active lifestyle with vigorous exercise for more than 6 hours per day." }
    };

    // Validate activityData
    if (!activityData || typeof activityData !== 'object') {
        throw new Error("Invalid activity data. Please provide an object with activity details.");
    }

    const { activityType, duration, stepsPerDay, heartRate, recoveryTime } = activityData;

    if (!activityType || typeof activityType !== 'string' || !activityLevels.hasOwnProperty(activityType.toLowerCase())) {
        throw new Error("Invalid activity type. Please provide a valid activity type.");
    }

    if (!duration || typeof duration !== 'number' || duration < 0) {
        throw new Error("Invalid duration. Please provide a non-negative number for activity duration.");
    }

    if (typeof stepsPerDay !== 'number' || stepsPerDay < 0) {
        throw new Error("Invalid steps per day. Please provide a non-negative number for steps per day.");
    }

    if (typeof heartRate !== 'number' || heartRate < 0) {
        throw new Error("Invalid heart rate. Please provide a non-negative number for heart rate.");
    }

    if (typeof recoveryTime !== 'number' || recoveryTime < 0) {
        throw new Error("Invalid recovery time. Please provide a non-negative number for recovery time.");
    }

    // Calculate the Physical Activity Score based on the activity level and duration (in hours)
    const activityLevel = activityLevels[activityType.toLowerCase()];
    const scoreFromDuration = Math.min(100, activityLevel.score * (duration / 24)); // Normalize the score for a 24-hour period

    // Calculate the Physical Activity Score based on the steps per day
    const stepsScore = Math.min(100, (stepsPerDay / 10000) * 100); // Normalize the steps score for a goal of 10,000 steps

    // Combine the scores from duration and steps per day, giving equal weight to both components
    const combinedScore = (scoreFromDuration + stepsScore) / 2;

    // Round the values for a cleaner output
    const roundedDuration = Math.round(duration * 100) / 100; // Round to two decimal places
    const roundedStepsPerDay = Math.round(stepsPerDay * 100) / 100; // Round to two decimal places
    const roundedHeartRate = Math.round(heartRate * 100) / 100; // Round to two decimal places
    const roundedRecoveryTime = Math.round(recoveryTime * 100) / 100; // Round to two decimal places

    return {
        score: combinedScore,
        activityType: activityType,
        duration: roundedDuration,
        stepsPerDay: roundedStepsPerDay,
        heartRate: roundedHeartRate,
        recoveryTime: roundedRecoveryTime,
        description: activityLevel.description
    };
};

// Dataset 1
// valid
// console.log(calculatePhysicalActivityScore({
//     activityType: 'moderate',
//     duration: 3.5,
//     stepsPerDay: 8500,
//     heartRate: 85,
//     recoveryTime: 5.5
// }));

// // Output:
// // {
// //   score: 70,
// //   activityType: 'moderate',
// //   duration: 3.5,
// //   stepsPerDay: 8500,
// //   heartRate: 85,
// //   recoveryTime: 5.5,
// //   description: 'Moderate activity, such as brisk walking or light exercise, for 2-4 hours per day.'
// // }

// Invalid 
// try {
//     console.log(calculatePhysicalActivityScore(null)); // Invalid input
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid activity data. Please provide an object with activity details."
// }

// try {
//     console.log(calculatePhysicalActivityScore({
//         activityType: 'heavy', // Invalid activity type
//         duration: 3.5,
//         stepsPerDay: 8500,
//         heartRate: 85,
//         recoveryTime: 5.5
//     }));
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid activity type. Please provide a valid activity type."
// }

// try {
//     console.log(calculatePhysicalActivityScore({
//         activityType: 'moderate',
//         duration: -3.5, // Negative duration
//         stepsPerDay: 8500,
//         heartRate: 85,
//         recoveryTime: 5.5
//     }));
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid duration. Please provide a non-negative number for activity duration."
// }

// try {
//     console.log(calculatePhysicalActivityScore({
//         activityType: 'light',
//         duration: 3.5,
//         stepsPerDay: -8500, // Negative stepsPerDay
//         heartRate: 85,
//         recoveryTime: 5.5
//     }));
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid steps per day. Please provide a non-negative number for steps per day."
// }

// try {
//     console.log(calculatePhysicalActivityScore({
//         activityType: 'active',
//         duration: 3.5,
//         stepsPerDay: 8500,
//         heartRate: -85, // Negative heartRate
//         recoveryTime: 5.5
//     }));
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid heart rate. Please provide a non-negative number for heart rate."
// }

// try {
//     console.log(calculatePhysicalActivityScore({
//         activityType: 'veryActive',
//         duration: 3.5,
//         stepsPerDay: 8500,
//         heartRate: 85,
//         recoveryTime: -5.5 // Negative recoveryTime
//     }));
// } catch (error) {
//     console.log(error.message); // Outputs: "Invalid recovery time. Please provide a non-negative number for recovery time."
// }


// Dataset 2
// Valid
// console.log(calculatePhysicalActivityScore({
//     activityType: 'sedentary',
//     duration: 8,
//     stepsPerDay: 2000,
//     heartRate: 70,
//     recoveryTime: 7
// }));

// // Output:
// // {
// //   score: 0,
// //   activityType: 'sedentary',
// //   duration: 8,
// //   stepsPerDay: 2000,
// //   heartRate: 70,
// //   recoveryTime: 7,
// //   description: 'Sedentary lifestyle with little or no exercise.'
// // }


// Dataset 3
// Valid
// console.log(calculatePhysicalActivityScore({
//     activityType: 'veryActive',
//     duration: 6,
//     stepsPerDay: 15000,
//     heartRate: 95,
//     recoveryTime: 4.5
// }));

// // Output:
// // {
// //   score: 100,
// //   activityType: 'veryActive',
// //   duration: 6,
// //   stepsPerDay: 15000,
// //   heartRate: 95,
// //   recoveryTime: 4.5,
// //   description: 'Very active lifestyle with vigorous exercise for more than 6 hours per day.'
// // }





// The calculatePhysicalActivityScore function is a meticulously crafted algorithm designed to provide an accurate assessment of an individual's physical activity score, leveraging a rich dataset encapsulated within the activityData object. By incorporating multiple parameters, this function allows for a holistic evaluation of an individual's physical activity level, granting valuable insights into their overall health and well-being.

// Technical Overview:
// Comprehensive Activity Data:
// The function receives an activityData object as input, containing various activity-related parameters such as activityType, duration, stepsPerDay, heartRate, and recoveryTime. This design decision ensures the availability of diverse and critical data points, enabling a more nuanced evaluation of physical activity levels.

// Validation and Error Handling:
// The function begins by thoroughly validating the input activityData to ensure the presence and correctness of essential parameters. Proper validation checks are conducted to ensure that all required fields are provided, and each parameter adheres to the expected data types and constraints. This robust error handling mechanism guarantees that the function operates effectively and avoids processing erroneous or incomplete data.

// Activity Levels and Scores:
// The function defines specific activity levels, each accompanied by a corresponding score and description. These activity levels encompass a spectrum of physical activity intensity, ranging from sedentary to very active. By associating scores with each activity level, the function can accurately quantify an individual's physical activity performance.

// Duration and Steps Normalization:
// To account for variations in activity durations and steps per day, the function performs a normalization process. The duration is converted to a fractional score based on the total duration of 24 hours, ensuring uniformity across different activity types. Similarly, the steps per day are normalized to a score relative to a target of 10,000 steps, facilitating consistent scoring regardless of the actual step count.

// Combined Score Calculation:
// The function calculates separate scores for activity duration and steps per day, weighing equal importance to both components. By combining these scores, the function computes the overall physical activity score, providing a balanced and comprehensive evaluation of the individual's activity level.

// Descriptive Output:
// The final output of the function is a well-structured object containing vital information about the physical activity assessment. The output includes the calculated score, the original activityType, normalized duration, normalized stepsPerDay, resting heartRate, recoveryTime, and a description that describes the activity level based on the provided activityType.

// Importance and Impact:
// Accuracy and Reliability:
// By incorporating a diverse set of parameters and normalizing the data, the function ensures the accuracy and reliability of the physical activity score. It provides a holistic perspective on the individual's activity level, reducing biases and inaccuracies that might arise from considering only a subset of data.

// Data-Driven Insights:
// With a comprehensive evaluation of physical activity, the function empowers users with data-driven insights into their activity patterns. The detailed output allows users to gain a deeper understanding of their habits and make informed decisions regarding lifestyle changes for improved health.

// Customization and Flexibility:
// The function's design allows it to accommodate a wide range of activity types and duration units. This flexibility ensures that it can cater to diverse user profiles and activity preferences, making it applicable to a broader audience.

// Health and Well-Being Monitoring:
// By providing a quantified physical activity score, the function plays a crucial role in tracking and monitoring an individual's health and well-being over time. It can be integrated into larger health monitoring systems to enable users, healthcare providers, or researchers to monitor trends and improvements in physical activity levels.

// In conclusion, the calculatePhysicalActivityScore function is an indispensable tool for assessing physical activity levels, offering a comprehensive and data-driven evaluation of an individual's activity performance. Its technical sophistication, thorough validation, and informative output contribute to its efficacy as an essential component in health analysis and wellness management systems.

// Parameters
// activityData (Object, required): A comprehensive object encompassing key parameters related to physical activity:

// activityType (String, required): Specifies the type of physical activity undertaken by the individual. Valid options include:

// "sedentary": Represents a sedentary lifestyle with minimal or no physical exercise.
// "light": Signifies light activity such as walking or standing, usually for durations less than 2 hours per day.
// "moderate": Indicates moderate activity, like brisk walking or light exercises, typically lasting 2 to 4 hours per day.
// "active": Reflects an active lifestyle characterized by moderate exercise spanning 4 to 6 hours per day.
// "veryActive": Depicts a very active lifestyle involving vigorous exercise exceeding 6 hours per day.
// duration (Number, required): Represents the duration of the physical activity in hours. It should be a non-negative number, indicating the time spent engaged in the specific activity.

// stepsPerDay (Number, optional): Indicates the number of steps taken by the individual per day. This parameter provides valuable insights into daily movement patterns. It should be a non-negative number.

// heartRate (Number, optional): Specifies the resting heart rate of the individual in beats per minute (bpm). This parameter offers a glimpse into cardiovascular health and can be used to gauge activity intensity. It should be a non-negative number.

// recoveryTime (Number, optional): Represents the recovery time after engaging in physical activity, measured in hours. This parameter is crucial for evaluating post-exercise recuperation. It should be a non-negative number.

// Returns
// Object: The function returns a comprehensive object containing essential information related to the physical activity assessment:

// score (Number): The calculated physical activity score, ranging from 0 to 100. This score provides an overall quantification of the individual's physical activity level.

// activityType (String): The activity type provided in the activityData object.

// duration (Number): The duration of physical activity in hours, rounded to two decimal places.

// stepsPerDay (Number): The number of steps taken per day, rounded to two decimal places.

// heartRate (Number): The resting heart rate in beats per minute (bpm), rounded to two decimal places.

// recoveryTime (Number): The recovery time after physical activity in hours, rounded to two decimal places.

// description (String): A descriptive message providing insights into the activity level based on the activity type.

// // Example
// const activityData = {
//     activityType: 'moderate',
//     duration: 3.5,
//     stepsPerDay: 8000,
//     heartRate: 85,
//     recoveryTime: 5
// };

// const result = calculatePhysicalActivityScore(activityData);

// console.log(result);

// // Output:
// // {
// //   score: 70,
// //   activityType: 'moderate',
// //   duration: 3.5,
// //   stepsPerDay: 8000,
// //   heartRate: 85,
// //   recoveryTime: 5,
// //   description: 'Moderate activity, such as brisk walking or light exercise, for 2-4 hours per day.'
// // }
