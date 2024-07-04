import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities';
import {
  JwtPayload,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
} from './dto';
import { ResponseMapper } from './mappers/response.mapper';

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

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload: JwtPayload = {
        username: loginDto.username,
        role: user.role,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_KEY,
      });

      return this.responseMappers.loginResponse(user, accessToken);
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
