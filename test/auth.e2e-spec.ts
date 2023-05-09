import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = moduleFixture.get<AuthService>(AuthService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password'
    };

    it('should return 201 created', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);
    });

    it('should throw 400 bad request if email already exists', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should return access token', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(201)
        .then((response) => {
          expect(response.body.access_token).toBeDefined();
          token = response.body.access_token;
        });
    });

    it('should throw 401 unauthorized if credentials are invalid', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('/auth/google (GET)', () => {
    it('should return 302 redirect', async () => {
      return request(app.getHttpServer())
        .get('/auth/google')
        .expect(302);
    });
  });

  describe('/auth/google-redirect (GET)', () => {
    it('should return access token', async () => {
      return request(app.getHttpServer())
        .get('/auth/google-redirect')
        .expect(302)
        .then((response) => {
          expect(response.headers.location).toContain('token=');
          token = response.headers.location.split('=')[1];
        });
    });

    it('should throw 401 unauthorized if user is not authenticated', async () => {
      return request(app.getHttpServer())
        .get('/auth/google-redirect')
        .expect(401);
    });
  });

  describe('/auth/linkedin (GET)', () => {
    it('should return 302 redirect', async () => {
      return request(app.getHttpServer())
        .get('/auth/linkedin')
        .expect(302);
    });
  });
});