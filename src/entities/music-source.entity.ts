
import { IsString, IsUrl, IsOptional, IsEnum } from 'class-validator';

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
  
  @IsUrl()
  externalLink: string;

  @IsString()
  @IsEnum(supportedProviderTypes)
  providerType: supportedProviderTypes;
  
  @IsUrl()
  @IsOptional()
  embedLink?: string;

  constructor(data: MusicSource) {
    Object.assign(this, data);
  }
}