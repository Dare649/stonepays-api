import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';

@Module({
  providers: [ExchangeRateService],
  controllers: [ExchangeRateController]
})
export class ExchangeRateModule {}
