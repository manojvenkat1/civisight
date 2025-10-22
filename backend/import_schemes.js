const { MongoClient } = require('mongodb');

// --- 1. CONFIGURE YOUR MONGODB CONNECTION ---
// This MUST be your MongoDB Atlas connection string, with your password.
const MONGO_URI = mongodb+srv://manojvenkat2k05_db_user:<db_password>@cluster0.q21qrqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const DATABASE_NAME = "civisight"; // The name of your database
const COLLECTION_NAME = "schemes";   // The collection where schemes will be stored

// --- 2. DATA: LIST OF 100 GOVERNMENT SCHEMES ---
// This list contains 100 schemes, each with a name, category, and searchable keywords.
const schemesData = [
    // Agriculture & Farmer Welfare
    {"scheme_name": "PM Kisan Samman Nidhi", "category": "Agriculture & Farmer Welfare", "keywords": ["PM-KISAN", "farmer", "agriculture", "income support", "kheti", "₹6000 scheme"]},
    {"scheme_name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)", "category": "Agriculture & Farmer Welfare", "keywords": ["crop insurance", "fasal bima", "farmer loss", "agriculture insurance"]},
    {"scheme_name": "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)", "category": "Agriculture & Farmer Welfare", "keywords": ["irrigation", "sinchai", "water for farm", "per drop more crop"]},
    {"scheme_name": "Kisan Credit Card (KCC) Scheme", "category": "Agriculture & Farmer Welfare", "keywords": ["farmer loan", "kcc", "agriculture credit", "farm loan"]},
    {"scheme_name": "Soil Health Card Scheme", "category": "Agriculture & Farmer Welfare", "keywords": ["soil test", "fertilizer", "mitti", "farm health"]},
    {"scheme_name": "Paramparagat Krishi Vikas Yojana (PKVY)", "category": "Agriculture & Farmer Welfare", "keywords": ["organic farming", "jaivik kheti", "traditional farming"]},
    {"scheme_name": "Rashtriya Krishi Vikas Yojana (RKVY)", "category": "Agriculture & Farmer Welfare", "keywords": ["agri development", "RKVY", "farm infrastructure"]},
    {"scheme_name": "Pradhan Mantri Kisan Maandhan Yojana", "category": "Agriculture & Farmer Welfare", "keywords": ["farmer pension", "old age farmer", "kisan pension"]},
    {"scheme_name": "National Agriculture Market (e-NAM)", "category": "Agriculture & Farmer Welfare", "keywords": ["online mandi", "sell crops", "e-NAM", "agri market"]},
    {"scheme_name": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)", "category": "Agriculture & Farmer Welfare", "keywords": ["fisheries", "fish farming", "matsya", "aquaculture"]},
    {"scheme_name": "Micro Irrigation Fund", "category": "Agriculture & Farmer Welfare", "keywords": ["drip irrigation", "sprinkler", "water saving farm"]},
    {"scheme_name": "Rashtriya Gokul Mission", "category": "Agriculture & Farmer Welfare", "keywords": ["cow", "cattle breed", "indigenous bovine", "gokul"]},
    {"scheme_name": "National Livestock Mission", "category": "Agriculture & Farmer Welfare", "keywords": ["livestock", "animal husbandry", "poultry", "pashupalan"]},
    {"scheme_name": "Agri Infrastructure Fund", "category": "Agriculture & Farmer Welfare", "keywords": ["warehouse", "cold storage", "farm infra", "post-harvest"]},
    {"scheme_name": "PM-PRANAM Scheme", "category": "Agriculture & Farmer Welfare", "keywords": ["fertilizer reduction", "alternative nutrients", "bio-fertilizer"]},
    
    // Health & Wellness
    {"scheme_name": "Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)", "category": "Health & Wellness", "keywords": ["health insurance", "PMJAY", "ayushman card", "free treatment", "hospital bill"]},
    {"scheme_name": "Ayushman Bharat Health and Wellness Centres", "category": "Health & Wellness", "keywords": ["primary healthcare", "HWC", "local clinic", "health checkup"]},
    {"scheme_name": "National Digital Health Mission (NDHM)", "category": "Health & Wellness", "keywords": ["health ID", "digital health record", "ABHA card", "ayushman bharat digital mission"]},
    {"scheme_name": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)", "category": "Health & Wellness", "keywords": ["generic medicine", "cheap medicine", "janaushadhi kendra"]},
    {"scheme_name": "Janani Suraksha Yojana (JSY)", "category": "Health & Wellness", "keywords": ["pregnant women", "safe delivery", "maternity benefit", "institutional delivery"]},
    {"scheme_name": "Janani Shishu Suraksha Karyakram (JSSK)", "category": "Health & Wellness", "keywords": ["mother and child health", "newborn care", "free child treatment"]},
    {"scheme_name": "Rashtriya Bal Swasthya Karyakram (RBSK)", "category": "Health & Wellness", "keywords": ["child health screening", "anganwadi health", "school children health"]},
    {"scheme_name": "Mission Indradhanush", "category": "Health & Wellness", "keywords": ["child vaccination", "immunization", "polio drops", "vaccine"]},
    {"scheme_name": "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)", "category": "Health & Wellness", "keywords": ["pregnancy checkup", "antenatal care", "safe motherhood"]},
    {"scheme_name": "National Tuberculosis Elimination Program", "category": "Health & Wellness", "keywords": ["TB treatment", "tuberculosis", "Nikshay Poshan Yojana"]},
    {"scheme_name": "National AYUSH Mission", "category": "Health & Wellness", "keywords": ["ayurveda", "yoga", "unani", "siddha", "homeopathy", "ayush"]},
    {"scheme_name": "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)", "category": "Health & Wellness", "keywords": ["AIIMS", "medical college", "hospital upgrade", "tertiary healthcare"]},
    {"scheme_name": "eSanjeevani Teleconsultation Service", "category": "Health & Wellness", "keywords": ["online doctor", "telemedicine", "doctor consultation video"]},
    {"scheme_name": "POSHAN Abhiyaan", "category": "Health & Wellness", "keywords": ["nutrition", "malnutrition", "stunting", "anganwadi", "children nutrition"]},
    {"scheme_name": "Anemia Mukt Bharat", "category": "Health & Wellness", "keywords": ["anemia", "iron deficiency", "blood health", "women health"]},

    // Education & Skill Development
    {"scheme_name": "PM YASASVI (YASASVI Entrance Test)", "category": "Education & Skill Development", "keywords": ["scholarship", "OBC student", "EBC", "DNT", "entrance test", "school scholarship"]},
    {"scheme_name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)", "category": "Education & Skill Development", "keywords": ["skill development", "job training", "vocational training", "PMKVY"]},
    {"scheme_name": "National Apprenticeship Promotion Scheme (NAPS)", "category": "Education & Skill Development", "keywords": ["apprenticeship", "on-the-job training", "stipend", "skill training"]},
    {"scheme_name": "Samagra Shiksha Abhiyan", "category": "Education & Skill Development", "keywords": ["school education", "teacher training", "digital education"]},
    {"scheme_name": "PM eVIDYA", "category": "Education & Skill Development", "keywords": ["online education", "digital learning", "DIKSHA", "TV channel education"]},
    {"scheme_name": "Beti Bachao, Beti Padhao Yojana", "category": "Education & Skill Development", "keywords": ["girl child", "girl education", "save girl child"]},
    {"scheme_name": "PM SHRI Schools", "category": "Education & Skill Development", "keywords": ["model schools", "NEP", "exemplar school"]},
    {"scheme_name": "National Education Policy (NEP)", "category": "Education & Skill Development", "keywords": ["education reform", "new education policy", "holistic education"]},
    {"scheme_name": "SWAYAM", "category": "Education & Skill Development", "keywords": ["free online courses", "MOOCs", "digital education platform"]},
    {"scheme_name": "Sukanya Samriddhi Yojana", "category": "Education & Skill Development", "keywords": ["girl child savings", "post office scheme", "SSY", "daughter education"]},
    {"scheme_name": "CBSE Udaan Scheme", "category": "Education & Skill Development", "keywords": ["girl engineering", "IIT entrance coaching", "free coaching"]},
    {"scheme_name": "PM GatiShakti", "category": "Education & Skill Development", "keywords": ["infrastructure", "logistics", "multi-modal connectivity"]},
    {"scheme_name": "Skill India Mission", "category": "Education & Skill Development", "keywords": ["vocational skills", "employment training", "job skills"]},
    {"scheme_name": "National Scholarship Portal (NSP)", "category": "Education & Skill Development", "keywords": ["student scholarship", "financial aid", "minority scholarship"]},
    {"scheme_name": "Yuva Sangam", "category": "Education & Skill Development", "keywords": ["youth exchange", "cultural tour", "student travel"]},

    // Business & Entrepreneurship
    {"scheme_name": "Pradhan Mantri MUDRA Yojana (PMMY)", "category": "Business & Entrepreneurship", "keywords": ["business loan", "MUDRA", "small business", "loan without guarantee", "shishu kishor tarun"]},
    {"scheme_name": "Stand-Up India Scheme", "category": "Business & Entrepreneurship", "keywords": ["women entrepreneur", "SC ST entrepreneur", "business loan"]},
    {"scheme_name": "Start-Up India Scheme", "category": "Business & Entrepreneurship", "keywords": ["startup funding", "new business", "innovation", "seed fund"]},
    {"scheme_name": "Pradhan Mantri Employment Generation Programme (PMEGP)", "category": "Business & Entrepreneurship", "keywords": ["self-employment", "new enterprise", "subsidy loan"]},
    {"scheme_name": "MSME Champions Scheme (ZED, Lean)", "category": "Business & Entrepreneurship", "keywords": ["MSME", "zero defect", "lean manufacturing", "small industry"]},
    {"scheme_name": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)", "category": "Business & Entrepreneurship", "keywords": ["collateral free loan", "MSME loan", "business credit"]},
    {"scheme_name": "Production Linked Incentive (PLI) Scheme", "category": "Business & Entrepreneurship", "keywords": ["manufacturing", "made in india", "incentive", "electronics", "pharma"]},
    {"scheme_name": "PM SVANidhi", "category": "Business & Entrepreneurship", "keywords": ["street vendor loan", "rehri patri", "working capital loan"]},
    {"scheme_name": "Make in India", "category": "Business & Entrepreneurship", "keywords": ["manufacturing hub", "foreign investment", "FDI"]},
    {"scheme_name": "Digital India", "category": "Business & Entrepreneurship", "keywords": ["digital infrastructure", "online services", "e-governance"]},

    // Housing & Urban Development
    {"scheme_name": "Pradhan Mantri Awas Yojana - Urban (PMAY-U)", "category": "Housing & Urban Development", "keywords": ["affordable housing", "home loan subsidy", "first time home buyer", "PMAY Urban"]},
    {"scheme_name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)", "category": "Housing & Urban Development", "keywords": ["rural housing", "house for poor", "PMAY Gramin"]},
    {"scheme_name": "Smart Cities Mission", "category": "Housing & Urban Development", "keywords": ["urban development", "smart city", "e-governance", "sustainable city"]},
    {"scheme_name": "AMRUT Mission", "category": "Housing & Urban Development", "keywords": ["urban transformation", "water supply", "sewage", "urban infra"]},
    {"scheme_name": "Swachh Bharat Mission (Urban & Gramin)", "category": "Housing & Urban Development", "keywords": ["clean india", "toilet construction", "sanitation", "waste management"]},

    // Women & Child Development
    {"scheme_name": "Pradhan Mantri Ujjwala Yojana (PMUY)", "category": "Women & Child Development", "keywords": ["free LPG connection", "gas cylinder", "cooking gas", "Ujjwala"]},
    {"scheme_name": "Mission Shakti (Sambal & Samarthya)", "category": "Women & Child Development", "keywords": ["women safety", "women empowerment", "one stop centre"]},
    {"scheme_name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)", "category": "Women & Child Development", "keywords": ["pregnant women", "maternity benefit", "lactating mothers", "cash incentive"]},
    {"scheme_name": "One Stop Centre Scheme", "category": "Women & Child Development", "keywords": ["women helpline", "violence against women", "sakhi centre"]},
    {"scheme_name": "Mahila Shakti Kendra (MSK)", "category": "Women & Child Development", "keywords": ["rural women", "women empowerment", "community participation"]},
    {"scheme_name": "Mission Vatsalya", "category": "Women & Child Development", "keywords": ["child protection", "child welfare", "juvenile justice"]},
    {"scheme_name": "Anganwadi Services (ICDS)", "category": "Women & Child Development", "keywords": ["anganwadi", "child nutrition", "mother care"]},
    {"scheme_name": "Scheme for Adolescent Girls (SAG)", "category": "Women & Child Development", "keywords": ["adolescent girls", "nutrition", "skill development", "kishori"]},
    {"scheme_name": "Nari Shakti Puraskar", "category": "Women & Child Development", "keywords": ["women award", "women achievers", "empowerment award"]},
    {"scheme_name": "Mahila E-haat", "category": "Women & Child Development", "keywords": ["women entrepreneurs", "online market", "sell products"]},
    
    // Social Welfare & Pension
    {"scheme_name": "Atal Pension Yojana (APY)", "category": "Social Welfare & Pension", "keywords": ["pension scheme", "unorganised sector", "old age pension", "APY"]},
    {"scheme_name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)", "category": "Social Welfare & Pension", "keywords": ["life insurance", "term insurance", "bank insurance"]},
    {"scheme_name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)", "category": "Social Welfare & Pension", "keywords": ["accident insurance", "disability cover", "personal accident"]},
    {"scheme_name": "National Social Assistance Programme (NSAP)", "category": "Social Welfare & Pension", "keywords": ["widow pension", "old age pension", "disability pension"]},
    {"scheme_name": "PM Vaya Vandana Yojana", "category": "Social Welfare & Pension", "keywords": ["senior citizen pension", "LIC pension", "old age income"]},
    {"scheme_name": "Pradhan Mantri Shram Yogi Maan-dhan", "category": "Social Welfare & Pension", "keywords": ["labour pension", "unorganised worker pension", "shram yogi"]},
    {"scheme_name": "Pradhan Mantri Jan Dhan Yojana (PMJDY)", "category": "Social Welfare & Pension", "keywords": ["zero balance account", "bank account", "financial inclusion"]},
    {"scheme_name": "Accessible India Campaign (Sugamya Bharat Abhiyan)", "category": "Social Welfare & Pension", "keywords": ["disability access", "divyangjan", "wheelchair access"]},
    {"scheme_name": "Deendayal Antyodaya Yojana - NRLM", "category": "Social Welfare & Pension", "keywords": ["self help group", "SHG", "rural livelihood"]},
    {"scheme_name": "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)", "category": "Social Welfare & Pension", "keywords": ["free ration", "food grains", "poor people food"]},
    {"scheme_name": "One Nation One Ration Card", "category": "Social Welfare & Pension", "keywords": ["ration card portability", "PDS", "food security"]},
    {"scheme_name": "PM Vishwakarma Scheme", "category": "Social Welfare & Pension", "keywords": ["artisan", "craftsmen", "skill training", "traditional crafts"]},
    {"scheme_name": "Senior Citizen Savings Scheme (SCSS)", "category": "Social Welfare & Pension", "keywords": ["senior citizen investment", "post office scheme", "guaranteed return"]},
    {"scheme_name": "Transgender Persons Protection of Rights", "category": "Social Welfare & Pension", "keywords": ["transgender rights", "identity certificate", "welfare"]},

    // Infrastructure, Energy & Rural
    {"scheme_name": "Jal Jeevan Mission", "category": "Infrastructure, Energy & Rural", "keywords": ["tap water", "drinking water", "har ghar jal", "water connection"]},
    {"scheme_name": "Pradhan Mantri Gram Sadak Yojana (PMGSY)", "category": "Infrastructure, Energy & Rural", "keywords": ["rural roads", "village road", "connectivity"]},
    {"scheme_name": "Saubhagya Scheme", "category": "Infrastructure, Energy & Rural", "keywords": ["electricity connection", "free electricity", "har ghar bijli"]},
    {"scheme_name": "Deen Dayal Upadhyaya Gram Jyoti Yojana (DDUGJY)", "category": "Infrastructure, Energy & Rural", "keywords": ["rural electrification", "feeder separation", "power supply"]},
    {"scheme_name": "UJALA Scheme", "category": "Infrastructure, Energy & Rural", "keywords": ["LED bulb", "energy saving", "cheap LED"]},
    {"scheme_name": "Sansad Adarsh Gram Yojana", "category": "Infrastructure, Energy & Rural", "keywords": ["model village", "MP adopted village", "village development"]},
    {"scheme_name": "Gobar-Dhan Scheme", "category": "Infrastructure, Energy & Rural", "keywords": ["biogas", "waste to wealth", "cattle dung", "organic fertilizer"]},
    {"scheme_name": "UDAN Scheme", "category": "Infrastructure, Energy & Rural", "keywords": ["regional airport", "cheap flights", "air connectivity"]},
    {"scheme_name": "BharatNet Project", "category": "Infrastructure, Energy & Rural", "keywords": ["rural internet", "broadband", "gram panchayat internet"]},
    {"scheme_name": "Namami Gange Programme", "category": "Infrastructure, Energy & Rural", "keywords": ["ganga cleaning", "river rejuvenation", "clean ganga"]},
    {"scheme_name": "SVAMITVA Scheme", "category": "Infrastructure, Energy & Rural", "keywords": ["property card", "land records", "drone survey", "village property"]},
    {"scheme_name": "Har Ghar Jal", "category": "Infrastructure, Energy & Rural", "keywords": ["piped water", "water to every house", "jal jeevan mission"]},
    {"scheme_name": "Atal Bhujal Yojana", "category": "Infrastructure, Energy & Rural", "keywords": ["groundwater management", "water conservation", "bhujal"]},
    {"scheme_name": "PM-Surya Ghar: Muft Bijli Yojana", "category": "Infrastructure, Energy & Rural", "keywords": ["rooftop solar", "free electricity", "solar panel subsidy"]},
    {"scheme_name": "MGNREGA", "category": "Infrastructure, Energy & Rural", "keywords": ["rural employment", "100 days work", "job card", "manual labour"]}
];

