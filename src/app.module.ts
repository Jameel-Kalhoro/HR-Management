import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from './candidate/candidate.module';
import * as config from '@nestjs/config';
import { root } from './utils/paths';
import { JobApplicationModule } from './job-application/job-application.module';
import { JobModule } from './job/job.module';
@Module({
  imports: [
    config.ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${root}/data/job.sqlite`,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable in production
    }),
    JobApplicationModule,
    CandidateModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
