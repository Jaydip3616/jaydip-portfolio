import "./ProjectCard.css";

function ProjectCard({ title, description, technologies }) {

    return (

        <div className="project-card">

            <h3>{title}</h3>

            <p>{description}</p>

            <div className="tech-stack">

                {technologies.map((tech,index)=>(

                    <span key={index}>

                        {tech}

                    </span>

                ))}

            </div>

            <button>

                View Project

            </button>

        </div>

    );

}

export default ProjectCard;