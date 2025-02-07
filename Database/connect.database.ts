

const MONGO_URI = process.env.NEXT_PUBLIC_DB_URL as string;
if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

const database = async () => {};

export default database;
