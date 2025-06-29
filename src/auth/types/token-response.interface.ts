export interface TokenResponse {
	accessToken: string
	refreshToken: string
	user: {
		_id: string
		email: string
		name: string
		role: string
	}
}
