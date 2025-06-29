import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class City {
	@Prop({ required: true, unique: true })
	name: string

	@Prop()
	latitude?: number

	@Prop()
	longitude?: number

	@Prop()
	color?: string
}

export type CityDocument = City & Document
export const CitySchema = SchemaFactory.createForClass(City)
