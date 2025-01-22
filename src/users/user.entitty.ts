import { report } from "src/reports/report.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { AfterInsert, AfterUpdate, AfterRemove } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class users {
 @PrimaryGeneratedColumn() 
 id: number; 

 @Column()
 email: string; 
 
 @Column()
 password: string; 

 @Column({default : true})
 isAdmin: boolean; 

 @OneToMany(() => report, (reports) => reports.user) 
 reports: report[]

 @AfterInsert() 
 logInsert() {
    console.log(`New data inserted with id ${this.id}`)
 }
 @AfterUpdate() 
 logUpdate() {
    console.log(`New data inserted with id ${this.id}`)
 }
 @AfterRemove() 
 logRemove() {
    console.log(`New data inserted with id ${this.id}`)
 }
}