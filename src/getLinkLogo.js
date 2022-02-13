import { FaGithub, FaLinkedin, FaLink, FaInstagram } from "react-icons/fa";

const getLinkLogo = (link) => {
    let logo = <FaLink className="create-link-brand" />;
    const platforms = {
        github: <FaGithub className="create-link-brand" />,
        linkedin: <FaLinkedin className="create-link-brand" />,
        instagram: <FaInstagram className="create-link-brand" />,
    };

    for (let platform of Object.keys(platforms)) {
        if (link.includes(platform)) {
            logo = platforms[platform];
        }
    }

    return logo;
};

export default getLinkLogo;
