import "../styles/createOrg.css";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaLink, FaPlusCircle, FaTrash, FaTrashAlt } from "react-icons/fa";
import BASE_API_URL from "../constants";
import { Notyf } from "notyf";
import getLinkLogo from "../getLinkLogo";
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

const CreateOrg = () => {
    const [links, setLinks] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [linksObj, setLinksObj] = useState({});
    const [members, setMembers] = useState([]);
    const [independent, setIndependent] = useState(false);

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
        if (
            inputFile.name.endsWith(".png") ||
            inputFile.name.endsWith(".jpg") ||
            inputFile.name.endsWith(".jpeg")
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
        document
            .getElementById("img-area")
            .classList.remove("org-logo-uploaded");
    };

    const addMember = () => {
        const name = document.getElementById("addModName").value;
        const pos = document.getElementById("addModPos").value;

        const member = {
            name,
            pos,
        };

        document.getElementById("addModName").value = "";
        document.getElementById("addModPos").value = "";

        setMembers([...members, member]);
    };

    const removeMember = (member) => {
        setMembers(members.filter((mem) => mem !== member));
    };

    const submit = async () => {
        const name = document.querySelector("input[name='name']").value;
        const institute = document.querySelector("input[name='institute']")
            ? document.querySelector("input[name='institute']").value
            : "";
        const description = document.querySelector(
            "textarea[name='description']"
        ).value;
        const website_url = document.querySelector(
            "input[name='website_url']"
        ).value;
        const logo_url = imgUrl;

        if (name === "" || description === "") {
            notyf.error("Please fill all required fields");
            return;
        } else {
            const body = {
                name,
                institute,
                isIndependant: independent,
                description,
                website_url,
                links,
                members,
                logo_url,
            };

            const submittedJson = await fetch(`${BASE_API_URL}/org/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const submitted = await submittedJson.json();

            if (submitted.done) {
                window.location.href = "/community";
            } else {
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
                        required
                    ></input>
                    <div className="indi-wrap">
                        <h3>Independant Organisation</h3>
                        <input
                            type="checkbox"
                            className="indi-radio"
                            name="isIndependant"
                            value="html"
                            onChange={() => {
                                setIndependent(!independent);
                            }}
                        ></input>
                    </div>
                    {!independent ? (
                        <>
                            <h3>Institute name</h3>
                            <input
                                type="text"
                                name="institute"
                                autoComplete="off"
                                placeholder="Delhi Public School, Vasant Kunj"
                                required
                            ></input>
                        </>
                    ) : (
                        ""
                    )}
                    <h3>Organisation info *</h3>
                    <textarea
                        name="description"
                        autoComplete="off"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
                    ></textarea>
                    <h3>Organisation website</h3>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Your Mom, Ribhav Sharma"
                    ></input>
                    <h3>Add social links</h3>
                    <div className="create-links input">
                        {links.map((link) => {
                            return (
                                <div className="link-unit">
                                    {linksObj[link]}
                                    <input
                                        maxLength="200"
                                        type="text"
                                        placeholder="example: https://github.com/kevin"
                                        value={link}
                                        readonly
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
                        <div className="link-unit" id="add-link-unit">
                            <FaLink className="create-link-brand" />
                            <input
                                maxLength="200"
                                type="text"
                                placeholder="example: https://github.com/kevin"
                                id="add-link-inp"
                            />
                            <FaPlusCircle
                                className="create-link-opt"
                                onClick={addLink}
                            />
                        </div>
                    </div>
                    <h3>
                        Organisation Moderators
                        <span className="org-mod-text">Add maximum of 5</span>
                    </h3>
                    {members.map((member) => {
                        return (
                            <div className="mod-wrap">
                                <div className="mod-input-wrap">
                                    <input
                                        type="text"
                                        name="mod-name"
                                        autoComplete="off"
                                        value={member.name}
                                        readonly
                                        className="mod-input"
                                    ></input>
                                    <input
                                        type="text"
                                        name="mod-pos"
                                        autoComplete="off"
                                        value={member.pos}
                                        readonly
                                        className="mod-input"
                                    ></input>
                                    <FaTrashAlt
                                        className="removeMemIcon"
                                        onClick={() => removeMember(member)}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="mod-wrap">
                        <div className="mod-input-wrap">
                            <input
                                type="text"
                                id="addModName"
                                autoComplete="off"
                                placeholder="Name"
                                className="mod-input"
                            ></input>
                            <input
                                type="text"
                                id="addModPos"
                                autoComplete="off"
                                placeholder="Position"
                                className="mod-input"
                            ></input>
                            <FaPlusCircle
                                className="addMemIcon"
                                onClick={addMember}
                            />
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
                        <span>
                            This image will be displayed on community page.
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
                            Create Organisation
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateOrg;
