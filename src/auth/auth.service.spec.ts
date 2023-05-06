import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findOneOrCreate: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return the user if the credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const uuid = '123e4567-e89b-12d3-a456-426614174000';

      const mockUser = {
        uuid,
        email,
        password,
      };

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => mockUser);

      const result = await authService.validateUser(email, password);

      expect(usersService.findOne).toHaveBeenCalledWith(email);
      expect(result.email).toEqual(email);
    });

    it('should return null if the credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      jest.spyOn(usersService, 'findOne').mockImplementation(async () => null);

      const result = await authService.validateUser(email, password);

      expect(usersService.findOne).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a token object', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockPayload = { email: mockUser.email };

      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'mockToken');

      const result = await authService.login(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const mockDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(usersService, 'create').mockImplementation(async () => ({  uuid: "123e4567-e89b-12d3-a456-426614174000", ...mockDto }));

      const result = await authService.register(mockDto);

      expect(usersService.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual({ uuid: "123e4567-e89b-12d3-a456-426614174000", ...mockDto });
    });
  });

  describe('googleLogin', () => {
    it('should throw an UnauthorizedException if user is not provided in request', async () => {
      const mockReq = {};

      await expect(authService.googleLogin(mockReq)).rejects.toThrow(UnauthorizedException);
    });

    it('should create a new user if user does not exist', async () => {
      const mockReq = { user: { uuid: "123e4567-e89b-12d3-a456-426614174000", email: 'test@example.com', name: 'Test User' } };
      const mockToken = {access_token: 'mockToken'}

      jest.spyOn(usersService, 'findOneOrCreate').mockImplementation(async () => mockReq.user);
      jest.spyOn(authService, 'login').mockImplementation(async () => mockToken)

      const result = await authService.googleLogin(mockReq);

      expect(usersService.findOneOrCreate).toHaveBeenCalledWith(mockReq.user);
      expect(result).toEqual(mockToken);
    });
    
    it('should return the user if user exists', async () => {
      const mockReq = { user: { email: 'test@example.com', name: 'Test User' } };
      const mockToken = {access_token: 'mockToken'}

      jest.spyOn(usersService, 'findOneOrCreate').mockImplementation(async () => ({uuid: "123e4567-e89b-12d3-a456-426614174000", ...mockReq.user}));
      jest.spyOn(authService, 'login').mockImplementation(async () => mockToken)

      const result = await authService.googleLogin(mockReq);

      expect(usersService.findOneOrCreate).toHaveBeenCalledWith(mockReq.user);
      expect(result).toEqual(mockToken);
    });
  });

  describe('linkedinLogin', () => {
    it('should throw an UnauthorizedException if user is not provided in request', async () => {
      const mockReq = {};

      await expect(authService.linkedInLogin(mockReq)).rejects.toThrow(UnauthorizedException);
    });

    it('should create a new user if user does not exist', async () => {
      const mockReq = { user: { uuid: "123e4567-e89b-12d3-a456-426614174000", email: 'test@example.com', name: 'Test User' } };
      const mockToken = {access_token: 'mockToken'}

      jest.spyOn(usersService, 'findOneOrCreate').mockImplementation(async () => mockReq.user);
      jest.spyOn(authService, 'login').mockImplementation(async () => mockToken)

      const result = await authService.linkedInLogin(mockReq);

      expect(usersService.findOneOrCreate).toHaveBeenCalledWith(mockReq.user);
      expect(result).toEqual(mockToken);
    });
    
    it('should return the user if user exists', async () => {
      const mockReq = { user: { email: 'test@example.com', name: 'Test User' } };
      const mockToken = {access_token: 'mockToken'}

      jest.spyOn(usersService, 'findOneOrCreate').mockImplementation(async () => ({uuid: "123e4567-e89b-12d3-a456-426614174000", ...mockReq.user}));
      jest.spyOn(authService, 'login').mockImplementation(async () => mockToken)

      const result = await authService.linkedInLogin(mockReq);

      expect(usersService.findOneOrCreate).toHaveBeenCalledWith(mockReq.user);
      expect(result).toEqual(mockToken);
    });
  });
});

