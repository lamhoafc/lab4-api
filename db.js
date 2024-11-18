const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://adminRW:mFqsEQ6xBxn3jVo0@cluster0.fdxdq.mongodb.net/Fruit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('ket noi thanh cong');
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
