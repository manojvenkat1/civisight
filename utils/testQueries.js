const axios = require('axios');
const sampleQueries = require('./sampleQueries');

const API_BASE_URL = 'http://localhost:5000/api';

async function testQuery(query) {
  try {
    console.log(`\n🔍 Testing query: "${query}"`);
    console.log('─'.repeat(50));
    
    const response = await axios.post(`${API_BASE_URL}/query`, { query });
    const result = response.data;
    
    console.log(`Intent detected: ${result.intent}`);
    console.log(`Schemes found: ${result.total_found}`);
    console.log(`Response time: ${result.response_time}ms`);
    
    if (result.explanation) {
      console.log(`AI Explanation: ${result.explanation}`);
    }
    
    if (result.schemes && result.schemes.length > 0) {
      console.log('\nTop schemes:');
      result.schemes.slice(0, 2).forEach((scheme, index) => {
        console.log(`${index + 1}. ${scheme.scheme_name}`);
        if (scheme.ai_summary) {
          console.log(`   AI Summary: ${scheme.ai_summary.substring(0, 100)}...`);
        }
      });
    }
    
    return result;
  } catch (error) {
    console.error(`❌ Error testing query: ${error.message}`);
    return null;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Civisight Query Tests');
  console.log('═'.repeat(60));
  
  for (const testCase of sampleQueries) {
    await testQuery(testCase.query);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }
  
  console.log('\n✅ All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { testQuery, runAllTests };