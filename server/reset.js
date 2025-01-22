const mongoose = require('mongoose');
const Card = require('./models/Card'); // Adjust the path to your Card model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function clearCards() {
  try {
    const result = await Card.deleteMany({});
    console.log(`Deleted ${result.deletedCount} cards.`);
    mongoose.connection.close(); // Close the connection after operation
  } catch (error) {
    console.error('Error clearing cards:', error);
    mongoose.connection.close(); // Ensure the connection is closed on error
  }
}

// Call the function
clearCards();