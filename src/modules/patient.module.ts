import { Module, Provider } from '@nestjs/common';
import { PatientService } from '../services/patient.service';


@Module({
  imports: [],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {
  
}