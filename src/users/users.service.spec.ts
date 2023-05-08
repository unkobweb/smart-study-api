import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findOne', () => {
    it('should return a user if one exists with the given email', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);

      const result = await usersService.findOne('test@example.com');

      expect(result).toBe(user);
    });

    it('should return undefined if no user exists with the given email', async () => {
      jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => undefined);

      const result = await usersService.findOne('test@example.com');

      expect(result).toBeUndefined();
    });
  });

  describe('findOneOrCreate', () => {
    it('should return an existing user if one exists with the given email', async () => {
      const existingUser = new User();
      existingUser.email = 'test@example.com';
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => existingUser);

      const result = await usersService.findOneOrCreate({ email: 'test@example.com' });

      expect(result).toBe(existingUser);
    });

    it('should create a new user if no user exists with the given email', async () => {
      const newUser = new User();
      newUser.email = 'test@example.com';
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => undefined);
      jest.spyOn(usersService, 'create').mockImplementation(async () => newUser);

      const result = await usersService.findOneOrCreate({ email: 'test@example.com' });

      expect(result).toBe(newUser);
      expect(usersService.create).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  describe('create', () => {
    it('should save the given user to the database', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(usersRepository, 'save').mockImplementation(async () => user);

      const result = await usersService.create(user);

      expect(result).toBe(user);
      expect(usersRepository.save).toHaveBeenCalledWith(user);
    });
  });
});