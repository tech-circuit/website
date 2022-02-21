import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaLink, FaPlusCircle, FaTrash } from "react-icons/fa";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";
import getLinkLogo from "../getLinkLogo";
import { useParams } from "react-router-dom";
import "../styles/createProject.css";

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: "left",
        y: "bottom",
    },
    types: [
        {
            type: "error",
            background: "#FF6B6B",
            dismissible: true,
            icon: {
                className: "material-icons",
                tagName: "i",
                text: "cancel",
                color: "#ffffff",
            },
        },
        {
            type: "success",
            background: "#85D49C",
            dismissible: true,
            icon: {
                className: "material-icons",
                tagName: "i",
                text: "check_circle",
                color: "#ffffff",
            },
        },
    ],
});

const ProjectAlter = ({ edit }) => {
    const [links, setLinks] = useState([]);
    const [imgUrl, setImgUrl] = useState("/assets/userFlowIcon.svg");
    const [linksObj, setLinksObj] = useState({});
    const [tags, setTags] = useState([]);
    const [fields, setFields] = useState([]);
    const [comments, setComments] = useState(false);
    const [project, setProject] = useState({});
    const staticfields = [
        "UI/UX",
        "Web Development",
        "Cryptic",
        "Blockchain",
        "3D Dev",
        "Dlor",
        "Lorem",
        "Sit",
        "Amet",
    ];
    const { id } = useParams();

    const addLink = async () => {
        if (document.querySelector("#add-link-inp").value !== "") {
            let linkList = [];
            for (let linkNode of document.querySelectorAll(
                ".link-unit input"
            )) {
                linkList.push(linkNode.value.toLowerCase().trim());
            }

            setLinks(linkList);
            document.querySelector("#add-link-inp").value = "";
        } else {
            document
                .querySelector("#add-link-inp")
                .parentElement.classList.add("shake-anim");

            setTimeout(() => {
                document
                    .querySelector("#add-link-inp")
                    .parentElement.classList.remove("shake-anim");
            }, 1000);
        }
    };

    const removeLink = async (linkVal) => {
        let linkList = links.filter((link) => link !== linkVal);
        setLinks(linkList);
    };

    const setImage = async (inputFile) => {
        console.log("doing");
        if (
            inputFile.name.toLowerCase().endsWith(".jpg") ||
            inputFile.name.toLowerCase().endsWith(".png") ||
            inputFile.name.toLowerCase().endsWith(".jpeg")
        ) {
            notyf.success("Uploading...");
            let reader = new FileReader();
            reader.readAsDataURL(inputFile);
            reader.onload = () => {
                const b64 = reader.result.split("base64,")[1];
                fetch(`${BASE_API_URL}/image/upload`, {
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
                        document.getElementById(
                            "img-area"
                        ).style.backgroundImage = `url('${resp.link}')`;
                        document
                            .getElementById("img-area")
                            .classList.add("org-logo-uploaded");
                        setImgUrl(resp.link);
                    })
                    .catch((error) => console.log(error));
            };
        }
    };

    const deleteImage = () => {
        document.getElementById("img-area").style.backgroundImage = `url('')`;
        setImgUrl("");
        document.querySelector("input[name='org-logo']").value = "";
        document
            .getElementById("img-area")
            .classList.remove("org-logo-uploaded");
    };

    const addTag = (e) => {
        if (
            e.keyCode === 32 &&
            e.target.value.trim() !== "" &&
            tags.length !== 5
        ) {
            setTags([...tags, e.target.value.trim()]);
            e.target.value = "";
            setTimeout(() => {
                e.target.value = "";
            }, 10);
        }
    };

    const removeTag = (inpTag) => {
        setTags(tags.filter((tag) => tag !== inpTag));
    };

    const submit = async () => {
        const title = document.querySelector("input[name='title']").value;
        const description = document.querySelector(
            "textarea[name='description']"
        ).value;
        const event = document.querySelector("input[name='event']").value;
        const collaborators = document.querySelector(
            "input[name='collaborators']"
        ).value;

        if (title === "" || description === "") {
            notyf.error("Please fill all required fields");
            return;
        } else {
            const body = {
                title,
                description,
                links,
                fields,
                tags,
                comments,
                event,
                collaborators,
                cover_image: imgUrl,
            };

            const fetchUrl = edit
                ? `${BASE_API_URL}/project/edit/${
                      project._id
                  }?access_token=${localStorage.getItem("authToken")}`
                : `${BASE_API_URL}/project/add?access_token=${localStorage.getItem(
                      "authToken"
                  )}`;
            const fetchMethod = edit ? "PUT" : "POST";
            const submittedJson = await fetch(fetchUrl, {
                method: fetchMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const submitted = await submittedJson.json();

            if (submitted.done) {
                window.location.href = "/work";
            } else {
                console.log(submitted);
                notyf.error("Some Error has occurred");
                return;
            }
        }
    };

    useEffect(() => {
        let theObj = {};
        for (let link of links) {
            theObj[link] = getLinkLogo(link);
        }
        setLinksObj(theObj);
    }, [links]);

    useEffect(() => {
        if (fields.length === 5) {
            for (let f of document.querySelectorAll(".field")) {
                f.classList.add("field-disabled");
            }
        } else {
            for (let f of document.querySelectorAll(".field")) {
                f.classList.remove("field-disabled");
            }
        }
    }, [fields]);

    useEffect(() => {
        const getProject = async () => {
            const dataJson = await fetch(`${BASE_API_URL}/project/${id}`);
            const data = await dataJson.json();

            if (data.project) {
                setImgUrl(data.project.cover_image);
                setLinks(data.project.links);
                setTags(data.project.tags);
                setFields(data.project.fields);
                setProject(data.project);

                document.getElementById(
                    "img-area"
                ).style.backgroundImage = `url('${data.project.cover_image}')`;
                document
                    .getElementById("img-area")
                    .classList.add("org-logo-uploaded");
            }
        };

        if (edit) {
            getProject();
        }
    }, [id, edit]);

    return (
        <>
            <div className="create-org-cont">
                <div className="left-org">
                    <h1>{edit ? "Edit" : "Create a"} Project</h1>
                    <p style={{ color: "#c4c4c4 !important" }}>
                        Start building your project to showcase on techCircuit.
                    </p>
                    <h3>Title *</h3>
                    <input
                        type="text"
                        name="title"
                        autoComplete="off"
                        placeholder="Arena | Chess Platform Concept"
                        required
                        defaultValue={project ? project.title : ""}
                    ></input>
                    <h3>Decription *</h3>
                    <textarea
                        name="description"
                        autoComplete="off"
                        defaultValue={project ? project.description : ""}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
                    ></textarea>
                    <h3>Collaborators</h3>
                    <input
                        type="text"
                        name="collaborators"
                        autoComplete="off"
                        placeholder="Ishaan Das, Ribhav Sharma"
                        defaultValue={project ? project.collaborators : ""}
                    ></input>
                    <h3>Add links</h3>
                    <div className="create-links input">
                        <div className="link-unit" id="add-link-unit">
                            <FaLink className="create-link-brand" />
                            <input
                                maxLength="200"
                                type="text"
                                placeholder="example: https://github.com/kevin"
                                id="add-link-inp"
                                autoComplete="off"
                            />
                            <FaPlusCircle
                                className="create-link-opt"
                                onClick={addLink}
                            />
                        </div>
                        {links.map((link) => {
                            return (
                                <div className="link-unit" key={link}>
                                    {linksObj[link]}
                                    <input
                                        maxLength="200"
                                        type="text"
                                        placeholder="example: https://github.com/kevin"
                                        value={link}
                                        readOnly
                                        key={`link-${links.indexOf(link)}`}
                                        id={`link-${links.indexOf(link)}`}
                                    />
                                    <FaTrash
                                        className="create-link-opt create-link-delete"
                                        onClick={() =>
                                            removeLink(
                                                document.querySelector(
                                                    `#link-${links.indexOf(
                                                        link
                                                    )}`
                                                ).value
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <h3>Fields</h3>
                    <div className="field-hold">
                        <input
                            type="text"
                            value={fields.join(", ")}
                            readOnly
                            style={{ color: "#4678f9" }}
                            onClick={() =>
                                document
                                    .querySelector(".field-box")
                                    .classList.toggle("field-box-active")
                            }
                        />
                        <div className="field-box">
                            <div className="field-box-top">
                                <h1>Project Fields</h1>
                                <button onClick={() => setFields([])}>
                                    clear all
                                </button>
                            </div>
                            <div className="fields">
                                {staticfields.map((field) => {
                                    return (
                                        <button
                                            className={
                                                fields.includes(field)
                                                    ? "field field-active"
                                                    : "field"
                                            }
                                            key={field}
                                            onClick={() => {
                                                if (fields.length !== 5) {
                                                    if (!fields.includes(field))
                                                        setFields([
                                                            ...fields,
                                                            field,
                                                        ]);
                                                    else
                                                        setFields(
                                                            fields.filter(
                                                                (fl) =>
                                                                    fl !== field
                                                            )
                                                        );
                                                } else {
                                                    setFields(
                                                        fields.filter(
                                                            (fl) => fl !== field
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            {field}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                className="close"
                                style={{ color: "#747474" }}
                                onClick={() => {
                                    document
                                        .querySelector(".field-box")
                                        .classList.remove("field-box-active");
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <h3>Tags</h3>
                    <div className="tags-hold">
                        {tags.map((tag) => {
                            return (
                                <div className="tag" key={tag}>
                                    {tag}
                                    <img
                                        src="/assets/tag-cross.svg"
                                        alt="tag-cross"
                                        className="tag-cross"
                                        onClick={() => removeTag(tag)}
                                    />
                                </div>
                            );
                        })}
                        {tags.length !== 5 ? (
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                autoComplete="off"
                                onKeyDown={(eve) => addTag(eve)}
                                onFocus={(e) => {
                                    e.target.parentElement.classList.add(
                                        "tags-hold-focus"
                                    );
                                }}
                                onBlur={(e) => {
                                    e.target.parentElement.classList.remove(
                                        "tags-hold-focus"
                                    );
                                }}
                            />
                        ) : (
                            document
                                .querySelector(".tags-hold")
                                .classList.remove("tags-hold-focus")
                        )}
                    </div>
                    <p className="input-sub-text">
                        Upto 5 tags, Use space to separate
                    </p>
                    <h3>Was this for an Event? Mention one!</h3>
                    <input
                        type="text"
                        name="event"
                        defaultValue={project ? project.event : ""}
                        autoComplete="off"
                        placeholder="Enter name of event and the year"
                        required
                    ></input>

                    <div className="indi-wrap">
                        <h3>Enable public comments?</h3>
                        <input
                            type="checkbox"
                            className="indi-radio"
                            name="comments"
                            value="html"
                            onChange={() => {
                                setComments(!comments);
                            }}
                        ></input>
                    </div>
                </div>

                <div className="right">
                    <div className="top-inline">
                        <h3>Project Image Upload</h3>
                        <i
                            className="fas fa-trash"
                            id="delete-icon"
                            onClick={deleteImage}
                        ></i>
                        <span>
                            This image will be displayed on Work page.
                            Recommended size 500x500px
                        </span>
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
                        {/* {imgUrl === "" ? (
                            <FileDrop
                                onDrop={(files, event) => setImage(files[0])}
                            >
                               <div className="drop-file-wrap">
                                <i
                                    className="fas fa-plus-circle"
                                    id="file-add-icon"
                                ></i>
                                <h5>Drag Files</h5>
                                <p>1920 x 1080 (JPG, PNG)</p>
                            </div>
                            </FileDrop>
                        ) : (
                            ""
                        )} */}

                        <label
                            htmlFor="org-logo"
                            style={{ cursor: "pointer" }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                setImage(e.dataTransfer.files[0]);
                            }}
                        >
                            <i
                                className="fas fa-plus-circle"
                                id="file-add-icon"
                            ></i>
                            <h5>Drag Files</h5>
                            <p>1920 x 1080 (JPG, PNG)</p>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="org-logo"
                            name="org-logo"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="buttons button-org">
                        <button className="createOrgButton" onClick={submit}>
                            {edit ? "Finish Editing" : "Create Project"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectAlter;