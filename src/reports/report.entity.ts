import { users } from "src/users/user.entitty";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class report {
 @PrimaryGeneratedColumn() 
 id: number; 

 @Column()
 price: number; 

 @Column()
 make: string; 

 @Column()
 model: string; 

 @Column()
 lat: number; 

 @Column()
 long: number; 

 @Column()
 year: number; 

 @Column()
 milage: number; 

 @Column({default : false})
 approved: boolean; 

 @ManyToOne(() => users, (user) => user.reports) 
 user: users
}