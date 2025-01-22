
import { IsString, IsNumber, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    @Max(1000000)
     price: number; 
    
    @IsString()
     make: string; 
    
    @IsString() 
     model: string; 
    
    @IsLatitude() 
     lat: number; 
    
    @IsLongitude() 
     long: number; 
    
    @IsNumber() 
    @Min(1930)
    @Max(2050)
     year: number; 
    
    @IsNumber() 
    @Min(0)
    @Max(1000000)
     milage: number; 
}