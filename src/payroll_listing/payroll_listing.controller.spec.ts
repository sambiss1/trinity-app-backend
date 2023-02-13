import { Test, TestingModule } from '@nestjs/testing';
import { PayrollListingController } from './payroll_listing.controller';
import { PayrollListingService } from './payroll_listing.service';

describe('PayrollListingController', () => {
  let controller: PayrollListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollListingController],
      providers: [PayrollListingService],
    }).compile();

    controller = module.get<PayrollListingController>(PayrollListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
