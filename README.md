# ❌OUDATED❌

# healthScoreAlgorithm

A continuous scoring system, also known as a cardinal scoring system, is often advantageous in health assessment algorithms because it provides a more nuanced and precise measure of health status compared to a categorical scoring system.

Here are some reasons for adopting a continuous scoring system:

Granularity: Continuous scores capture subtle differences in health metrics. For example, a person with a BMI of 24.9 should ideally have a better score than someone with a BMI of 25.1, despite both being close to the threshold. This nuance is often lost in categorical scoring systems.

Better Trend Analysis: Continuous scores allow for better tracking of health trends over time. Small improvements or declines in health can be more readily observed, which can be motivating for users and can help health professionals identify and respond to changes earlier.

Personalization: Continuous scoring systems can better account for individual differences in health risk. For example, someone with a BMI of 35 is at greater health risk than someone with a BMI of 30, and this difference is clearer with a continuous scoring system.

Encouraging Improvement: By providing a more accurate score, continuous scoring systems encourage improvements even within the same category. For example, someone within the 'overweight' category (BMI 25–30) might still strive to lower their BMI from 28 to 26, even though the category is the same.

Better Integration with Machine Learning Models: If in the future, you decide to incorporate machine learning models for health prediction, continuous labels (scores) often provide better training signals than categorical labels.

To illustrate this in the context of the health score algorithm, consider the BMI score calculation. Instead of assigning the same score to all users with a BMI in the 'healthy' range (18.5 to 24.9), a continuous score provides more granular information, rewarding users at the lower end of the 'healthy' range with a higher score and those at the upper end with a lower score. This gives a more accurate representation of the health risk associated with BMI and incentivizes users to strive for a BMI that is not just within the 'healthy' range but at the optimal point within this range.

#### Return data

**Healthy young adult**

```bash
{
"finalScore": 92.3,
"age": 24,
"gender": "Male",
"details": {
"bmi": {
"value": 22,
"score": 92,
"normalRange": "18.5 - 24.9",
"isNormal": true
},
"bloodPressure": {
"value": {
"systolic": 110,
"diastolic": 70
},
"score": 95,
"normalRange": "Systolic: <120, Diastolic: <80",
"isNormal": true
},
"smoking": {
"value": "non-smoker",
"score": 100,
"normalRange": "Non-smoker",
"isNormal": true
}
}
}
```

**Middle-aged Overweight Smoker**

```bash
{
  "finalScore": 48.6,
  "age": 50,
  "gender": "Male",
  "details": {
    "bmi": {
      "value": 32.9,
      "score": 33,
      "normalRange": "18.5 - 24.9",
      "isNormal": false
    },
    "bloodPressure": {
      "value": {
        "systolic": 130,
        "diastolic": 85
      },
      "score": 66,
      "normalRange": "Systolic: <120, Diastolic: <80",
      "isNormal": false
    },
    "smoking": {
      "value": "current-smoker",
      "score": 0,
      "normalRange": "Non-smoker",
      "isNormal": false
    }
  }
}
```

**Elderly Woman with Hypertension**

```bash
{
  "finalScore": 68.2,
  "age": 70,
  "gender": "Female",
  "details": {
    "bmi": {
      "value": 27.3,
      "score": 71,
      "normalRange": "18.5 - 24.9",
      "isNormal": false
    },
    "bloodPressure": {
      "value": {
        "systolic": 160,
        "diastolic": 95
      },
      "score": 46,
      "normalRange": "Systolic: <120, Diastolic: <80",
      "isNormal": false
    },
    "smoking": {
      "value": "non-smoker",
      "score": 100,
      "normalRange": "Non-smoker",
      "isNormal": true
    }
  }
}
```

#### Ranges for the final score

**Excellent (81-100)**
This would signify that the individual has excellent health based on their BMI, blood pressure, and smoking status. The user is generally in the optimal range for all factors.

**Very Good (61-80)**
This would indicate very good health. There may be slight deviations from the optimal range in one or more factors, but generally, this range still signifies very good health.

**Good (41-60)**
This range would signify good health, but improvements can be made in one or more areas to achieve optimal health.

**Fair (21-40)**
A score in this range would be a signal that the individual's health needs attention in one or more areas.

**Poor (0-20)**
This would indicate a high risk and a need for immediate attention and potentially medical intervention. It's likely that multiple health factors are outside the optimal range.
