import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {} from '../src/auth/auth.module';
import { AppModule } from './../src/app.module';
import { UserRole } from './../src/user/schemas';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should created a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signUp')
      .send({
        username: 'hello',
        email: 'hello@gmail.com',
        password: 'hello',
        address: 'Thailand',
        user_role: UserRole.User,
      });

    expect(response.body).toEqual({
      message: ['Create New User Success'],
      statusCode: HttpStatus.CREATED,
      content: {
        _id: expect.any(String), // Adjust based on your actual response structure
        username: 'hello',
        email: 'hello@gmail.com',
        access_token: expect.any(String),
      },
      error: '',
    });
  });

  it('should user sign in', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({
        email: 'hello@gmail.com',
        password: 'hello',
      });

    expect(response.body).toEqual({
      message: ['User SignIn Success'],
      statusCode: HttpStatus.OK,
      content: {
        _id: expect.any(String), // Adjust based on your actual response structure
        username: 'hello',
        email: 'hello@gmail.com',
        access_token: expect.any(String),
      },
      error: '',
    });
  });
});
