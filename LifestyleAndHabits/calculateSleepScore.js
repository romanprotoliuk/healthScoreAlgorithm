exports.calculateSleepScore = function calculateSleepScore(sleepData) {
  // Validate sleepData
  if (
    !sleepData ||
    typeof sleepData !== "object" ||
    !Array.isArray(sleepData.nights) ||
    sleepData.nights.length === 0
  ) {
    throw new Error(
      "Invalid sleep data. Please provide an object with an array of nights' sleep data."
    );
  }

  // Calculate weekly averages
  const numNights = sleepData.nights.length;
  let totalSleepTimeSum = 0;
  let remSleepTimeSum = 0;
  let deepSleepTimeSum = 0;
  let restingHeartRateSum = 0;
  let heartRateVariabilitySum = 0;

  for (const night of sleepData.nights) {
    if (
      !night ||
      typeof night !== "object" ||
      typeof night.date !== "string" ||
      typeof night.totalTime !== "number" ||
      typeof night.remTime !== "number" ||
      typeof night.deepTime !== "number" ||
      typeof night.heartRate !== "number" ||
      typeof night.heartRateVariability !== "number"
    ) {
      throw new Error(
        "Invalid night's sleep data. Please provide valid data for each night."
      );
    }

    totalSleepTimeSum += night.totalTime;
    remSleepTimeSum += night.remTime;
    deepSleepTimeSum += night.deepTime;
    restingHeartRateSum += night.heartRate;
    heartRateVariabilitySum += night.heartRateVariability;
  }

  const averageTotalTime = totalSleepTimeSum / numNights; // Average total sleep time in minutes
  const averageRemTime = Math.floor((remSleepTimeSum / numNights) * 10) / 10; // Average time spent in REM sleep in minutes

  const averageDeepTime = Math.floor((deepSleepTimeSum / numNights) * 10) / 10; // Average time spent in deep sleep in minutes
  const averageRestingHeartRate =
    Math.floor((restingHeartRateSum / numNights) * 10) / 10; // Average resting heart rate during sleep in bpm
  const averageHeartRateVariability =
    Math.floor((heartRateVariabilitySum / numNights) * 10) / 10; // Average heart rate variability during sleep in ms

  // Calculate average sleep duration in hours
  // const averageSleepDuration = parseFloat(Math.round(averageTotalTime / 60).toFixed(2))
  const averageSleepDuration = Math.floor((averageTotalTime / 60) * 10) / 10;

  // Calculate sleep quality based on REM and deep sleep times
  const averageSleepQuality =
    (averageRemTime + averageDeepTime) / averageTotalTime; // Normalize the sleep quality to a value between 0 and 1

  // Define sleep quality ranges and corresponding labels
  const sleepQualityRanges = [
    { label: "Excellent", min: 0.9, max: 1.0 },
    { label: "Good", min: 0.75, max: 0.9 },
    { label: "Fair", min: 0.5, max: 0.75 },
    { label: "Poor", min: 0.25, max: 0.5 },
    { label: "Very Poor", min: 0, max: 0.25 },
  ];

  // Find the sleep quality label based on sleep quality value
  let sleepQualityLabel;
  for (const range of sleepQualityRanges) {
    if (averageSleepQuality >= range.min && averageSleepQuality <= range.max) {
      sleepQualityLabel = range.label;
      break;
    }
  }

  // Calculate the Sleep Score based on the weekly averages
  // logic here based on the calculated averages
  // linear approach
  const totalTimeScore = Math.min(100, (averageTotalTime / 480) * 100); // Normalize to 8 hours as the target
  const remTimeScore = Math.min(100, (averageRemTime / 90) * 100); // Normalize to 90 minutes as the target
  const deepTimeScore = Math.min(100, (averageDeepTime / 120) * 100); // Normalize to 120 minutes as the target
  const restingHeartRateScore = Math.min(
    100,
    100 - (averageRestingHeartRate - 60)
  ); // Lower heart rate is better
  const heartRateVariabilityScore = Math.min(
    100,
    (averageHeartRateVariability / 10) * 100
  ); // Normalize to 10 ms as the target
  const sleepQualityScore = Math.min(100, averageSleepQuality * 100); // Normalize sleep quality to a score out of 100

  // Calculate the overall sleep score using equal weightage for each component
  const sleepScore = Math.round(
    (totalTimeScore +
      remTimeScore +
      deepTimeScore +
      restingHeartRateScore +
      heartRateVariabilityScore +
      sleepQualityScore) /
      6
  );

  // Define the threshold for considering average sleep duration as normal
  const normalSleepDurationThreshold = 7; // 7 hours

  // Define the range for considering sleep quality as normal
  const normalSleepQualityRange = {
    min: 0.75, // Minimum sleep quality score for normal sleep
    max: 1.0, // Maximum sleep quality score for normal sleep
  };

  // Define the range for considering heart rate variability as normal
  const normalHeartRateVariabilityRange = {
    min: 40, // Minimum average heart rate variability for normal sleep
    max: 50, // Maximum average heart rate variability for normal sleep
  };

  // Determine if the average sleep duration is normal
  const isNormalSleepDuration =
    averageSleepDuration >= normalSleepDurationThreshold;

  // Determine if the sleep quality is normal
  const isNormalSleepQuality =
    averageSleepQuality >= normalSleepQualityRange.min &&
    averageSleepQuality <= normalSleepQualityRange.max;

  // Determine if the heart rate variability is normal
  const isNormalHeartRateVariability =
    averageHeartRateVariability >= normalHeartRateVariabilityRange.min &&
    averageHeartRateVariability <= normalHeartRateVariabilityRange.max;

  // Consider all factors to determine if the sleep is normal or not
  const isNormal =
    isNormalSleepDuration &&
    isNormalSleepQuality &&
    isNormalHeartRateVariability;

  // Return the sleep score and other relevant data
  return {
    sleepScore,
    averageSleepDuration,
    averageRemTime,
    averageDeepTime,
    averageRestingHeartRate,
    averageHeartRateVariability,
    sleepQuality: Math.round(averageSleepQuality * 100), // Provide the normalized sleep quality value between 0 and 1
    sleepQualityLabel,
    isNormal,
  };
};
