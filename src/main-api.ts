import { Router } from "express";

export interface RouteFactory {
    register(config: MiniIotConfig, router: Router): void;
}

export interface MiniIotConfig {
    port: number,
    name: string,
    dataDir: string,
    createFolders: boolean
}

export interface CSVColumnDescriptor {
    index: number;
    name: string;
}
export interface CSVDescriptor {
    columns: CSVColumnDescriptor[];
}