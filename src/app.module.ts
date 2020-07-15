import { Module, MiddlewareConsumer, NestModule,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';


@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController)
  }
}
