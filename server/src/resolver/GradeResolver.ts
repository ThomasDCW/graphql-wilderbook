import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Grade } from "../entity/Grade";
import dataSource from "../utils";

@Resolver()
class GradeResolver {
  @Query(() => [Grade])
  async grades(): Promise<Grade[]> {
    const result = await dataSource
      .getRepository(Grade)
      .find({ relations: { skill: true, wilder: true } });
    return result;
  }

  @Mutation(() => Grade)
  async addGrade(
    @Arg("wilderId") wilderId: number,
    @Arg("skillId") skillId: number,
    @Arg("grade") grade: number
  ): Promise<Grade> {
    const addGrade = await dataSource.getRepository(Grade).save({
      grade,
      wilderId,
      skillId,
    });
    return addGrade;
  }
}

export default GradeResolver;
