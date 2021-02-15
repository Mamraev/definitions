import { NestFactory } from '@nestjs/core';
import {DefinitionsModule} from "./definitions/DefinitionsModule";

async function bootstrap() {
  const app = await NestFactory.create(DefinitionsModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
