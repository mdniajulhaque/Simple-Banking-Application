import { ObjectType} from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateAccount } from '.';

export type AccountDocument = Account & Document;

@Schema({timestamps:true})
@ObjectType()
export class Account extends CreateAccount{
  
 }

export const AccountSchema = SchemaFactory.createForClass(Account);