import "../../styles/work.css";

const ProjectCard = ({view}) => {
    return(
        <>
        <div to="/" className="workCard" onClick={view}>
            <img src="/assets/sample-banner.jpg" alt="" />
            <h2>Arena | Chess Platform Concept</h2>
            <h3>Isam</h3>
        </div>
        </>
    )
}

export default ProjectCard;