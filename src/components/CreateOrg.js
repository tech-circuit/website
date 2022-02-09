import "../styles/createOrg.css";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FileDrop } from "react-file-drop";

const CreateOrg = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
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
      <div className="create-org-cont">
        <div className="left-org">
          <h1>Create an Organisation</h1>
          <h3>Name of Organisation *</h3>
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Code Warriors"
            required="true"
          ></input>
          <h3>Institute name *</h3>
          <input
            type="text"
            name="institute"
            autoComplete="off"
            placeholder="Delhi Public School, Vasant Kunj"
            required="true"
          ></input>
          <div className="indi-wrap">
          <h3>Independant Organisation</h3>
          <input 
          type="radio" 
          className="indi-radio"
          name="isIndependant"
          value="html"
          ></input>
          </div>
          <h3>Organisation info *</h3>
          <textarea
            name="description"
            autoComplete="off"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
          ></textarea>
          <h3>Organisation website *</h3>
          <input
            type="text"
            name="website_url"
            autoComplete="off"
            placeholder="Your Mom, Ribhav Sharma"
          ></input>
          <h3>Add social links</h3>
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
          <h3>Organisation Moderators* <span className="org-mod-text">Add maximum of 5</span></h3>
          <div className="mod-wrap">
            <img src="/assets/samvr.jpeg" className="mod-pfp" alt="alt" />   
            <div className="mod-input-wrap">        
              <input
                type="text"
                name="mod-name"
                autoComplete="off"
                placeholder="Laxya Pahuja"
                className="mod-input"
              ></input>          
              <input
                type="text"
                name="mod-pos"
                autoComplete="off"
                placeholder="President"
                className="mod-input"
              ></input>              
            </div> 
          </div>
          <div className="mod-wrap">
            <img src="/assets/samvr.jpeg" className="mod-pfp" alt="alt" />   
            <div className="mod-input-wrap">        
              <input
                type="text"
                name="mod-name"
                autoComplete="off"
                placeholder="Laxya Pahuja"
                className="mod-input"
              ></input>          
              <input
                type="text"
                name="mod-pos"
                autoComplete="off"
                placeholder="President"
                className="mod-input"
              ></input>              
            </div> 
          </div>
          <div className="mod-wrap">
            <img src="/assets/samvr.jpeg" className="mod-pfp" alt="alt" />   
            <div className="mod-input-wrap">        
              <input
                type="text"
                name="mod-name"
                autoComplete="off"
                placeholder="Laxya Pahuja"
                className="mod-input"
              ></input>          
              <input
                type="text"
                name="mod-pos"
                autoComplete="off"
                placeholder="President"
                className="mod-input"
              ></input>              
            </div> 
          </div>
        </div>
        
        <div className="right">
          <div className="top-inline">
            <h3>Organisation Image Upload</h3>
            <i
              className="fas fa-trash"
              id="delete-icon"
              onClick={deleteImage}
            ></i>
            <span>This image will be displayed on community page. Recommended size 500x500px</span>
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

          <div className="buttons button-org">
            <button className="createOrgButton">Create Organisation</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrg;