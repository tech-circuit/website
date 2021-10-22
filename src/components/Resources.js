import React from "react";
// import { useState } from "react";
import "../styles/resources.css";
// import { FaSearch, FaPlus } from "react-icons/fa";

const Resources = () => {   
    document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
    return (
        <>  
        <header className="resourceHead head-1 container">
            <h1>
                <strong style={{ fontWeight: "400" }}>Resources, Tools & More!</strong>
                &nbsp;Handpicked useful resources for tech-based fields!
            </h1>
            </header>
            <header className="eventHead2 head-2 eventHead container">
            <div className="rscSearch">
                <div className="input">
                <img src="/assets/magnifying-glass.svg" alt="alt" />
                <input type="text" placeholder="Search" />
                </div>
                <button className="eventFilter">
                <img src="/assets/filter.svg" alt="alt" />
                &nbsp;&nbsp;&nbsp;&nbsp;Filter Region
                </button>
            </div>
        </header>    

            
        <div className="container rsc-cont"> 
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
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                    <a href="/" className="resource">
                        Design and Visuals
                    </a>
                </div>
            </div>

            <div className="resources">
                <h2>Prompts, Paper & more</h2>
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
        </>
    );
};

export default Resources;
