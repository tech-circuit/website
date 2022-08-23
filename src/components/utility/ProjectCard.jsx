import "../../styles/work.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, view, id }) => {
    console.log(project);
    const openProject = (e) => {
        e.preventDefault();
        view(project);
        // return false;
    };
    return (
        <>
            <Link
                onClick={openProject}
                to={`/project/${project._id}`}
                className="workCard"
            >
                <img
                    src={
                        project.cover
                            ? project.cover
                            : "/assets/userFlowIcon.svg"
                    }
                    alt="project img"
                />
                <h2>{project.title}</h2>
                <h3>{project.collaborators}</h3>
            </Link>
            {/* <a href={`project/${project._id}`}>View on sep page</a>  */}
        </>
    );
};

export default ProjectCard;
