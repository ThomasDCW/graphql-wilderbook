import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Grade {
  @Field()
  @PrimaryColumn()
  wilderId: number;

  @Field()
  @PrimaryColumn()
  skillId: number;

  @Field()
  @Column()
  grade: number;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, (wilder) => wilder.grades, { onDelete: "CASCADE" })
  wilder?: Wilder;

  @Field(() => Skill)
  @ManyToOne(() => Skill, (skill) => skill.grades)
  skill?: Skill;
}
