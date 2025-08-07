import dotenv from 'dotenv';


dotenv.config();

const config={
    mongoDBUrl: process.env.MONGODB_URL || "",
    port: process.env.PORT || 4000,
    backendUrl: process.env.BACKEND_URL || "http://localhost:4000",

}
export default config;