import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add validation to requests
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get("app.port");
  const enableCors = config.get("app.corsEnabled");

  if (enableCors) app.enableCors();

  await app.listen(port);
}
bootstrap();
