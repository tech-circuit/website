import "../../styles/work.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, view, id }) => {
    return (
        <>
        <Link
            onClick={project.uploader.toString() === id ? null : view}
            to={
                project.uploader.toString() === id
                    ? `/edit-project/${project._id}`
                    : "#"
            }
            className="workCard"
        >
            <img src={project.cover_image} alt="project img" />
            <h2>{project.title}</h2>    
            <h3>{project.collaborators}</h3>
        </Link>
        <a href={`project/${project._id}`}>View on sep page</a> 
        </>
    );
};

export default ProjectCard;
