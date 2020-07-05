import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Get links', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('get links by user - success', () => {
    return request(app.getHttpServer())
      .get('/users/1/links')
      .expect(200)
      .expect('[{"id":1,"userId":1,"title":"Visit my Youtube Page","type":"classic","active":true,"url":"https://github.com/NickHenry/Linktree-Coding-Assessment"},{"id":2,"userId":1,"title":"New Tour","type":"show","active":true,"shows":[{"id":1,"date":1593851024,"saleDate":1593851024,"soldout":true,"venueName":"Stadium","venueCity":"Melbourne","externalLink":"http://tickettek.com"},{"id":2,"date":1656924763,"saleDate":1625388763,"venueName":"Stadium","venueCity":"Perth","externalLink":"http://tickettek.com"},{"id":3,"date":1625388763,"saleDate":1593852808,"venueName":"Stadium","venueCity":"Sydney","externalLink":"http://tickettek.com"}]},{"id":3,"userId":1,"title":"My new album","type":"music","active":false,"musicSources":[{"id":1,"externalLink":"https://spotify.com/album","embedLink":"https://spotify.com/song/1/embed","providerType":"spotify"},{"id":2,"externalLink":"https://applemusic.com/album","providerType":"applemusic"}]}]');
  });
  it('get links by user - user not found', () => {
    return request(app.getHttpServer())
      .get('/users/2/links')
      .expect(404)
      .expect('{"statusCode":404,"message":"User not found","error":"Not Found"}');
  });
  it('get links by user - bad user id', () => {
    return request(app.getHttpServer())
      .get('/users/non-id/links')
      .expect(400)
      .expect(/Validation failed/);
  });
});
