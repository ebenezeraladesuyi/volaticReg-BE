"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const ForexRoutes_1 = __importDefault(require("./routes/ForexRoutes"));
const UnizikTechRouter_1 = __importDefault(require("./routes/UnizikTechRouter"));
const UnizikBootRouter_1 = __importDefault(require("./routes/UnizikBootRouter"));
const ElectionRoutes_1 = __importDefault(require("./routes/ElectionRoutes"));
const WaitlistAcademosRouter_1 = __importDefault(require("./routes/WaitlistAcademosRouter"));
const appConfig = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)());
    //routes
    app.use("/volatic", UserRouter_1.default);
    app.use("/forex", ForexRoutes_1.default);
    app.use("/unizik", UnizikTechRouter_1.default);
    app.use("/project200", UnizikBootRouter_1.default);
    app.use("/elect", ElectionRoutes_1.default);
    app.use("/waitacad", WaitlistAcademosRouter_1.default);
    app.get("/", (req, res) => {
        return res.status(200).json({
            message: "defaultt get"
        });
    });
};
exports.default = appConfig;
