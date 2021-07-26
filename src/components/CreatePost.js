import { Link } from "react-router-dom";
import { FaChevronLeft, FaBehanceSquare } from "react-icons/fa";
import "../add.css";

const CreatePost = () => {
  return (
    <>
      <section className="create container">
        <Link className="back" to="/work">
          <FaChevronLeft /> &nbsp; Back
        </Link>

        <div className="create-hold">
          <div className="create-left">
            <h1>Create a Project</h1>
            <p>Start building your project to showcase on techCircuit.</p>

            <div className="input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Arena | Chess Platform Concept"
              />
            </div>

            <div className="input">
              <label htmlFor="collaborators">Collaborators</label>
              <input
                type="text"
                name="collaborators"
                placeholder="Ishaan Das, Ribhav Sharma"
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
              <label htmlFor="event">Was this for an event? Mention one!</label>
              <input type="text" name="event" placeholder="bruh" />
              <p>
                Note: It will only be visible on the post once your club admin
                has verified the participation.
              </p>
            </div>
          </div>

          <div className="create-right">
            <div className="right-hold">
              <div className="input">
                <label htmlFor="none">Cover Image</label>
                <label htmlFor="cover" className="file-inp-lab">
                  <img src="/assets/create-add.svg" alt="" />
                  <h3>Add Files</h3>
                  <h4>1920 x 1080 (JPG, PNG)</h4>
                </label>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  accept="image/gif, image/jpeg, image/png, image/webp"
                  className="create-cover"
                  hidden
                />
              </div>

              <div className="create-btns">
                <button className="sec">Save Draft</button>
                <button className="sec border">Preview Draft</button>
                <button className="prim">Create Project</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
