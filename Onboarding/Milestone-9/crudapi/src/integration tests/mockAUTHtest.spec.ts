// src/integration tests/mockAUTHtest.spec.ts
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

import { ItemsController } from '../crudmodule/DB/crudmodule.ItemsController';
import { ItemsService } from '../crudmodule/DB/items.service';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AdminOnlyGuard } from '../../auth/admin-only.guard';

describe('Items (auth, e2e)', () => {
  let app: INestApplication;

  const serviceMock: jest.Mocked<Partial<ItemsService>> = {
    create: jest.fn(async (dto: any) => ({ id: 1, ...dto })),
  };

  beforeAll(async () => {
    process.env.JWT_ISSUER = 'http://localhost/';
    process.env.JWT_AUDIENCE = 'api://default';

    const modRef = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ItemsController],
      providers: [
        JwtStrategy,
        JwtAuthGuard,
        AdminOnlyGuard,
        { provide: ItemsService, useValue: serviceMock },
      ],
    }).compile();

    app = modRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  afterEach(() => jest.clearAllMocks());

  function signToken(payload: Record<string, any>) {
    //bit that builds a JWT
    return jwt.sign(payload, 'dev-secret', {
      algorithm: 'HS256',
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      expiresIn: '15m',
    });
  }

  it('POST /items -> 201 with valid admin token', async () => {
    const token = signToken({ sub: 'user1', roles: ['admin'] });

    await request(app.getHttpServer())
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Alpha', description: 'first', quantity: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Alpha',
          description: 'first',
          quantity: 2,
        });
      });

    expect(serviceMock.create).toHaveBeenCalled();
  });

  it('POST /items -> 403 when missing role', async () => {
    const token = signToken({ sub: 'user1', roles: ['user'] }); // no admin

    await request(app.getHttpServer())
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Alpha' })
      .expect(403);

    expect(serviceMock.create).not.toHaveBeenCalled();
  });

  it('POST /items -> 401 with bad signature', async () => {
    const bad = jwt.sign({ sub: 'user1' }, 'WRONG_SECRET', {
      algorithm: 'HS256',
    });

    await request(app.getHttpServer())
      .post('/items')
      .set('Authorization', `Bearer ${bad}`)
      .send({ name: 'Alpha' })
      .expect(401);

    expect(serviceMock.create).not.toHaveBeenCalled();
  });
});
