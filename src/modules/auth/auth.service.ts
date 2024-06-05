import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  readonly token = 'tcfvghbjnjjkkmlkl,luhbyfcr';

  validate(receivedToken): boolean {
    return receivedToken === this.token;
  }
  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne() {
    return `This action returns a #id auth`;
  }

  update() {
    return `This action updates a #id auth`;
  }

  remove() {
    return `This action removes a #id auth`;
  }
}
