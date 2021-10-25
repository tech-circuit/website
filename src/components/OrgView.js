import "../styles/org.css";

const OrgView = () => {
    return(
        <section className="org-cont">
            <div className="main-info">
                <h1>Tech Syndicate</h1>
                <p>Amity International School Sector-46, Gurgaon, Haryana</p>
                <img src="/assets/samvr.jpeg" className="org-pfp" alt="alt" />
                <p className="site"><a href="/">www.techsyndicate.co</a></p>
                <div className="org-links">                    
                    <h4>Visit</h4>
                    <div className="orglink-icons">
                        <a href="/"><img src="/assets/samvr.jpeg" className="link-icon" alt="alt" /></a>
                        <a href="/"><img src="/assets/samvr.jpeg" className="link-icon" alt="alt" /></a>
                        <a href="/"><img src="/assets/samvr.jpeg" className="link-icon" alt="alt" /></a>
                    </div>                  
                </div>
                <button className="ReqJoinButton">Request to Join</button>
            </div>
            <div className="other-info">                
                <div className="org-div aboutorg">
                    <h3>Organisation Info</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque 
                    pellentesque mauris at accumsan. Nullam nec pulvinar ante. Quisque sed 
                    risus quis elit pretium sollicitudin. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque 
                    pellentesque mauris at accumsan. Nullam nec pulvinar ante. Quisque sed 
                    risus quis elit pretium sollicitudin. 
                    </p>
                </div>
                <div className="org-div current-mods">
                    <h3>Current Moderators (24)</h3>
                    <div>
                        <div className="mod-div">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <div className="mod-text">
                                <h4>Laxya Pahuja</h4>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="mod-div">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <div className="mod-text">
                                <h4>Laxya Pahuja</h4>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="mod-div">
                            <img src="/assets/samvr.jpeg" alt="alt" />
                            <div className="mod-text">
                                <h4>Laxya Pahuja</h4>
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="org-div hosted-events">
                    <h3>Hosted Events</h3>
                    <table>
                        <tr>
                            <td>Robotronics' 2020</td>
                            <td>February 2020</td>
                        </tr>
                        <tr>
                            <td>AlphaNODE 2019</td>
                            <td>November 2019</td>
                        </tr>
                        <tr>
                            <td>Intratech 2019</td>
                            <td>August 2019</td>
                        </tr>
                    </table>
                </div>
            </div>

        </section>
    )
}

export default OrgView;