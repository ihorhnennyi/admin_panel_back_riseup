export default () => ({
	app: {
		port: parseInt(process.env.PORT || '5000', 10),
	},

	database: {
		uri: process.env.MONGO_URI || 'mongodb://localhost:27017/admin_panel',
	},

	jwt: {
		// Основной секрет и срок действия для access токена
		accessSecret: process.env.JWT_SECRET || 'default_access_secret',
		accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',

		// Отдельный секрет и срок действия для refresh токена
		refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret',
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
	},

	frontend: {
		url: process.env.FRONTEND_URL || 'http://localhost:3000',
	},
})
