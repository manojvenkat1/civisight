const mongoose = require('mongoose');
require('dotenv').config();
const Scheme = require('./models/Scheme');

const sampleSchemes = [
  {
    scheme_name: "Pradhan Mantri Awas Yojana",
    category: "housing",
    region: "All India",
    eligibility: [
      "Annual household income below ₹18 lakh",
      "First-time home buyer",
      "Indian citizen",
      "Age between 21-65 years"
    ],
    benefit_summary: "Interest subsidy up to ₹2.67 lakh on home loans for first-time buyers",
    official_link: "https://pmaymis.gov.in/",
    budget_allocated: 120000000000,
    applications_count: 850000,
    success_rate: 78,
    keywords: ["home", "house", "property", "loan", "subsidy", "first time buyer"]
  },
  {
    scheme_name: "Mudra Yojana",
    category: "business",
    region: "All India",
    eligibility: [
      "Small business owner",
      "Micro enterprise",
      "Non-corporate, non-farm sector",
      "Loan requirement up to ₹10 lakh"
    ],
    benefit_summary: "Collateral-free loans up to ₹10 lakh for small businesses and startups",
    official_link: "https://www.mudra.org.in/",
    budget_allocated: 350000000000,
    applications_count: 2800000,
    success_rate: 85,
    keywords: ["business", "startup", "loan", "micro", "enterprise", "mudra"]
  },
  {
    scheme_name: "Ayushman Bharat",
    category: "healthcare",
    region: "All India",
    eligibility: [
      "Economically weaker sections",
      "Rural families as per SECC database",
      "Urban occupational categories",
      "Annual income below ₹5 lakh"
    ],
    benefit_summary: "Free health insurance coverage up to ₹5 lakh per family per year",
    official_link: "https://pmjay.gov.in/",
    budget_allocated: 64180000000,
    applications_count: 180000000,
    success_rate: 92,
    keywords: ["health", "insurance", "medical", "treatment", "hospital"]
  },
  {
    scheme_name: "Skill India Mission",
    category: "employment",
    region: "All India",
    eligibility: [
      "Age 15-45 years",
      "School dropout or graduate",
      "Seeking employment",
      "Indian citizen"
    ],
    benefit_summary: "Free skill training and certification with job placement assistance",
    official_link: "https://www.skillindia.gov.in/",
    budget_allocated: 15000000000,
    applications_count: 12000000,
    success_rate: 68,
    keywords: ["skill", "training", "job", "employment", "certification"]
  },
  {
    scheme_name: "PM Kisan Samman Nidhi",
    category: "agriculture",
    region: "All India",
    eligibility: [
      "Small and marginal farmers",
      "Landholding up to 2 hectares",
      "Indian citizen",
      "Valid Aadhaar card"
    ],
    benefit_summary: "Direct income support of ₹6,000 per year in three installments",
    official_link: "https://pmkisan.gov.in/",
    budget_allocated: 750000000000,
    applications_count: 110000000,
    success_rate: 95,
    keywords: ["farmer", "agriculture", "income", "support", "kisan"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    // Insert sample data
    await Scheme.insertMany(sampleSchemes);
    console.log('Sample schemes inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();