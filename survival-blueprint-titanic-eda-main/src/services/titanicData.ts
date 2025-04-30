
// This file contains mock data for the Titanic dataset

export interface Passenger {
  id: number;
  survived: number;
  pclass: number;
  name: string;
  sex: string;
  age: number | null;
  sibsp: number;
  parch: number;
  ticket: string;
  fare: number;
  cabin: string | null;
  embarked: string | null;
}

export interface FeatureImportanceType {
  feature: string;
  importance: number;
}

export interface SurvivalByFeature {
  category: string;
  survived: number;
  perished: number;
}

// Dataset stats
export const datasetStats = {
  totalPassengers: 891,
  survivalRate: 38.4,
  missingValues: {
    age: 177,
    cabin: 687,
    embarked: 2,
  },
  classDistribution: [
    { name: "First Class", value: 216 },
    { name: "Second Class", value: 184 },
    { name: "Third Class", value: 491 }
  ],
  genderDistribution: [
    { name: "Male", value: 577 },
    { name: "Female", value: 314 }
  ],
  ageDistribution: [
    { range: "0-10", count: 62 },
    { range: "10-20", count: 109 },
    { range: "20-30", count: 223 },
    { range: "30-40", count: 167 },
    { range: "40-50", count: 89 },
    { range: "50-60", count: 48 },
    { range: "60-70", count: 26 },
    { range: "70-80", count: 7 }
  ]
};

export const featureImportance: FeatureImportanceType[] = [
  { feature: "Sex", importance: 0.42 },
  { feature: "Fare", importance: 0.15 },
  { feature: "Age", importance: 0.12 },
  { feature: "Pclass", importance: 0.09 },
  { feature: "Embarked", importance: 0.08 },
  { feature: "SibSp", importance: 0.07 },
  { feature: "Parch", importance: 0.05 },
  { feature: "Title", importance: 0.02 }
];

export const survivalByClass: SurvivalByFeature[] = [
  { category: "1st Class", survived: 136, perished: 80 },
  { category: "2nd Class", survived: 87, perished: 97 },
  { category: "3rd Class", survived: 119, perished: 372 }
];

export const survivalByGender: SurvivalByFeature[] = [
  { category: "Female", survived: 233, perished: 81 },
  { category: "Male", survived: 109, perished: 468 }
];

export const survivalByAge: SurvivalByFeature[] = [
  { category: "Child (<18)", survived: 57, perished: 52 },
  { category: "Adult (18-60)", survived: 261, perished: 449 },
  { category: "Senior (>60)", survived: 24, perished: 48 }
];

export const survivalByEmbarked: SurvivalByFeature[] = [
  { category: "Cherbourg", survived: 93, perished: 75 },
  { category: "Queenstown", survived: 44, perished: 47 },
  { category: "Southampton", survived: 217, perished: 427 }
];

export const samplePassengers: Passenger[] = [
  {
    id: 1,
    survived: 0,
    pclass: 3,
    name: "Braund, Mr. Owen Harris",
    sex: "male",
    age: 22,
    sibsp: 1,
    parch: 0,
    ticket: "A/5 21171",
    fare: 7.25,
    cabin: null,
    embarked: "S"
  },
  {
    id: 2,
    survived: 1,
    pclass: 1,
    name: "Cumings, Mrs. John Bradley (Florence Briggs Thayer)",
    sex: "female",
    age: 38,
    sibsp: 1,
    parch: 0,
    ticket: "PC 17599",
    fare: 71.2833,
    cabin: "C85",
    embarked: "C"
  },
  {
    id: 3,
    survived: 1,
    pclass: 3,
    name: "Heikkinen, Miss. Laina",
    sex: "female",
    age: 26,
    sibsp: 0,
    parch: 0,
    ticket: "STON/O2. 3101282",
    fare: 7.925,
    cabin: null,
    embarked: "S"
  },
  {
    id: 4,
    survived: 1,
    pclass: 1,
    name: "Futrelle, Mrs. Jacques Heath (Lily May Peel)",
    sex: "female",
    age: 35,
    sibsp: 1,
    parch: 0,
    ticket: "113803",
    fare: 53.1,
    cabin: "C123",
    embarked: "S"
  },
  {
    id: 5,
    survived: 0,
    pclass: 3,
    name: "Allen, Mr. William Henry",
    sex: "male",
    age: 35,
    sibsp: 0,
    parch: 0,
    ticket: "373450",
    fare: 8.05,
    cabin: null,
    embarked: "S"
  }
];

// Statistical summary
export const statisticalSummary = {
  age: { 
    min: 0.42, 
    max: 80.0, 
    mean: 29.7, 
    median: 28.0 
  },
  fare: { 
    min: 0.0, 
    max: 512.33, 
    mean: 32.2, 
    median: 14.45 
  },
  sibsp: { 
    min: 0, 
    max: 8, 
    mean: 0.52, 
    median: 0 
  },
  parch: { 
    min: 0, 
    max: 6, 
    mean: 0.38, 
    median: 0 
  }
};

// Correlation data
export const correlationData = [
  { feature: "Sex_female", correlation: 0.543, value: 54.3 },
  { feature: "Pclass", correlation: -0.338, value: -33.8 },
  { feature: "Fare", correlation: 0.257, value: 25.7 },
  { feature: "Age", correlation: -0.077, value: -7.7 },
  { feature: "SibSp", correlation: -0.035, value: -3.5 },
  { feature: "Parch", correlation: 0.082, value: 8.2 }
];
