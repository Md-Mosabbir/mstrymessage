
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Using existing database connection");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {} );

    connection.isConnected = db.connections[0].readyState;

    console.log("New database connection");

    
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default dbConnect;
