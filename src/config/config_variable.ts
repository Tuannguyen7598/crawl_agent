export const Config_Variable = {
    PORT_HTTP: process.env.PORT_HTTP || 3000,
    AGENT_LOGIN_UPWORK_URL: process.env.AGENT_LOGIN_UPWORK_URL || "http://localhost:3000/upwork/start",
    AGENT_LOGIN_LINKEDLN_URL: process.env.AGENT_LOGIN_LINKEDLN_URL || "http://localhost:3000/linkedln/start",
    SNS_UPWORK: "upwork",
    SNS_LINKEDLN: "linkedln",
}