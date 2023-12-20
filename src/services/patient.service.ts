import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidationError } from '@nestjs/common'
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { Patient } from '../models/patient.entity';
import { PatientDto } from '../models/patient.dto';

@Injectable()
export class PatientService {

  constructor(
    private readonly patientRepository: Repository<Patient>,
  ) { }

  public create(patient: Patient) {
    // Enregistrer le patient dans la base de données
    // ...
    return patient;
  }

  async createPatient(patient: Patient): Promise<Patient> {
    // Valider le modèle
    const errors = this.validate(new PatientDto);
    if (errors) {
      throw new BadRequestException(errors);
    }
    return await this.patientRepository.save(patient);
  }

  private validate(patient: PatientDto): Array<ValidationError> {
    const errors = [];

    if (patient.name.length < 5) {
      errors.push({
        property: 'name',
        message: 'Le nom doit avoir au moins 5 caractères.',
      });
    }

    if (patient.birthDate === null) {
      errors.push({
        property: 'birthDate',
        message: 'La date de naissance est obligatoire.',
      });
    }

    return errors;
  }


 async getAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }


  async getPatientById(options: FindOneOptions<Patient>): Promise<Patient | undefined> {
    return await this.patientRepository.findOne(options);
  }

  async updatePatient(id: number, patient: Patient): Promise<Patient> {
    await this.patientRepository.update({ id }, patient);
    return await this.getPatientById(id as FindOneOptions<Patient>);
  }

  async deletePatient(id: number): Promise<void> {
    await this.patientRepository.delete({ id });
  }

}