/**
 * Connects to MongoDB, checks if the collection is empty,
 * and inserts the schemes data if it is.
 */
async function importDataToMongoDB() {
    // We create a new MongoClient instance
    const client = new MongoClient(MONGO_URI);

    try {
        // --- 3. CONNECT TO MONGODB ---
        console.log(`Connecting to MongoDB at ${MONGO_URI}...`);
        await client.connect();
        console.log("MongoDB connection successful.");

        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // --- 4. CHECK FOR EXISTING DATA TO AVOID DUPLICATES ---
        const count = await collection.countDocuments({});
        if (count > 0) {
            console.log(`Collection '${COLLECTION_NAME}' is not empty. Skipping insertion to avoid duplicates.`);
            console.log("To re-insert, please drop the collection first from your MongoDB Atlas dashboard.");
            return;
        }

        // --- 5. INSERT THE DATA ---
        console.log(`Inserting ${schemesData.length} schemes into the '${COLLECTION_NAME}' collection...`);
        const result = await collection.insertMany(schemesData);
        console.log(`Successfully inserted ${result.insertedCount} documents.`);
        console.log("Your database is now populated!");

    } catch (err) {
        console.error("\n--- MONGODB SCRIPT ERROR ---");
        console.error(err);
        console.error("\nPlease ensure your MONGO_URI is correct, your password is set, and your IP address is whitelisted in MongoDB Atlas.");
    } finally {
        // --- 6. CLOSE THE CONNECTION ---
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

// Run the main function
importDataToMongoDB();
