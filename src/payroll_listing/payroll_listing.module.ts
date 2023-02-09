import { Module } from '@nestjs/common';
import { PayrollListingService } from './payroll_listing.service';
import { PayrollListingController } from './payroll_listing.controller';

@Module({
  controllers: [PayrollListingController],
  providers: [PayrollListingService]
})
export class PayrollListingModule {}
