export const getPagination = (page: number = 1, limit: number = 10) => {
	const parsedPage = Math.max(1, Number(page) || 1)
	const parsedLimit = Math.max(1, Number(limit) || 10)

	const take = parsedLimit
	const skip = (parsedPage - 1) * parsedLimit

	return { take, skip }
}
