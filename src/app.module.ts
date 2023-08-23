import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import { StreamModule } from './stream/stream.module';
import { EpisodeModule } from './episode/episode.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';

import { FileModule } from './file/file.module';
import { GenreSeriesModule } from './genre-series/genre-series.module';
import { GenreModule } from './genre/genre.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authentication/guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UserModule,
    StreamModule,
    EpisodeModule,
    SeasonModule,
    SeriesModule,
    GenreSeriesModule,
    GenreModule,
    FileModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://mtalhasaleem22:NoMyWl1GdLrzeJ9j@database.1u29mq1.mongodb.net/test?retryWrites=true&w=majority',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
