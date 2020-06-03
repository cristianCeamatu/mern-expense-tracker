const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}`.underline.red.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    // Exit with failure and close server
    process.exit(1);
  }
};

module.exports = connectDB;
