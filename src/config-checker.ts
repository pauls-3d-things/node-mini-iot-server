import { MiniIotConfig } from "./main-api";
import * as fs from "fs";
import * as path from "path";

export const checkConfig = (config: MiniIotConfig): MiniIotConfig => {
    // the slash is not part of the file name...
    if (config.dataDir.endsWith("/")) {
        config.dataDir = config.dataDir.substr(0, config.dataDir.length - 1)
    }

    if (!fs.existsSync(path.normalize(config.dataDir))) {
        fs.mkdirSync(path.normalize(config.dataDir));
    }

    return config;
}