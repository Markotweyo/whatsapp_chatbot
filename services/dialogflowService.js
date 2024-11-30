//Handles Dialogflow integration
const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();
require('dotenv').config();

const detectIntent = async (message, sessionId) => {
    const sessionPath = sessionClient.projectAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en',
            },
        },
    };

    const [response] = await sessionClient.detectIntent(request);
    return response.queryResult;
};

module.exports = { detectIntent };
