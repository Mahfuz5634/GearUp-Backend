"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
async function main() {
    try {
        app_1.default.listen(config_1.default.port, () => {
            console.log(`🚀 GearUp Backend is listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
    }
}
main();
//# sourceMappingURL=server.js.map