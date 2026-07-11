import express from "express";
import cors from 'cors';
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { authRoutes } from "./modules/auth/auth.route";
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("GearUp Server is Runing!");
});
app.use('/api/auth', authRoutes);
//globalerrorHandler
app.use(globalErrorHandler);
//not found
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map