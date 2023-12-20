import { Module } from '@nestjs/common';
import Joi from '@hapi/joi';

//import { ValidationPipe } from '@nestjs/common/pipes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './app.controller';
import { PatientService } from './services/patient.service';
import { PatientModule } from './modules/patient.module';
import { Repository } from 'typeorm';
import { HttpServer, } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';


const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  NestFactory.create(AppModule, new ExpressAdapter(app)).then(() => {
    // ...
  });
});

@Module({
  imports: [ PatientModule ,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'password',
    database: 'nestjs',
  }),],
  controllers: [PatientsController],
  providers: [PatientService, 
    ],
})
export class AppModule {}
