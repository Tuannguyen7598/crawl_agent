export const Config_Variable = {
	PORT_HTTP: process.env.PORT_HTTP || 3000,
	PORT_GRPC: process.env.PORT_GRPC || "9999",
	URL_CORE_CRAWL: process.env.URL_CORE_CRAWL || "127.0.0.1:5555",
	AGENT_LOGIN_Electron_URL:
		process.env.AGENT_LOGIN_Electron_URL ||
		"http://localhost:3000/Electron/start",
	AGENT_LOGIN_Puppeteer_URL:
		process.env.AGENT_LOGIN_Puppeteer_URL ||
		"http://localhost:3000/Puppeteer/start",
	SNS_Electron: "Electron",
	SNS_Puppeteer: "Puppeteer",
};
