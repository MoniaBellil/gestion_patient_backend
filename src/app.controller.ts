import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { PatientService } from './services/patient.service';
import { AppService } from './app.service';
import { Patient } from './models/patient.entity';
//import { patientSchema } from './models/patientSchema';
import { HttpException } from '@nestjs/common';
import Joi from '@hapi/joi';

import { PatientDto } from './models/patient.dto';


@Controller('patients')
export class PatientsController {

  constructor(private readonly patientService: PatientService,
  ) { }

  @Get('/patients')
  public async getAllPatients() {
    return await this.patientService.getAllPatients();
  }

  @Post('/patients')
  public async createPatient(patient: PatientDto): Promise<Patient> {
    // Valider les données d'entrée

    /*const { errors } = await patientSchema.validate(patient);
    if (errors) {
      throw new HttpException(errors.map((error: Joi.ValidationError) => error.message).join(', '), 400);
    }*/




    // Mapper les propriétés manquantes
    const mappedPatient: Patient = {
      ...patient,
      phoneNumber: "+1234567890",
      medicalInformation: patient.medicalInformationts,
    };
    // Enregistrer le patient dans la base de données
    const patientFromDb = await this.patientService.createPatient(mappedPatient);

    // Renvoyer le patient enregistré
    return patientFromDb;
  }

  @Put('/patients/:id')
  public async updatePatient(id: number, patient: Patient): Promise<Patient> {
    return await this.patientService.updatePatient(id, patient);
  }

  @Delete('/patients/:id')
  public async deletePatient(id: number, patient: Patient): Promise<void> {
    return await this.patientService.deletePatient(id);
  }


}

