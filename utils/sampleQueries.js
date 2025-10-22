// Sample queries for testing the system

const sampleQueries = [
  {
    query: "I am buying my first home",
    expectedIntent: "housing",
    description: "First-time home buyer looking for housing schemes"
  },
  {
    query: "I want to start a small business",
    expectedIntent: "business",
    description: "Entrepreneur seeking business loan schemes"
  },
  {
    query: "I need health insurance for my family",
    expectedIntent: "healthcare",
    description: "Family looking for health insurance coverage"
  },
  {
    query: "Looking for job training programs",
    expectedIntent: "employment",
    description: "Individual seeking skill development and employment"
  },
  {
    query: "I am a farmer and need financial support",
    expectedIntent: "agriculture",
    description: "Farmer looking for agricultural schemes"
  },
  {
    query: "My elderly mother needs pension support",
    expectedIntent: "social_welfare",
    description: "Family seeking social welfare schemes"
  },
  {
    query: "I want to get a scholarship for my studies",
    expectedIntent: "education",
    description: "Student looking for educational financial support"
  }
];

module.exports = sampleQueries;