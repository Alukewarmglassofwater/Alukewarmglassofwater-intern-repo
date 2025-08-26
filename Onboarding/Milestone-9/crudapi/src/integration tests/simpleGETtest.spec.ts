// test/app.integration-spec.ts
// Adjust import paths if your files live elsewhere
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  AppController,
  AddTwoNumbersController,
  SubtractTwoNumbersController,
} from '../app.controller';
import {
  AppService,
  AddTwoNumbersService,
  SubtractTwoNumbersService,
} from '../app.service';

describe('GET endpoints (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        AppController,
        AddTwoNumbersController,
        SubtractTwoNumbersController,
      ],
      providers: [AppService, AddTwoNumbersService, SubtractTwoNumbersService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / -> "Hello World!"', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toBe('Hello World!');
      });
  });

  it('GET /math/add?a=5&b=7 -> 12', async () => {
    await request(app.getHttpServer())
      .get('/math/add')
      .query({ a: '5', b: '7' })
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(Number(res.text)).toBe(12);
      });
  });

  it('GET /moreMath/subtract?a=7&b=5 -> 2', async () => {
    await request(app.getHttpServer())
      .get('/moreMath/subtract')
      .query({ a: '7', b: '5' })
      .expect(200)
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(Number(res.text)).toBe(2);
      });
  });
});
