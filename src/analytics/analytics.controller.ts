import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AnalyticsService } from './analytics.service'

@ApiTags('Аналитика')
@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analyticsService: AnalyticsService) {}

	@Get('candidates-summary')
	@ApiOperation({ summary: 'Аналитика по кандидатам' })
	@ApiResponse({ status: 200, description: 'Успешный ответ' })
	getCandidatesSummary() {
		return this.analyticsService.getCandidatesSummary()
	}

	@Get('leads-by-days')
	getLeadsByDays(@Query('days') days: string) {
		const parsedDays = parseInt(days || '30')
		return this.analyticsService.getCandidatesLeadsByDays(parsedDays)
	}

	@Get('recruiters-status-summary')
	@ApiOperation({ summary: 'Аналитика по рекрутёрам и статусам кандидатов' })
	@ApiResponse({ status: 200, description: 'Успешный ответ' })
	async getRecruitersStatusSummary(
		@Query('startDate') startDate?: string,
		@Query('endDate') endDate?: string
	) {
		return {
			success: true,
			data: await this.analyticsService.getRecruitersStatusSummary(
				startDate,
				endDate
			),
		}
	}

	@Get('recruiter-activity-chart')
	async getActivityChart(
		@Query('startDate') startDate?: string,
		@Query('endDate') endDate?: string
	) {
		const data = await this.analyticsService.getRecruiterActivityChartData(
			startDate,
			endDate
		)
		return { success: true, data }
	}
}
