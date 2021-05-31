import React from "react";
import "../resources.css";

export default function Resources() {
  return (
    <div className="main-wrap">
      <div className="intro-div">
        <h1 className="heading">Resources, Prompts & More</h1>
        <h3 className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
          consectetur ac cursus tortor. Et feugiat in ipsum morbi molestie amet
          massa.
        </h3>
        <div className="resources-search" style={{ marginLeft: "-10px" }}>
          <img
            className="searchicon"
            src="/assets/magnifying-glass.svg"
            alt="magnifying-glass"
          />
          <input
            className="searchbar"
            type="text"
            placeholder="Search fields, docs, archives"
          />
        </div>
      </div>
      <div className="resources-div">
        <div className="subheading-div" width="100%">
          <h1 className="subheading">Resources</h1>
          <div className="resources">
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="resources-div" style={{ marginBottom: "191px" }}>
        <div className="subheading-div" width="100%">
          <h1 className="subheading">Prompts, Papers & More</h1>
          <div className="resources">
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
            <div className="resource">
              <h2 className="resource-text">Design & Visuals</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
