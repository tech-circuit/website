import React, { useState, useEffect } from "react";
import { FaLink, FaPlusCircle, FaTrash } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkLogo from "../getLinkLogo";
import { useParams } from "react-router-dom";
import "../styles/createProject.css";
import Tags from "./utility/Tags";
import Fields from "./utility/Fields";
import checkLoggedIn from "./utility/checkLoggedIn";
import { validate } from "../validate";
import { Reorder } from "framer-motion";

const ProjectAlter = ({ edit }) => {
    const [links, setLinks] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [cover, setCover] = useState("");
    const [linksObj, setLinksObj] = useState({});
    const [tags, setTags] = useState([]);
    const [fields, setFields] = useState([]);
    const [comments, setComments] = useState(false);
    const [project, setProject] = useState({});
    const [delBox, setDelBox] = useState(false);
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

    const setImage = async (inputFile, isCover) => {
        if (imgUrls.length < 7) {
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
                            isCover
                                ? setCover(resp.link)
                                : setImgUrls([...imgUrls, resp.link]);
                        })
                        .catch((error) => {
                            console.log(error);
                            notyf.error("Some Error has occurred");
                        });
                };
            }
        } else {
            notyf.error("Only 6 images allowed");
        }
    };

    const deleteCover = () => {
        setCover("");
    };

    const removeImg = (url) => {
        setImgUrls(imgUrls.filter((img) => img !== url));
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

        const reqList = ["title", "description"];
        if (validate(reqList)) {
            const body = {
                title,
                description,
                links,
                fields,
                tags,
                commentsEnabled: comments,
                event,
                collaborators,
                cover,
                imgs:
                    imgUrls.length === 0
                        ? ["/assets/userFlowIcon.svg"]
                        : imgUrls,
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

            if (submitted.success) {
                window.location.href = "/work";
            } else {
                console.log(submitted);
                notyf.error("Some Error has occurred");
                return;
            }
        } else {
            notyf.error("Please fill all required fields");
            return;
        }
    };

    const deleteProj = () => {
        fetch(
            `${BASE_API_URL}/project/delete/${id}?access_token=${localStorage.getItem(
                "authToken"
            )}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    window.location.href = "/work";
                } else {
                    notyf.error("Some Error has occurred");
                    return;
                }
            })
            .catch((err) => {
                notyf.error("Some Error has occurred");
                return;
            });
    };

    useEffect(() => {
        let theObj = {};
        for (let link of links) {
            theObj[link] = getLinkLogo(link);
        }
        setLinksObj(theObj);
    }, [links]);

    useEffect(() => {
        const getProject = async () => {
            const dataJson = await fetch(
                `${BASE_API_URL}/project/getForEdit/${id}?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await dataJson.json();

            if (data.project) {
                setImgUrls(data.project.imgs);
                setCover(data.project.cover);
                setLinks(data.project.links);
                setTags(data.project.tags);
                setFields(data.project.fields);
                setProject(data.project);
            } else {
                window.location.href = "/404";
            }
        };

        if (edit) {
            getProject();
        } else {
            checkLoggedIn("/work");
        }
    }, [id, edit]);

    return (
        <>
            {delBox ? (
                <div className="delete-confirm">
                    <div
                        className="del-trans"
                        onClick={() => setDelBox(false)}
                    ></div>
                    <div className="delete-con-box">
                        <h3>Are you sure you want to delete this project?</h3>
                        <div className="btns">
                            <button
                                id="del-can"
                                onClick={() => setDelBox(false)}
                            >
                                Cancel
                            </button>
                            <button id="del-del" onClick={deleteProj}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="create-org-cont">
                <div className="left-org border-input-form">
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
                    <h3>Project Media</h3>
                    <p className="img-sub-heading">Images should be PNG/JPG</p>

                    <Reorder.Group
                        values={imgUrls}
                        onReorder={setImgUrls}
                        className="project-imgs"
                    >
                        <div
                            className="image-area mini-img-area"
                            id="img-area"
                            style={{
                                overflow: "hidden",
                            }}
                        >
                            <label
                                htmlFor="project-imgs"
                                style={{ cursor: "pointer" }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setImage(e.dataTransfer.files[0], false);
                                }}
                            >
                                <i
                                    className="fas fa-plus-circle"
                                    id="file-add-icon"
                                ></i>
                                <h5>Drag File</h5>
                                <p>PNG / JPG</p>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="project-imgs"
                                name="project-imgs"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                    setImage(e.target.files[0], false)
                                }
                            />
                        </div>
                        {imgUrls.map((imgUrl) => (
                            <Reorder.Item
                                drag
                                key={imgUrl}
                                value={imgUrl}
                                className="project-img"
                                style={{ backgroundImage: `url(${imgUrl})` }}
                            >
                                <img
                                    src="/assets/img-remove.png"
                                    alt="img-remove"
                                    className="remove-img"
                                    onClick={() => removeImg(imgUrl)}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>

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
                    <Fields setFields={setFields} fields={fields} />
                    <Tags setTags={setTags} tags={tags} />
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
                            defaultChecked={
                                project ? project.commentsEnabled : false
                            }
                            onChange={() => {
                                setComments(!comments);
                            }}
                        ></input>
                    </div>
                </div>

                <div className="right">
                    <div className="top-inline">
                        <h3>
                            Project Cover image{" "}
                            <i
                                className="fas fa-trash"
                                id="delete-icon"
                                onClick={deleteCover}
                            ></i>
                        </h3>
                        <span>
                            This image will be displayed on Work page.
                            Recommended size 500x500px
                        </span>
                    </div>
                    {/* <div className="project-imgs">
                        {imgUrls.map((imgUrl, i) => (
                            <img
                                className="project-img"
                                src={imgUrl}
                                alt="img"
                                key={i}
                            />
                        ))}
                    </div> */}

                    <div
                        className="image-area"
                        id="img-area"
                        style={
                            cover
                                ? {
                                      border: "none",
                                  }
                                : { overflow: "hidden" }
                        }
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

                        {cover !== "" && (
                            <img
                                src={cover}
                                alt="cover"
                                className="cover-img"
                            />
                        )}

                        {cover === "" && (
                            <label
                                htmlFor="org-logo"
                                style={{ cursor: "pointer" }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setImage(e.dataTransfer.files[0], true);
                                }}
                            >
                                <i
                                    className="fas fa-plus-circle"
                                    id="file-add-icon"
                                ></i>
                                <h5>Drag File</h5>
                                <p>500 x 500 (JPG, PNG)</p>
                            </label>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="org-logo"
                            name="org-logo"
                            style={{ display: "none" }}
                            onChange={(e) => setImage(e.target.files[0], true)}
                        />
                    </div>

                    <div className="buttons button-org">
                        <button className="createOrgButton" onClick={submit}>
                            {edit ? "Finish Editing" : "Create Project"}
                        </button>
                        {edit ? (
                            <button
                                className="deleteOrgBtn"
                                onClick={() => setDelBox(true)}
                            >
                                Delete Project
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectAlter;
