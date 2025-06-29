import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
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
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
