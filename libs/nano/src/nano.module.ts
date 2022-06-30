import { DynamicModule, Module } from '@nestjs/common';
import * as Nano from 'nano';
import { Designs, NanoService } from './nano.service';

export enum UpdateType {
  NEW_VIEW,
  OVERWRITE_VIEW,
  DROP_CREATE,
}

export type NanoConfiguration = {
  connection: Nano.Configuration;
  database: string;
  designs?: Designs;
  updateType?: UpdateType;
};

@Module({ providers: [NanoService], exports: [NanoService] })
export class NanoModule {
  static forRoot(config: NanoConfiguration): DynamicModule {
    // this.service.initDesigns(config.designs || {});
    return {
      module: NanoModule,
      providers: [{ provide: 'NANO_CONFIG', useValue: config }, NanoService],
      exports: [NanoService],
    };
  }
  static forFeature(designs?: Designs): DynamicModule {
    return {
      module: NanoModule,
      providers: [{ provide: 'NANO_DESIGNS', useValue: designs }, NanoService],
      exports: [NanoService],
    };
  }
}
