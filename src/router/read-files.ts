import { Request, Response, Router } from "express";
import { RouteFactory, MiniIotConfig } from "../main-api";
import * as fs from "fs";
import * as path from "path";

export const ReadFilesRoute: RouteFactory = {
    register: (config: MiniIotConfig, router: Router) => {
        router.get("/files/:uuid/:file", (req: Request, res: Response) => {

            const filePath = path.normalize(config.dataDir + "/" + req.params.uuid + "/" + req.params.file);
            if (fs.existsSync(filePath)) {
                console.log("GET ReadFiles /" + req.params.uuid + "/" + req.params.file);

                // guess the content-type
                const matchesTextFile = [".txt", ".csv"].find(ext => filePath.toLowerCase().endsWith(ext));
                if (matchesTextFile) {
                    res.setHeader("content-type", "text/plain");
                }
                else if (filePath.toLowerCase().endsWith(".json")) {
                    res.setHeader("content-type", "application/json");
                } else {
                    res.setHeader("content-type", "application/octet-stream");
                }

                fs.createReadStream(filePath).pipe(res);
            } else {
                res.status(404).send("Not Found").end();
            }

        });
    }
}