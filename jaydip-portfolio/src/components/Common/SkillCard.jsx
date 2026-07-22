import "./SkillCard.css";

function SkillCard({ title, technologies }) {

    return (

        <div className="skill-card">

            <h3>{title}</h3>

            <ul>

                {technologies.map((tech,index)=>(

                    <li key={index}>
                        {tech}
                    </li>

                ))}

            </ul>

        </div>

    );

}

export default SkillCard;