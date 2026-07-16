import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    port: parseInt(process.env.PORT || "5000"),
    jwt_access_secret: process.env.JWT_ACCESS_SECRET || "dev-access-secret",
    jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
};
//# sourceMappingURL=config.js.map