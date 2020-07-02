export enum supportedProviderTypes {
  SPOTIFY = 'spotify',
  APPLE_MUSIC = 'applemusic',
  SOUNDCLOUD = 'soundcloud',
  YOUTUBE_MUSIC = 'youtubemusic',
  DEEZER = 'deezer',
  TIDAL = 'tidal',
  BANDCAMP = 'bandcamp',
}

export default class MusicSource {
  id: number;
  externalLink: string;
  providerType: supportedProviderTypes;
}