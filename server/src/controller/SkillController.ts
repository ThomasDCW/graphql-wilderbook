import { Request, Response } from "express";
import { Skill } from "../entity/Skill";
import dataSource from "../utils";

const SkillController = {
  create: (req: Request, res: Response) => {
    const name: string = req.body.name.trim();
    if (name.length === 0) {
      return res.status(400).send("skill can't be empty");
    } else {
      dataSource
        .getRepository(Skill)
        .save({ name })
        .then(() => {
          res.send("Skill created");
        })
        .catch((err) => {
          console.log(err, "Error when creating Skill");
          res.send("Error when creating Skill");
        });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const allSkills = await dataSource.getRepository(Skill).find();
      res.send(allSkills);
    } catch (err) {
      console.log(err);
      res.send("Error while reading the Skills");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Skill).delete(req.params.id);
      res.send("Skill deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting Skill");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Skill)
        .update({ id: req.body.id }, { name: req.body.name });
      res.send("Skill updated");
    } catch (err) {
      console.log(err);
      res.send("Skill not updated");
    }
  },
};
export default SkillController;
