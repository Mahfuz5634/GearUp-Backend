"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
    },
    fileFilter: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (ALLOWED_MIME_TYPES.includes(file.mimetype) && !ext.startsWith(".jfif")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files (JPEG, PNG, WEBP, GIF, AVIF) are allowed"));
        }
    },
});
exports.default = upload;
//# sourceMappingURL=upload.js.map