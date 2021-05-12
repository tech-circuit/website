import React, { Component } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

class CreateProject extends Component {
    render(){
        return (
            <>
                <div className="main">
                    <div className="left">
                        <h1>Create a Project</h1>
                        <p>Start building your project to showcase on techCircuit.</p>
                        <h3>Title</h3>
                        <input type="text" name="title" autoComplete="off" placeholder="Arena | Chess Platform Concept"></input>
                        <h3>Collaborators</h3>
                        <input type="text" name="collaborators" autoComplete="off" placeholder="Arena | Chess Platform Concept"></input>
                        <h3>Description</h3>
                        <textarea name="description" autoComplete="off" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. Pretium eget ut et blandit cursus. Mattis malesuada at semper cursus."></textarea>
                        <h3>Add Links</h3>
                        <div className="input-link">
                            <img src="https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png" className="input-link-logo" alt="logo"/>
                            <input type="text" name="external-link" autoComplete="off" placeholder="https://www.behance.net/samvrantsamataray" disabled></input>
                            <i className="fas fa-trash" id="input-delete-icon"></i>
                        </div>
                        <div className="input-link">
                            <img src="https://media.discordapp.net/attachments/803844775941111808/842140461341868062/unknown.png" className="input-link-logo" alt="logo"/>
                            <input type="text" name="external-link" autoComplete="off" placeholder="https://dribbble.com/shots/10594342-Login-Register" disabled></input>
                            <i className="fas fa-trash" id="input-delete-icon"></i>
                        </div>
                        <div className="input-link">
                            <img src="https://cdn.discordapp.com/attachments/803844775941111808/842139922831638538/unknown.png" className="input-add-logo" alt="logo"/>
                            <input type="text" name="external-link" autoComplete="off" placeholder="Add external link"></input>
                            <i className="fas fa-plus-circle" id="input-add-icon"></i>
                        </div>
                        <h3 style={{marginTop: 59 + 'px'}}>Fields</h3>
                        <select name="fields" id="fields">
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Branding">Branding</option>
                            <option value="Software Dev">Software Dev</option>
                            <option value="Mobile Dev">Mobile Dev</option>
                        </select>
                        <h5 className="below-input">You can only add upto 10 fields</h5>
                        <h3>Tags</h3>
                        <select name="tags" id="tags">
                            <option value="UI">UI</option>
                            <option value="UX">UX</option>
                            <option value="Chess">Chess</option>
                            <option value="Extension">Extension</option>
                        </select>
                        <h5 className="below-input">Tags help user find your project. You can use upto 5 tags</h5>
                        <h3 style={{marginTop: 59 + 'px'}}>Was this for an event? Mention one!</h3>
                        <input type="text" name="title" autoComplete="off" placeholder="Enter name of school and event along with the year"></input>
                        <h5 className="below-input" style={{color: 'black'}}>Note: It will only be visible on the post once your club president has verified the participation.</h5>
                        <br></br>
                    </div>
                    <div className="right">
                        <div className="top-inline">
                            <h3>Cover Image</h3>
                            <i className="fas fa-trash" id="delete-icon"></i>
                        </div>
                        <div className="image-area">
                        </div>
                        <div className="buttons">
                            <button className="saveDraft">Save Draft</button>
                            <button className="previewProject">Preview Project</button>
                        </div>
                        <button className="createProjectButton">Create Project</button>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateProject;