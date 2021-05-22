import React, { useState }from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Community() {  

    const [currDiv,  setCurrDiv] = useState("organizations")

    const switchDivs = (s) => {
        setCurrDiv(s)
    }

    return (    
        <>
            <div className="header-div">
                <h1>Welcome to <span className="bold-tc">techCircuit</span> Community!</h1>
                <p>Over 500 Clubs and organzations (primarily high schools and colleges) from all over the Globe are part of the tC community!</p>
                <div className="switchers">
                    {
                        currDiv === 'organizations' ? 
                        <>
                            <div className="switch-div-active" onClick={() => switchDivs("organizations")}>
                                <h3>Orgs</h3>
                            </div>
                            <div className="switch-div" onClick={() => switchDivs("users")}>
                                <h3>Users</h3>
                            </div>
                        </>
                        : 
                        <>
                            <div className="switch-div" onClick={() => switchDivs("organizations")}>
                                <h3>Orgs</h3>
                            </div>
                            <div className="switch-div-active" onClick={() => switchDivs("users")}>
                                <h3>Users</h3>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="mid-area">
                <div class="search">
                    <img class="searchicon" src="/assets/magnifying-glass.svg"/>
                    <input class="searchbar" type="text" placeholder={"Search " + currDiv}/>
                </div>
                <div class="sort">
                    <select name="sort" id="sort" class="sortSelector">
                        <option>Sort by region</option>
                        <option>region 1</option>
                        <option>region 2</option>
                        <option>region 3</option>
                        <option>region 4</option>
                        <option>region 5</option>
                    </select>
                </div>
                {
                        currDiv === 'organizations' ? 
                        <button class="create-new-org"><img src="/assets/add-button.svg" className="addIcon"/>Create New Org</button>
                        : 
                        <></>
                }
                
            </div>
        </>
    )
}

export default Community;