const { getHealthScore } = require('./PhysicalHealth/healthScore');



// const score = getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker')
// console.log(getHealthScore(24, 'male', 70, 170, 120, 80, 'non-smoker'));
// console.log(score.details.bloodPressure)

console.log(getHealthScore(50, 'female', 60, 160, 130, 90, 'ex-smoker'));