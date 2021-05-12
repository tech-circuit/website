import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Navbar extends Component {
    constructor(props){
      super(props)
      this.state = {content:''}
      this.handleClick = this.handleClick.bind(this)
    }
    
    renderContent(){
      return (
        <>
        <div className="nav-link"><Link to="/profile"><span><i className="fas fa-bell fa-sm" id="notif-logo"></i></span></Link></div>
        <div className="nav-link"><Link to="/profile"><span><i className="fas fa-user-circle" id="account-logo"></i></span></Link></div>
        </>
      ) 
    }
    
    handleClick(){
      this.setState({
        content : this.renderContent()
      })
    }
    
    render(){
        return (
            <>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/"><span><img src="/assets/fulllogo.png" alt="tC logo" className="logo"/></span></Link>
                    <div className="nav-links">
                      <div className="nav-link"><Link to="/work" class="link">Work</Link></div>
                      <div className="nav-link"><Link to="/community" class="link">Events</Link></div>
                      <div className="nav-link"><Link to="/about" class="link">Forums</Link></div>
                      <div className="nav-link"><Link to="/forum" class="link">Community</Link></div>
                      <div className="nav-link"><Link to="/resources" class="link">Resources</Link></div>
                      <div className="nav-link"><Link to="/contact" class="link">About</Link></div>
                      <div className="nav-link"><Link to="/server"><button className="discord-link-button" id="discord-button">Discord</button></Link></div>
                      <div className="nav-right">
                        {this.state.content === '' && <div className="nav-link"><button className="login-link-button" id="discord-button" onClick={this.handleClick}>Login</button></div>}
                        {this.state.content}
                      </div>
                    </div>
                </div>
            </nav>
          </>
        )
    }
}

export default Navbar;