exports.formatResponse = (data, type) => {
    if (type === 'property') {
        return data.map(
            property => `${property.name}, located in ${property.location}, priced at $${property.price}`
        ).join('\n');
    }
    return 'No data available.';
};
