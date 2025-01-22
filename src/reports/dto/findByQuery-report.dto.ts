
import { Expose, Transform } from "class-transformer";
import { IsString, IsNumber, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class FindByQueryReport {

    @IsString()
     make: string; 
    
    @IsString()
     model: string; 
    
    @Transform(({value})=>parseFloat(value))
    @IsLatitude() 
     lat: number; 
    
    @Transform(({value})=>parseFloat(value))
    @IsLongitude() 
     long: number; 
    
    @Transform(({value})=>parseInt(value))
    @IsNumber() 
    @Min(1930)
    @Max(2050)
     year: number; 
    
    @Transform(({value})=>parseInt(value))
    @IsNumber() 
    @Min(0)
    @Max(1000000)
     milage: number; 

}