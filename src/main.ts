import { bootstrap } from '@scp/backend-helper';

import { AppModule } from './app.module';

bootstrap(AppModule).then(async (app) => {
  app.setGlobalPrefix('api/v1/analytics');

  await app.listen(3000);
});
