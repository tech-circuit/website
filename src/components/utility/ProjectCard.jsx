import "../../styles/work.css";

const ProjectCard = ({project, view}) => {
    return(
        <>
            <div
                onClick={view}
                key={project._id}
                to={`/edit-project/${project._id}`}
                className="workCard"
            >
                <img
                    src={project.cover_image}
                    alt="project img"
                />
                <h2>{project.title}</h2>
                <h3>{project.collaborators}</h3>
            </div>
        </>
    )
}

export default ProjectCard;