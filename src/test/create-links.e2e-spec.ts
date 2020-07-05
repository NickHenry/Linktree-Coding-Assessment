import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Create link', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('create link for user - invalid type', () => {
    return request(app.getHttpServer())
      .post('/users/1/links')
      .send({
        title: "New cool title",
        type: 'invalid type'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/type must be a valid enum value/);
  });
  it('create link for user - title too long', () => {
    return request(app.getHttpServer())
      .post('/users/1/links')
      .send({
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus massa eu libero dapibus, sed luctus mi tempor. In pellentesque lacus ut leo ultricies tincidunt. Fusce efficitur purus eu leo vehicula elementum. Integer enim quam, ornare ac elementum at, dictum non erat. Nunc tincidunt felis metus, ac vulputate dolor sodales at. Suspendisse vitae egestas ligula, volutpat consequat enim. Mauris ligula lorem, porta eu diam et, luctus rutrum justo. Sed feugiat elementum lectus a ultricies. Pellentesque feugiat orci tristique luctus euismod. Proin vehicula viverra ex ac fermentum. Sed bibendum leo lobortis lacus pharetra, eu tristique nunc facilisis. Aliquam elementum, nulla sit amet egestas congue, nisl turpis rhoncus lectus, vel ultricies arcu nibh eu nulla.",
        type: 'classic',
        url: 'https://google.com.au'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/title must be shorter than or equal to 144 characters/);
  });
  it('create link for user - classic - success', () => {
    return request(app.getHttpServer())
      .post('/users/1/links')
      .send({
        title: "New cool title",
        type: 'classic',
        url: 'github.com/NickHenry/Linktree-Coding-Assessment'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });
  it('create link for user - classic - success url with params', () => {
    return request(app.getHttpServer())
      .post('/users/1/links')
      .send({
        title: "New cool title",
        type: 'classic',
        url: 'https://github.com/NickHenry/Linktree-Coding-Assessment?sort=true'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });
  it('create link for user - classic - invalid URL', () => {
    return request(app.getHttpServer())
      .post('/users/1/links')
      .send({
        title: "New cool title",
        type: 'classic',
        url: 'non url format'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/url must be an URL address/);
  });
  it('create link for user - show - success', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: [
        {
          date: 1593952300,
          soldout: false,
          saleDate: 1562329900,
          venueName: 'Optus Stadium',
          venueCity: 'Perth',
          externalLink: 'www.tickettek.com'
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);
  });
  it('create link for user - show - empty shows', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: []
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);
  });
  it('create link for user - show - invalid show', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: 'invalid'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(/shows must be an array/)
    .expect(400);
  });
  it('create link for user - show - invalid date', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: [
        {
          date: "non-epoch date",
          soldout: false,
          saleDate: 1562329900,
          venueName: 'Optus Stadium',
          venueCity: 'Perth',
          externalLink: 'www.tickettek.com'
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(/date must be a number/)
    .expect(400);
  });
  it('create link for user - show - invalid external link', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: [
        {
          date: 1593952300,
          soldout: false,
          saleDate: 1562329900,
          venueName: 'Optus Stadium',
          venueCity: 'Perth',
          externalLink: 'non-url'
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect(/externalLink must be an URL address/)
    .expect(400);
  });
  it('create link for user - show - invalid sold out', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'show',
      shows: [
        {
          date: 1593952300,
          soldout: "no",
          saleDate: 1562329900,
          venueName: 'Optus Stadium',
          venueCity: 'Perth',
          externalLink: 'www.tickettek.com'
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect(/soldout must be a boolean/)
    .expect(400);
  });

  it('create link for user - music - success', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'music',
      musicSources: [
        {
          externalLink: "http://something.spotify.com/",
          providerType: "spotify",
          embedUrl: "https://embed.spotify.com"
        },
        {
          externalLink: "http://something.applemusic.com/",
          providerType: "applemusic"
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);
  });
  it('create link for user - music - empty shows', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'music',
      musicSources: []
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201);
  });
  it('create link for user - music - invalid provider type', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'music',
      musicSources: [
        {
          externalLink: "https://spotify.com/",
          providerType: "something invalid"
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(/providerType must be a valid enum value/)
    .expect(400);
  });
  it('create link for user - music - invalid external link', () => {
    return request(app.getHttpServer())
    .post('/users/1/links')
    .send({
      title: "New cool title",
      type: 'music',
      musicSources: [
        {
          externalLink: "not a real url",
          providerType: "spotify"
        },
        {
          externalLink: "http://something.applemusic.com/",
          providerType: "applemusic"
        }
      ]
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(/externalLink must be an URL address/)
    .expect(400);
  });
});
