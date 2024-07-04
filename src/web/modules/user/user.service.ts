import {
  HttpException,
  HttpStatus,
  Injectable,
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
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly responseMappers: ResponseMapper,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterRequestDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(registerDto.password, salt);
    const user = this.userRepository.create({
      username: registerDto.username,
      role: registerDto.role,
      email: registerDto.email,
      password: hashPassword,
    });

    const userFromDb = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });

    const userFromDbWithEmail = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (userFromDb || userFromDbWithEmail) {
      throw new HttpException(
        { errorMessage: 'Username or Email already exists' },
        HttpStatus.CONFLICT,
      );
    }

    const registeredUser = await this.userRepository.save<UserEntity>(user);
    return this.responseMappers.registerResponse(registeredUser);
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

  async getUsers(): Promise<UserResponseDto[]> {
    return this.userRepository.find();
  }
}
