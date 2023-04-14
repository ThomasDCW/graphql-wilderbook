import { Request, Response } from "express";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

const WilderController = {
  create: (req: Request, res: Response) => {
    const name: string = req.body.name.trim();
    const city: string = req.body.city.trim();
    if (name.length === 0 || city.length === 0) {
      return res.status(400).send("city and name can't be empty");
    } else {
      dataSource
        .getRepository(Wilder)
        .save({ name, city })
        .then((data) => {
          res.send(data);
        })
        .catch((err: any) => {
          console.log(err, "Error when creating wilder");
          res.send("Error when creating wilder");
        });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const allWilders = await dataSource
        .getRepository(Wilder)
        .find({ relations: { grades: { skill: true } } });
      res.send(allWilders);
    } catch (err) {
      console.log(err);
      res.send("Error while reading the wilders");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("wilder deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting wilder");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update({ id: req.body.id }, { name: req.body.name });
      res.send("wilder updated");
    } catch (err) {
      console.log(err);
      res.send("wilder not updated");
    }
  },
};
export default WilderController;
