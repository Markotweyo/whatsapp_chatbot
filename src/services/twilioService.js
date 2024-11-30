//Handles Twilio message sending.
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (to, body) => {
    return client.messages.create({
        from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
        to: 'whatsapp:' + to,
        body,
    });
};

module.exports = { sendMessage };
