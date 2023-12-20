import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: PatientsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [AppService],
    }).compile();

    appController = app.get<PatientsController>(PatientsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController).toBe('Hello World!');
    });
  });
});
