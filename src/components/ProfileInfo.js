import "../styles/profile-info.css";
import { FaBehanceSquare } from "react-icons/fa";
import "../styles/add.css";

const ProfileInfo = () => {
    return (
        <>
            <div className="profileInfo">
                <div className="fields">
                    <div className="create-hold">
                        <div className="create-left">
                            <h1>Ishaan Das</h1>
                            <p>IshaanDas@gmail.com</p>

                            <div className="input">
                                <label htmlFor="username">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="collaborators"
                                    placeholder="Ishaan Das, Ribhav Sharma"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Arena | Chess Platform Concept"
                                />
                            </div>

                            <div className="input">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="the coding codenge coding the hacking cryptic hack wanna haxx? wanna fuxx?"
                                ></textarea>
                            </div>

                            <div className="create-links input">
                                <label>Add Links</label>
                                <div className="link-unit">
                                    <FaBehanceSquare className="create-link-brand" />
                                    <input
                                        type="text"
                                        value="https://www.behance.net/samvrantsamataray"
                                        placeholder="Add external link"
                                    />
                                    <FaBehanceSquare className="create-link-opt" />
                                </div>
                                <div className="link-unit">
                                    <FaBehanceSquare className="create-link-brand" />
                                    <input
                                        type="text"
                                        value="https://www.behance.net/samvrantsamataray"
                                        placeholder="Add external link"
                                    />
                                    <FaBehanceSquare className="create-link-opt" />
                                </div>
                                <div className="link-unit">
                                    <FaBehanceSquare className="create-link-brand" />
                                    <input
                                        type="text"
                                        value="https://www.behance.net/samvrantsamataray"
                                        placeholder="Add external link"
                                    />
                                    <FaBehanceSquare className="create-link-opt" />
                                </div>
                            </div>

                            <div className="input">
                                <label htmlFor="fields">Fields</label>
                                <select name="fields">
                                    <option value="" disabled selected hidden>
                                        Select Fields, Tags
                                    </option>
                                    <option value="the">The</option>
                                </select>
                                <p>You can only add upto 10 fields and tags</p>
                            </div>

                            <div className="input">
                                <label htmlFor="event">
                                    Was this for an event? Mention one!
                                </label>
                                <input
                                    type="text"
                                    name="event"
                                    placeholder="bruh"
                                />
                                <p>
                                    Note: It will only be visible on the post
                                    once your club admin has verified the
                                    participation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pfp">
                    <img src="/assets/ishana.jpg" alt="" />
                </div>
            </div>
        </>
    );
};

export default ProfileInfo;
