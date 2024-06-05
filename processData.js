const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Convert id to number if it's a string and remove duplicates
const uniqueQuestions = [];
const ids = new Set();

data.questions.forEach((question) => {
  // Convert id to number if it's a string
  if (typeof question.id === 'string') {
    question.id = parseInt(question.id, 10);
  }

  // Check for duplicate ids
  if (!ids.has(question.id)) {
    ids.add(question.id);
    uniqueQuestions.push(question);
  }
});

// Update the data with unique questions
data.questions = uniqueQuestions;

// Write the processed data back to the JSON file
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

console.log('Questions processed successfully!');
