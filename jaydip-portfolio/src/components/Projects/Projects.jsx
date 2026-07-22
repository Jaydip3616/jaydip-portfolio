import "./Projects.css";

import projects from "../../data/projects";

import ProjectCard from "../Common/ProjectCard";

import SectionTitle from "../Common/SectionTitle";

function Projects(){

    return(

        <section className="projects">

            <div className="container">

                <SectionTitle

                    subtitle="Portfolio"

                    title="Featured Projects"

                />

                <div className="projects-grid">

                    {projects.map((project)=>(

                        <ProjectCard

                            key={project.id}

                            title={project.title}

                            description={project.description}

                            technologies={project.technologies}

                        />

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Projects;