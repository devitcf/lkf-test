import { SetMetadata } from "@nestjs/common";

export const TokenType = (tokenType: string) => SetMetadata("tokenType", tokenType);
