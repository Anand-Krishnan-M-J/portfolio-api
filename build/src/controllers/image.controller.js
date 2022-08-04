"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addImage = void 0;
const formidable_1 = __importDefault(require("formidable"));
const googleDrive_1 = require("../helpers/googleDrive");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const addImage = (req, res) => {
    const form = new formidable_1.default.IncomingForm();
    form.uploadDir = "./";
    form.keepExtensions = true;
    const image = form.parse(req, (err, fields, files) => {
        return fields.image;
    });
    const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
    const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const googleDriveService = new googleDrive_1.GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);
        const folderName = 'Picture';
        let folder = yield googleDriveService.searchFolder(folderName).catch((error) => {
            console.error(error);
            return null;
        });
        if (!folder) {
            folder = yield googleDriveService.createFolder(folderName);
        }
        yield googleDriveService.saveFile('SpaceX', image, 'image/jpg', folder.id).then(res => {
            console.log(res.data.id, "url = ", `https://drive.google.com/uc?id=${res.data.id}`);
        }).catch((error) => {
            console.error(error);
        });
        console.info('File uploaded successfully!');
    }))();
};
exports.addImage = addImage;
//# sourceMappingURL=image.controller.js.map