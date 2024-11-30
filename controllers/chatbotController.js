const { detectIntent } = require('../services/dialogflowService');
const { sendMessage } = require('../services/twilioService');
const { fetchRecommendedProperties } = require('../services/propertyService');
const { formatResponse } = require('../helpers/responseHelper');
const Lead = require('../models/lead');

exports.handleMessage = async (req, res) => {
    const { Body, From } = req.body;

    try {
        const intentResponse = await detectIntent(Body, From);
        const intent = intentResponse.intent.displayName;
        const parameters = intentResponse.parameters.fields;

        let reply;

        if (intent === 'Lead Qualification') {
            const lead = new Lead({
                name: parameters.name.stringValue,
                phoneNumber: From,
                budget: parameters.budget.numberValue,
                propertyType: parameters.propertyType.stringValue,
                location: parameters.location.stringValue,
            });

            await lead.save();
            reply = 'Thank you for sharing your details. We will contact you soon!';
        } else if (intent === 'Property Recommendation') {
            const properties = await fetchRecommendedProperties(parameters);
            reply = formatResponse(properties, 'property');
        } else {
            reply = intentResponse.fulfillmentText;
        }

        await sendMessage(From, reply);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).send('Internal Server Error');
    }
};
