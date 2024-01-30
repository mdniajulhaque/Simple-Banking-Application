import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
