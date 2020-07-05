
import { IsString, IsNumber, IsUrl, IsBoolean, IsOptional } from 'class-validator';


export default class Show {
  @IsOptional() 
  id?: number;

  @IsNumber()
  date: number;

  @IsOptional()
  @IsBoolean()
  soldout?: boolean;

  @IsNumber()
  saleDate: number;
  
  @IsString()
  venueName: string;

  @IsString()
  venueCity: string;
  
  @IsUrl()
  externalLink: string;

  constructor(data: Show) {
    Object.assign(this, data);
  }
}