import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { Grade } from "./Grade";

@ObjectType()
@Entity()
export class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name?: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.skill)
  grades: Grade[];
}
