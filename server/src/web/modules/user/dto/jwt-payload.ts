import { RoleEnum } from '@common/enums';

export class JwtPayload {
  username: string;
  role: RoleEnum;
}
