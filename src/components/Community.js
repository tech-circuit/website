import React, { useState }from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Community = () => {  

    const [currDiv,  setCurrDiv] = useState("organizations")
    const [scrollState,  setscrollState] = useState(false)

    const switchDivs = (s) => {
        setCurrDiv(s)
    }

    const listenScrollEvent = e => {
        if (window.scrollY > 300) {
          setscrollState(true)
        } else {
            setscrollState(false)
        }
    }
    
    window.addEventListener('scroll', listenScrollEvent)

    return (    
        <> 
            {
                scrollState === false ? 
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
                            <div className="search">
                                <img className="searchicon" src="/assets/magnifying-glass.svg" alt="magnifying-glass"/>
                                <input className="searchbar" type="text" placeholder={"Search " + currDiv}/>
                            </div>
                            <div className="sort">
                                <select name="sort" id="sort" className="sortSelector">
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
                                    <button className="create-new-org"><img src="/assets/add-button.svg" className="addIcon" alt="add-button"/>Create New Org</button>
                                    : 
                                    <></>
                            }
                        </div>
                    </>
                :
                    <>
                        <div className="header-div" style={{ height: '70px' }}>
                            <div className="switchers">
                                {
                                    currDiv === 'organizations' ? 
                                    <>
                                        <div className="switch-div-active" onClick={() => switchDivs("organizations")} style={{ marginTop: '0px' }}>
                                            <h3 style={{ fontSize: '18px', marginTop: '30px' }}>Orgs</h3>
                                        </div>
                                        <div className="switch-div" onClick={() => switchDivs("users")} style={{ marginTop: '0px' }}>
                                            <h3 style={{ fontSize: '18px', marginTop: '30px' }}>Users</h3>
                                        </div>
                                    </>
                                    : 
                                    <>
                                        <div className="switch-div" onClick={() => switchDivs("organizations")} style={{ marginTop: '0px' }}>
                                            <h3 style={{ fontSize: '18px', marginTop: '30px' }}>Orgs</h3>
                                        </div>
                                        <div className="switch-div-active" onClick={() => switchDivs("users")} style={{ marginTop: '0px' }}>
                                            <h3 style={{ fontSize: '18px', marginTop: '30px' }}>Users</h3>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="mid-area mid-area-shadow" style={{ marginTop: '143px', height:'43px' }}>
                            <div className="search" style={{ marginTop: '10px'}}>
                                <img className="searchicon" src="/assets/magnifying-glass.svg" alt="magnifying-glass"/>
                                <input className="searchbar" type="text" placeholder={"Search " + currDiv}/>
                            </div>
                            <div className="sort" style={{ marginTop: '10px'}}>
                                <select name="sort" id="sort" className="sortSelector">
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
                                    <button className="create-new-org" style={{ marginTop: '20px'}}><img src="/assets/add-button.svg" className="addIcon" alt="add-button"/>Create New Org</button>
                                    : 
                                    <></>
                            }
                        </div>
                    </>
            }
            <div className="comm-cards">
                {
                    currDiv === 'organizations' ? 
                        <>
                            <div className="org-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Code Warriors</h1>
                                <p className="address">Delhi Public School, Vasant Kunj</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                                <button>View Page</button>
                            </div>
                            <div className="org-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Code Warriors</h1>
                                <p className="address">Delhi Public School, Vasant Kunj</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                                <button>View Page</button>
                            </div>
                            <div className="org-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Code Warriors</h1>
                                <p className="address">Delhi Public School, Vasant Kunj</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                                <button>View Page</button>
                            </div>
                            <div className="org-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Code Warriors</h1>
                                <p className="address">Delhi Public School, Vasant Kunj</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                                <button>View Page</button>
                            </div>
                            <div className="org-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Code Warriors</h1>
                                <p className="address">Delhi Public School, Vasant Kunj</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                                <button>View Page</button>
                            </div>
                        </> 
                    : 
                        <>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                            <div className="user-card">
                                <img src="https://github.com/techsyndicate.png" alt="org-logo" className="org-logo"/>
                                <h1>Ishaan Das</h1>
                                <p className="address">Student, Desginer</p>
                                <div className="inline-place">
                                    <img src="/assets/place.svg" alt="marker"/>
                                    <p>New Delhi, India</p>
                                </div>
                                <div className="social-links">
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                    <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" alt="behance-logo"/>
                                </div>
                            </div>
                        </> 
                }
            </div>
        </>
    )
}

export default Community;