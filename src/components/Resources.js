import React from "react";
import "../styles/resources.css";
import { FaSearch } from "react-icons/fa";

const Resources = () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    return (
        <div className="container rsc-cont">
            <div className="rsc-head">
                <h1>Resources, Prompts & More</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Condimentum consectetur ac cursus tortor. Et feugiat in
                    ipsum morbi molestie amet massa.
                </p>
                <div className="input">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search fields, docs, archives"
                    />
                </div>
            </div>

            <div className="resources">
                <h2>Resources</h2>
                <div className="rsc-cards">
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>

                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                </div>
            </div>

            <div className="resources">
                <h2>Resources</h2>
                <div className="rsc-cards">
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>

                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Resources;
