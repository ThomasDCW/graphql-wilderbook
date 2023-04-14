import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Skill } from "../entity/Skill";
import dataSource from "../utils";

@Resolver()
class SkillResolver {
  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    const result = await dataSource
      .getRepository(Skill)
      .find({ relations: { grades: { wilder: true } } });
    return result;
  }

  @Mutation(() => Skill)
  async createSkill(@Arg("name") name: string): Promise<Skill> {
    if (name.trim().length === 0) {
      throw new Error("Le nom du skill ne doit pas être vides.");
    }
    const newSkill = await dataSource.getRepository(Skill).save({ name });
    return newSkill;
  }
}
export default SkillResolver;
