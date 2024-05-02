import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, validateSync } from "class-validator";

class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  APP_PORT: number;

  @IsNumber()
  @IsOptional()
  CORS_ENABLED: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
