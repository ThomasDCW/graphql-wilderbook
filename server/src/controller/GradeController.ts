import { Request, Response } from "express";
import { Grade } from "../entity/Grade";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

const GradeController = {
  create: async (req: Request, res: Response) => {
    try {
      const wilderToGrade = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ id: req.body.wilderId });
      console.log(wilderToGrade);
      const skillToGrade = await dataSource
        .getRepository(Skill)
        .findOneByOrFail({ id: req.body.skillId });
      console.log(skillToGrade);
      await dataSource.getRepository(Grade).save({
        grade: req.body.grade,
        wilder: wilderToGrade,
        skill: skillToGrade,
      });
      res.send("Grade created");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
export default GradeController;
