import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";

export class ApproveReportDto {
    @Expose()
    @IsBoolean()
    approve : boolean
}