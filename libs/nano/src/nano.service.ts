import { Inject, Injectable, Optional } from '@nestjs/common';
import * as Nano from 'nano';
import { NanoConfiguration } from './nano.module';

export type BaseDocument = {
  type: string;
  [prop: string]: unknown;
};

export type Design = {
  [viewName: string]: Nano.View<BaseDocument>;
};

export type Designs = {
  [designName: string]: Design;
};

@Injectable()
export class NanoService {
  private static server: Nano.ServerScope;
  private static database: Nano.DatabaseScope;
  private static document: Nano.DocumentScope<BaseDocument>;

  private static designs: Designs | undefined = {};

  get serverScope() {
    return NanoService.server;
  }

  get databaseScope() {
    return NanoService.database;
  }

  get documentScope() {
    return NanoService.document;
  }

  constructor(
    @Optional() @Inject('NANO_CONFIG') config?: NanoConfiguration,
    @Optional() @Inject('NANO_DESIGNS') designs?: Designs,
  ) {
    if (config) {
      NanoService.init(config);
    }
    if (designs) {
      NanoService.initDesigns(designs);
    }
  }

  private static async init(config: NanoConfiguration) {
    this.server = Nano(config.connection);
    this.database = this.server.db;
    const dbs = await this.database.list();
    if (!dbs.includes(config.database)) {
      await this.database.create(config.database);
    }
    this.document = this.database.use(config.database);
    if (config.designs) {
      NanoService.designs = NanoService.assignDesigns(
        NanoService.designs || {},
        config.designs,
      );
    }
    await this._initDesigns(this.designs || {});
    this.designs = undefined;
  }

  private static initDesigns(designs: Designs) {
    if (NanoService.designs) {
      NanoService.designs = NanoService.assignDesigns(
        NanoService.designs,
        designs,
      );
      return;
    }
    this._initDesigns(designs);
  }

  private static async _initDesigns(designs: Designs) {
    for (const designName in designs) {
      if (!Object.prototype.hasOwnProperty.call(designs, designName)) {
        continue;
      }
      const design = designs[designName];
      let fromDb: { views: Design } = { views: {} };
      try {
        fromDb =
          (await (this.document as Nano.DocumentScope<any>).get(
            '_design/' + designName,
          )) || {};
      } catch (e) {}
      let needUpdate = false;
      for (const viewName in design) {
        if (Object.prototype.hasOwnProperty.call(fromDb.views, viewName)) {
          needUpdate = true;
          break;
        }
      }
      fromDb.views = Object.assign(fromDb.views, design);
      if (needUpdate) {
        const res = await (this.document as Nano.DocumentScope<any>).insert(
          fromDb,
          '_design/' + designName,
        );
        console.log(res);
      }
    }
  }

  private static assignDesigns(a: Designs, b: Designs) {
    for (const designName in b) {
      if (Object.prototype.hasOwnProperty.call(b, designName)) {
        if (a[designName]) {
          Object.assign(a[designName], b[designName]);
        } else {
          a[designName] = b[designName];
        }
      }
    }
    return a;
  }
}
