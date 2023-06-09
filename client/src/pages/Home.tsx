import { useQuery, gql } from "@apollo/client";
import Wilder, { WilderProps } from "../components/Wilder";
import AddWilder from "../components/AddWilder";
import AddSkill from "../components/AddSkill";
import AddSkillWithGrade from "../components/AddSkillWithGrade";
import { Key } from "react";

export interface SkillAPI {
  id: number;
  name: string;
}

interface GradeAPI {
  grade: number;
  skill: SkillAPI;
}

interface WilderAPI {
  id: number;
  city: string;
  name: string;
  grades: GradeAPI[];
}

export const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      city
      grades {
        grade
        skill {
          id
          name
        }
      }
    }
  }
`;

const formatWildersFromApi = (wilders: WilderAPI[]): WilderProps[] =>
  wilders.map((wilder) => {
    return {
      id: wilder.id,
      name: wilder.name,
      city: wilder.city,
      skills: wilder.grades.map((grade) => {
        return { vote: grade.grade, name: grade?.skill.name };
      }),
    };
  });
export default function Home() {
  const { loading, error, data } = useQuery(GET_WILDERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const wilders = formatWildersFromApi(data.wilders);
  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book with Docker</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <div className="addform-card-row">
          <div className="addform">
            <AddWilder />
            <AddSkill />
            <AddSkillWithGrade wilders={wilders} />
          </div>
          <section className="card-row">
            {wilders?.map((wilderData, key: Key) => {
              return (
                <Wilder
                  key={key}
                  id={wilderData.id}
                  name={wilderData.name}
                  skills={wilderData.skills}
                  city={wilderData.city}
                />
              );
            })}
          </section>
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}
