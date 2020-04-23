import { Request, Response, Router } from "express";
import { RouteFactory, MiniIotConfig } from "../main-api";
import * as fs from "fs";
import * as path from "path";


export const WriteFilesRoute: RouteFactory = {
    register: (config: MiniIotConfig, router: Router) => {
        router.post("/files/:uuid/:file", (req: Request, res: Response, next) => {
            console.log("POST WriteFiles /" + req.params.uuid + "/" + req.params.file);

            const folder = path.normalize(config.dataDir + "/" + req.params.uuid);
            if (!fs.existsSync(folder)) {
                console.log("Creating", folder);
                fs.mkdirSync(folder);
            }

            const filePath = path.normalize(config.dataDir + "/" + req.params.uuid + "/" + req.params.file);
            const append: boolean = req.query.append === "true";
            const prefixTimestamp: boolean = req.query.tsprefix === "true";

            let body = "";
            if (prefixTimestamp) {
                req.on("data", (data: any) => {
                    body += data;
                });
            } else {
                req.pipe(fs.createWriteStream(filePath, { flags: append ? "a" : undefined }));
            }

            req.on('end', function () {
                if (prefixTimestamp) {
                    fs.writeFileSync(filePath, "\n" + Date.now() + "," + body.trim(), {
                        encoding: "UTF-8",
                        flag: append ? "a" : undefined
                    });
                }
                res.status(200).send().end();
            });
        });
    }
}