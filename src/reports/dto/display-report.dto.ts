
import { Expose, Transform } from "class-transformer";
import { IsString, IsNumber, IsLatitude, IsLongitude, Min, Max } from "class-validator";

export class DisplayReportDto {
    @Expose()
     price: number; 
    
    @Expose()
     make: string; 
    
    @Expose() 
     model: string; 
    
    @Expose() 
     lat: number; 
    
    @Expose() 
     long: number; 
    
    @Expose() 
     year: number; 
    
    @Expose() 
     milage: number; 

    @Transform(({obj}) => obj.user.id)
    @Expose() 
    userId: number
}