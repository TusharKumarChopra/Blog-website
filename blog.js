const mongoose = require('mongoose');
const Content = require('./models/content');
mongoose.set('strictQuery', true); 
main();
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    console.log('Connected to the mongo database successfully');
    
    // Continue with your application logic here
  } catch (err) {
    console.log("oh no mongo error")
    console.error('Error connecting to the database:', err);
  }
}

