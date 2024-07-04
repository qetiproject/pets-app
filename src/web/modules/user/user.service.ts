import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities';
import { RegisterRequestDto } from './dto';
import { ResponseMapper } from './mappers/response.mappers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly responseMappers: ResponseMapper,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterRequestDto): Promise<any> {
    const { username, password, role, email } = registerDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      role,
      email,
      password: hashPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    const registerdUser =
      await this.userRepository.save<UserEntity>(registerDto);

    return this.responseMappers.registerResponse(registerdUser);
  }

  // async login(authCredentialsDto: any): Promise<{ accessToken: string }> {
  //   const { username, password } = authCredentialsDto;
  //   const user = await this.authRepository.findOne({
  //     where: { username },
  //   });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { username };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check your login credentials');
  //   }
  // }
}
