import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities';
import {
  JwtPayload,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
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

  async registerUser(
    registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
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

  async getUsersService(): Promise<Omit<UserEntity, 'password'>[]> {
    const users: UserEntity[] = await this.userRepository.find();

    const usersWithoutPassword: Omit<UserEntity, 'password'>[] = users.map(
      (user) => ({
        username: user.username,
        email: user.email,
        role: user.role,
      }),
    );

    return usersWithoutPassword;
  }

  async getUserByUsernameService(
    username: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username },
      });
      return this.responseMappers.userResponse(user);
    } catch (error) {
      throw new HttpException(
        { error: `User with username: ${username} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
