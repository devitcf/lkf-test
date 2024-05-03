import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Jwt } from "../customer/entities/jwt.entity";

export const GetCurrentUser = createParamDecorator((data: keyof Jwt, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!data) return request.user;
  return request.user[data];
});
