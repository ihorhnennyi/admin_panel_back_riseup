import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Role } from '../../shared/constants/roles.constant'

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true })
	password: string

	@Prop({ type: String, enum: ['admin', 'recruiter'], default: 'recruiter' })
	role: Role

	@Prop({ default: null })
	refreshToken?: string

	@Prop({ type: Types.ObjectId, ref: 'City', required: false })
	city?: Types.ObjectId

	@Prop({ type: Types.ObjectId, ref: 'Branch', required: false })
	branch?: Types.ObjectId

	@Prop() lastName?: string
	@Prop() middleName?: string
	@Prop() phone?: string
	@Prop() viber?: string
	@Prop() whatsapp?: string
	@Prop() facebook?: string
	@Prop() telegram?: string
	@Prop() description?: string
	@Prop() position?: string
	@Prop() birthDate?: Date
	@Prop({ default: true }) isActive?: boolean
	@Prop([String]) languages?: string[]
	@Prop([String]) skills?: string[]
	@Prop() workSchedule?: string
	@Prop() employmentType?: string
	@Prop() startDate?: Date
	@Prop() experienceYears?: number
	@Prop([String]) specializations?: string[]
	@Prop() linkedinUrl?: string
	@Prop() identificationNumber?: string
	@Prop([String]) certificates?: string[]
	@Prop() supervisor?: string
	@Prop([String]) responsibilities?: string[]
	@Prop() emergencyContact?: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
