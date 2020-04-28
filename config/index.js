module.exports = {
	mapAPI: process.env.mapAPI,
	api: process.env.NODE_ENV === 'development' ? process.env.DEV_API : process.env.PROD_API,
	geoAPI: process.env.geoAPI,
	port: process.env.PORT
};

