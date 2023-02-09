import { Test, TestingModule } from '@nestjs/testing';
import { PayrollListingService } from './payroll_listing.service';

describe('PayrollListingService', () => {
  let service: PayrollListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollListingService],
    }).compile();

    service = module.get<PayrollListingService>(PayrollListingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
