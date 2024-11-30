//Fetches property recommendations based on preferences
const axios = require('axios');

const fetchRecommendedProperties = async (preferences) => {
    const { location, budget, propertyType } = preferences;
    const response = await axios.get('https://example-property-api.com/properties', {
        params: {
            location: location.stringValue,
            max_price: budget.numberValue,
            type: propertyType.stringValue,
        },
    });

    return response.data.map(property => `${property.name} - $${property.price}`);
};

module.exports = { fetchRecommendedProperties };
