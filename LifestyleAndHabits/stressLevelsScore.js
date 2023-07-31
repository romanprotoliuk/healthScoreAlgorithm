module.exports.calculateStressLevelsScore = function calculateStressLevelsScore(data) {
        // Validate input data
        if (typeof data !== 'object' || data === null) {
          throw new Error('Input data must be an object.');
        }
      
        const factors = [
          {
            factor: 'dailyRoutine',
            score: data.dailyRoutine,
            description: 'Your daily routine is contributing positively to stress management.',
          },
          {
            factor: 'emotionalWellBeing',
            score: data.emotionalWellBeing,
            description: 'Your emotional well-being is in the ideal range, contributing to balanced stress levels.',
          },
          {
            factor: 'socialSupport',
            score: data.socialSupport,
            description: 'Your social support is aiding in stress management.',
          },
          {
            factor: 'workRelatedStress',
            score: data.workRelatedStress,
            description: 'You experience moderate levels of stress related to work.',
          },
          {
            factor: 'stressCopingMechanisms',
            score: data.stressCopingMechanisms,
            description: 'Your stress coping mechanisms are effective in managing stress.',
          },
          {
            factor: 'lifeEvents',
            score: data.lifeEvents,
            description: 'Life events are not significantly contributing to your stress levels.',
          },
          {
            factor: 'stressPerception',
            score: data.stressPerception,
            description: 'Your perception of stress is moderate, contributing to balanced stress levels.',
          },
        ];
      
        // Validate factor scores
        for (const factor of factors) {
          if (!Number.isInteger(factor.score) || factor.score < 0 || factor.score > 10) {
            throw new Error(`Invalid score for factor '${factor.factor}'. Score must be an integer between 0 and 10.`);
          }
        }
      
        const totalScore = factors.reduce((sum, factor) => sum + factor.score, 0);
        const stressScore = Math.round((totalScore / factors.length) * 10);
      
        const normalizedScores = factors.map((factor) => ({
          factor: factor.factor,
          score: factor.score,
          description: factor.description,
          isNormal: factor.score >= 5, // You can adjust the threshold here as needed
        }));
      
        return {
          stressScore,
          factors: normalizedScores,
        };
      }
      
      
      
    //   // Sample Data
    //   const dataSample1 = {
    //     dailyRoutine: 9,
    //     emotionalWellBeing: 9,
    //     socialSupport: 8,
    //     workRelatedStress: 8,
    //     stressCopingMechanisms: 10,
    //     lifeEvents: 8,
    //     stressPerception: 7,
    //   };
      
    //   const outputSample1 = calculateStressLevelsScore(dataSample1);
    //   console.log(outputSample1);
           
      
      

// dailyRoutine: This variable assesses how well the user's daily routine is structured and organized. A higher score (closer to 10) indicates a well-managed and balanced daily routine, which may lead to reduced stress levels. On the other hand, a lower score (closer to 1) suggests a disorganized or stressful daily routine, potentially contributing to higher stress levels.

// emotionalWellBeing: This variable measures the user's overall emotional well-being and mental health. A higher score (closer to 10) indicates a positive emotional state, good mental health, and the ability to manage emotions effectively. A lower score (closer to 1) may indicate emotional struggles or challenges, which could contribute to higher stress levels.

// socialSupport: This variable reflects the level of social support the user has from family, friends, or a support network. A higher score (closer to 10) suggests strong social connections and a reliable support system, which can act as a buffer against stress. A lower score (closer to 1) indicates limited social support, which may contribute to increased stress levels.

// workRelatedStress: This variable assesses the level of stress the user experiences in their work or professional environment. A higher score (closer to 10) suggests a high level of work-related stress, which could be due to workload, job demands, or other factors. A lower score (closer to 1) indicates a less stressful work environment.

// stressCopingMechanisms: This variable evaluates the user's ability to cope with stress effectively. A higher score (closer to 10) suggests strong stress coping skills and healthy coping mechanisms, which can help manage stress. A lower score (closer to 1) indicates potential difficulties in coping with stress, leading to higher stress levels.

// lifeEvents: This variable takes into account significant life events or changes that the user may have experienced recently. A higher score (closer to 10) indicates the presence of major life events that can cause stress, such as moving, job changes, or relationship changes. A lower score (closer to 1) suggests a relative absence of recent major life events.

// stressPerception: This variable represents the user's subjective perception of their stress levels. A higher score (closer to 10) indicates that the user perceives themselves to be highly stressed. A lower score (closer to 1) suggests a lower perception of stress.

// In the user interface, these variables can be presented as sliders or input fields with a scale from 1 to 10, allowing users to provide their self-assessment for each factor. The user's input for each variable will then be used to calculate the overall Stress Levels Score, which represents the combined impact of these factors on the user's stress levels. The algorithm will also provide insights on each factor's score, helping the user understand which areas contribute more or less to their stress levels.
