import "../styles/createProject.css";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FileDrop } from "react-file-drop";

const CreateProject = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [fieldsText, setFieldsText] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const logos = {
    behance:
      "https://cdn.discordapp.com/attachments/803844775941111808/842136554662264842/unknown.png",
    dribbble:
      "https://media.discordapp.net/attachments/803844775941111808/842140461341868062/unknown.png",
  };

  const addLink = () => {
    let shouldAdd = true;

    links.forEach((e) => {
      if (e.link === title) {
        shouldAdd = false;
      }
    });

    if (shouldAdd) {
      const brand = title.split("https://")[1];
      let brandName = "";
      let logo_url = "";
      try {
        if (brand.includes("www")) {
          brandName = brand.split("www.")[1].split(".")[0];
        } else {
          brandName = brand.split(".")[0];
        }
        logo_url = logos[brandName];
      } catch (error) {
        logo_url = "/assets/global.png";
      }

      if (logo_url === undefined) {
        logo_url = "/assets/global.png";
      }

      setLinks([...links, { icon_url: logo_url, link: title }]);
    }

    setTitle("");
  };

  const deleteLink = (link) => {
    const newArray = links.filter((e) => e.link !== link);
    setLinks(newArray);
  };

  const addField = (field) => {
    console.log(field);
    setFieldsText(fieldsText + ", " + field);
  };

  const editTags = (tag) => {
    // console.log(tag)
    setTags(tag);
  };

  const setImage = async (inputFile) => {
    if (
      inputFile.name.endsWith(".png") ||
      inputFile.name.endsWith(".jpg") ||
      inputFile.name.endsWith(".jpeg")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(inputFile);
      reader.onload = () => {
        const b64 = reader.result.split("base64,")[1];
        fetch("https://techcircuit.herokuapp.com/image/upload", {
          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            b64,
          }),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then(async (response) => {
            const resp = await response.json();
            console.log(resp.link);
            document.getElementById(
              "img-area"
            ).style.backgroundImage = `url('${resp.link}')`;
            setImgUrl(resp.link);
          })
          .catch((error) => console.log(error));
      };
    }
  };

  const deleteImage = () => {
    document.getElementById("img-area").style.backgroundImage = `url('')`;
    setImgUrl("");
  };

  return (
    <>
      <div className="main">
        <div className="left">
          <h1>Create a Project</h1>
          <p>Start building your project to showcase on techCircuit.</p>
          <h3>Title</h3>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Arena | Chess Platform Concept"
          ></input>
          <h3>Description</h3>
          <textarea
            name="description"
            autoComplete="off"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
          ></textarea>
          <h3>Collaborators</h3>
          <input
            type="text"
            name="collaborators"
            autoComplete="off"
            placeholder="Your Mom, Ribhav Sharma"
          ></input>
          <h3>Add Links</h3>
          {links.map((ex_link) => (
            <div className="input-link">
              <img
                src={ex_link.icon_url}
                className="input-link-logo"
                alt="logo"
              />
              <input
                className="input-link-text"
                type="text"
                name="external-link"
                autoComplete="off"
                placeholder={ex_link.link}
                disabled
                style={{ width: "455px" }}
              ></input>
              <i
                className="fas fa-trash"
                id="input-delete-icon"
                onClick={() => deleteLink(ex_link.link)}
              ></i>
            </div>
          ))}
          <div className="input-link">
            <img
              src="https://cdn.discordapp.com/attachments/803844775941111808/842139922831638538/unknown.png"
              className="input-add-logo"
              alt="logo"
            />
            <input
              type="text"
              name="external-link"
              autoComplete="off"
              placeholder="Add external link"
              onChange={(event) => setTitle(event.target.value)}
              value={title && title}
            ></input>
            <i
              className="fas fa-plus-circle"
              id="input-add-icon"
              onClick={addLink}
            ></i>
          </div>
          <h3>Fields</h3>
          <select name="fields" id="fields">
            <option value={fieldsText}></option>
            <option
              value="UI/UX Design"
              onClick={() => addField("UI/UX Design")}
            >
              UI/UX Design
            </option>
            <option value="Branding" onClick={() => addField("Branding")}>
              Branding
            </option>
            <option
              value="Software Dev"
              onClick={() => addField("Software Dev")}
            >
              Software Dev
            </option>
            <option value="Mobile Dev" onClick={() => addField("Mobile Dev")}>
              Mobile Dev
            </option>
          </select>
          <h5 className="below-input">You can only add upto 10 fields</h5>
          <h3>Tags</h3>
          <input
            type="text"
            name="title"
            autoComplete="off"
            value={tags}
            onChange={(event) => editTags(event.target.value)}
          ></input>
          <h5 className="below-input">
            Tags help user find your project. You can use upto 5 tags
          </h5>
          <h3>
            Was this for an event? Mention one!
          </h3>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Enter name of school and event along with the year"
          ></input>
          <h5 className="below-input">
            Note: This will only be visibleonce your club president
            has verified the participation.
          </h5>
          <br></br>
        </div>
        <div className="right">
          <div className="top-inline">
            <h3>Cover Image</h3>
            <i
              className="fas fa-trash"
              id="delete-icon"
              onClick={deleteImage}
            ></i>
          </div>
          <div
            className="image-area"
            id="img-area"
            style={{
              backgroundImage: "url(" + { imgUrl } + ")",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {imgUrl === "" ? (
              <FileDrop onDrop={(files, event) => setImage(files[0])}>
                <div className="drop-file-wrap">
                  <i className="fas fa-plus-circle" id="file-add-icon"></i>
                  <h5>Drag Files</h5>
                  <p>1920 x 1080 (JPG, PNG)</p>
                </div>
              </FileDrop>
            ) : (
              ""
            )}
          </div>

          <div className="buttons">
            <button className="createProjectButton">Create Project</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
