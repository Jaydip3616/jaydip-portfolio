import "./Skills.css";

import skills from "../../data/skills";

import SkillCard from "../Common/SkillCard";

import SectionTitle from "../Common/SectionTitle";

function Skills(){

    return(

        <section className="skills">

            <div className="container">

                <SectionTitle

                    subtitle="My Expertise"

                    title="Skills & Technologies"

                />

                <div className="skills-grid">

                    {skills.map((skill)=>(

                        <SkillCard

                            key={skill.id}

                            title={skill.title}

                            technologies={skill.technologies}

                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Skills;