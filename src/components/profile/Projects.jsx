import { useEffect, useState } from "react";
import BASE_API_URL from "../../constants";
import notyf from "../../tcNotyf";
import ProjectCard from "../utility/ProjectCard";
import FullProject from "../utility/FullProject";
import { RotateLoader } from "react-spinners";

const Projects = ({ userId }) => {
    const [projects, setProjects] = useState(["loading"]);
    const [fullView, setfullView] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});

    const view = (project) => {
        setSelectedProject(project);
        setfullView(true);
    };

    const close = () => {
        setfullView(false);
    };

    useEffect(() => {
        const getProjects = async () => {
            const dataJson = await fetch(
                `${BASE_API_URL}/project/user/${userId}`
            );
            const data = await dataJson.json();

            if (data.projects) {
                setProjects(data.projects);
            } else {
                notyf.error("Some Error occurred");
            }
        };

        getProjects();
    }, [userId]);

    return (
        <>
            <br />

            <div className="workCards">
                {projects[0] === "loading" ? (
                    <div className="load-container">
                        <RotateLoader />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="load-container">
                        <label>No Projects here!</label>
                    </div>
                ) : (
                    projects.map((project) => {
                        return (
                            <ProjectCard
                                project={project}
                                view={view}
                                key={project._id}
                                id={userId}
                            />
                        );
                    })
                )}
            </div>
            <section
                className={fullView ? "fullEvent fullEventActive" : "fullEvent"}
            >
                <FullProject project={selectedProject} close={close} />
            </section>
        </>
    );
};

export default Projects;
