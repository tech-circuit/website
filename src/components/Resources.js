import React from 'react'
import '../resources.css';

export default function Resources() {
    return (
        <div class="main-wrap">
            <div class="intro-div">
                <h1 class="heading">Resources, Prompts & More</h1>
                <h3 class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum consectetur ac cursus tortor. Et feugiat in ipsum morbi molestie amet massa.</h3>
                <div class="resources-search" style={{ marginLeft: '-10px' }}>
                    <img class="searchicon" src="/assets/magnifying-glass.svg" alt="magnifying-glass"/>
                    <input class="searchbar" type="text" placeholder="Search fields, docs, archives"/>
                </div>
            </div>
            <div class="resources-div">
                <div class="subheading-div" width="100%">
                    <h1 class="subheading">Resources</h1>
                    <div class="resources">
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="resources-div" style={{ marginBottom: '191px' }}>
                <div class="subheading-div" width="100%">
                    <h1 class="subheading">Prompts, Papers & More</h1>
                    <div class="resources">
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                        <div class="resource">
                            <h2 class="resource-text">Design & Visuals</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
