import { NanoModule } from '@monegov/nano';
import { Module } from '@nestjs/common';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService],
  imports: [
    NanoModule.forFeature({
      households: {
        households: {
          map: (data) => {
            if (data.type !== 'household') {
              return;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            emit(data._id, data);
          },
        },
      },
    }),
  ],
})
export class HouseholdsModule {}
