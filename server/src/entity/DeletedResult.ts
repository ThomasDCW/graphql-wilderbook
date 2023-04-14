import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class DeletedResult {
  @Field(() => [String])
  raw: string[];

  @Field()
  affected: number;
}
