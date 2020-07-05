import Show from "./show.entity";
import MusicSource from "./music-source.entity";
import { IsArray, IsUrl, IsNumber, IsOptional, MaxLength, IsString, ValidateIf, IsNotEmpty, IsEnum } from 'class-validator';

export enum supportedLinkTypes {
  CLASSIC = 'classic',
  SHOW = 'show',
  MUSIC = 'music'
}

export default class Link {
  @IsNumber() 
  @IsOptional() 
  id?: number;
  
  @MaxLength(144)
  @IsString()
  title: string;

  @IsNumber() 
  @IsOptional() 
  userId?: number;

  @IsNotEmpty()
  @IsEnum(supportedLinkTypes)
  type: supportedLinkTypes;

  @IsOptional() 
  active?: boolean;

  @ValidateIf(o => o.type === supportedLinkTypes.CLASSIC)
  @IsUrl()
  url?: string;

  @ValidateIf(o => o.type === supportedLinkTypes.SHOW)
  @IsArray()
  shows?: Show[];

  @ValidateIf(o => o.type === supportedLinkTypes.MUSIC)
  @IsArray()
  musicSources?: MusicSource[];

  constructor(data: Link) {
    Object.assign(this, data);
  }
}