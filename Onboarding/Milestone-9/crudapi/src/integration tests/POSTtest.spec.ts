// src/integration tests/POSTtest.spec.ts
import request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { ItemsController } from '../crudmodule/DB/crudmodule.ItemsController';
import { ItemsService } from '../crudmodule/DB/items.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AdminOnlyGuard } from '../../auth/admin-only.guard';
import { APP_GUARD } from '@nestjs/core';

class AllowAllGuard implements CanActivate {
  canActivate(_ctx: ExecutionContext) {
    return true;
  }
}

describe('POST /items (validation)', () => {
  let app: INestApplication;

  const serviceMock: jest.Mocked<Partial<ItemsService>> = {
    create: jest.fn(async (dto) => ({ id: 1, ...dto })),
  };

  beforeAll(async () => {
    const builder = Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: serviceMock }],
    });

    builder.overrideGuard(JwtAuthGuard).useValue(new AllowAllGuard());
    builder.overrideGuard(AdminOnlyGuard).useValue(new AllowAllGuard());

    builder.overrideProvider(APP_GUARD).useValue(new AllowAllGuard()); //just in case

    const mod = await builder.compile();

    app = mod.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(() => app.close());
  afterEach(() => jest.clearAllMocks());

  it('201 on valid body', async () => {
    await request(app.getHttpServer())
      .post('/items')
      .send({ name: 'alpha', quantity: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ id: 1, name: 'alpha', quantity: 2 });
      });
  });

  it('400 on invalid body', async () => {
    await request(app.getHttpServer())
      .post('/items')
      .send({ qty: 'nope' }) // extra field + missing "name"
      .expect(400);

    expect(serviceMock.create).not.toHaveBeenCalled();
  });
});
