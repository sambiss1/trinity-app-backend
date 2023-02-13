import { Module } from '@nestjs/common';
import { PayrollListingService } from './payroll_listing.service';
import { PayrollListingController } from './payroll_listing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollListing, PayrollListingSchema } from 'src/schemas/payrollListing.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: PayrollListing.name, schema: PayrollListingSchema }])],
  controllers: [PayrollListingController],
  providers: [PayrollListingService]
})
export class PayrollListingModule {}
