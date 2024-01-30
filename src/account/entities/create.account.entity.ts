import { ObjectType, Field, InputType} from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { AccountTypeEnum } from '../enums';

@Schema({_id:false})
@ObjectType('Create_Account_Output')
@InputType('Create_Account_Input')
export class CreateAccount {

  @Prop({type:String,required:true})      
  @Field(()=>String, {nullable:true})
  name?: string;

  @Prop({type:String,required:true, unique: true})
  @Field(()=>String, {nullable:true})
  number?: string;

  @Prop({ type: String,enum:AccountTypeEnum, required: true })
  @Field(()=> AccountTypeEnum, {nullable:true})
  type?: AccountTypeEnum;

  @Prop({type:Number,required: true, min:500})
  @Field(() => Number,{nullable:true})
  balance?: number;
}