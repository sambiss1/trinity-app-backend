import { PartialType } from '@nestjs/swagger';
import { CreatePayrollListingDto } from './create-payroll_listing.dto';

export class UpdatePayrollListingDto extends PartialType(CreatePayrollListingDto) {}
