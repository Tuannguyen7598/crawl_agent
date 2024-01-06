import * as bodyParser from "body-parser";
import cors from "cors";
import * as electron from "electron";
import Store from "electron-store";

import express from "express";
import { ExpressServer } from "./api/http/express.server";
import { SnsManager } from "./abtraction/adapter/SnsManager";
import { ClientgRPC } from "./infastructure/client/clientgRPC";
import { Config_Variable } from "./config/config_variable";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { GRPCServer } from "./api/gRPC/gRPC.server";

async function boot() {
	const app = express();
	app.use(cors());
	app.use(
		bodyParser.json({
			limit: "50mb",
			verify(req: any, _res, buf, _encoding) {
				req.rawBody = buf;
			},
		})
	);

	const gRPC = new Server();
	gRPC.bindAsync(
		"127.0.0.1:" + Config_Variable.PORT_GRPC,
		ServerCredentials.createInsecure(),
		(error, port) => {
			if (error) {
				throw error;
			}
			console.log("Server gRPC running on:", port);
			gRPC.start();
		}
	);
	const client = new ClientgRPC();
	const manager = new SnsManager(client);
	new ExpressServer(app, manager);
	new GRPCServer(gRPC, manager);
	const port = Config_Variable.PORT_HTTP;
	console.log("Server express running on:", port);
	app.listen(port);
}
boot();
