import "./ProjectCard.css";

function ProjectCard({ title, description, technologies, github }) {

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

            {github ? (
                <a href={github} target="_blank" rel="noopener noreferrer">
                    <button>View Project</button>
                </a>
            ) : (
                <button disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    View Project
                </button>
            )}

        </div>

    );

}

export default ProjectCard;