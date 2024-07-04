// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly config: ConfigService,
//   ) {}

//   validate(receivedToken: string): unknown | false {
//     receivedToken = receivedToken.replace('Bearer ', '');

//     try {
//       return this.jwtService.verify(receivedToken, {
//         secret: this.config.get('secretKey'),
//       });
//     } catch (e) {
//       console.log(e);

//       return false;
//     }
//   }
// }
