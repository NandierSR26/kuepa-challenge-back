import mongoose from 'mongoose';


interface Options {
  mongoUrl: string;
  dbName: string;
}


export const connectDB = async (options: Options) => {
  const { mongoUrl, dbName } = options;

  try {
    await mongoose.connect(mongoUrl, {
      dbName: dbName,
    });
    return true;

  } catch (error) {
    console.log('Mongo connection error');
    throw error;
  }

}

export const disconnectDB = async() => {
  await mongoose.disconnect();
}






