exports.calculateSleepScore = function calculateSleepScore(sleepData) {
    // Validate sleepData
    if (!sleepData || typeof sleepData !== 'object' || !Array.isArray(sleepData.nights) || sleepData.nights.length === 0) {
        throw new Error("Invalid sleep data. Please provide an object with an array of nights' sleep data.");
    }

    // Calculate weekly averages
    const numNights = sleepData.nights.length;
    let totalSleepTimeSum = 0;
    let remSleepTimeSum = 0;
    let deepSleepTimeSum = 0;
    let restingHeartRateSum = 0;
    let heartRateVariabilitySum = 0;

    for (const night of sleepData.nights) {
        if (!night || typeof night !== 'object' || typeof night.date !== 'string' || typeof night.totalTime !== 'number' || typeof night.remTime !== 'number' || typeof night.deepTime !== 'number' || typeof night.heartRate !== 'number' || typeof night.heartRateVariability !== 'number') {
            throw new Error("Invalid night's sleep data. Please provide valid data for each night.");
        }

        totalSleepTimeSum += night.totalTime;
        remSleepTimeSum += night.remTime;
        deepSleepTimeSum += night.deepTime;
        restingHeartRateSum += night.heartRate;
        heartRateVariabilitySum += night.heartRateVariability;
    }

    const averageTotalTime = totalSleepTimeSum / numNights; // Average total sleep time in minutes
    const averageRemTime = remSleepTimeSum / numNights; // Average time spent in REM sleep in minutes
    const averageDeepTime = deepSleepTimeSum / numNights; // Average time spent in deep sleep in minutes
    const averageRestingHeartRate = restingHeartRateSum / numNights; // Average resting heart rate during sleep in bpm
    const averageHeartRateVariability = heartRateVariabilitySum / numNights; // Average heart rate variability during sleep in ms

    // Calculate average sleep duration in hours
    const averageSleepDuration = averageTotalTime / 60;

    // Calculate sleep quality based on REM and deep sleep times
    const averageSleepQuality = (averageRemTime + averageDeepTime) / averageTotalTime; // Normalize the sleep quality to a value between 0 and 1

    // Calculate the Sleep Score based on the weekly averages
    // Add your scoring logic here based on the calculated averages
    // For demonstration purposes, we will use a simple linear scoring approach
    const totalTimeScore = Math.min(100, (averageTotalTime / 480) * 100); // Normalize to 8 hours as the target
    const remTimeScore = Math.min(100, (averageRemTime / 90) * 100); // Normalize to 90 minutes as the target
    const deepTimeScore = Math.min(100, (averageDeepTime / 120) * 100); // Normalize to 120 minutes as the target
    const restingHeartRateScore = Math.min(100, 100 - (averageRestingHeartRate - 60)); // Lower heart rate is better
    const heartRateVariabilityScore = Math.min(100, (averageHeartRateVariability / 10) * 100); // Normalize to 10 ms as the target
    const sleepQualityScore = Math.min(100, averageSleepQuality * 100); // Normalize sleep quality to a score out of 100

    // Calculate the overall sleep score using equal weightage for each component
    const sleepScore = Math.round((totalTimeScore + remTimeScore + deepTimeScore + restingHeartRateScore + heartRateVariabilityScore + sleepQualityScore) / 6);

    // Return the sleep score and other relevant data
    return {
        sleepScore,
        averageSleepDuration,
        averageRemTime,
        averageDeepTime,
        averageRestingHeartRate,
        averageHeartRateVariability,
        sleepQuality: averageSleepQuality // Provide the normalized sleep quality value between 0 and 1
    };
};
