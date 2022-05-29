import "../styles/createOrg.css";
import React, { useState, useEffect } from "react";
import { FaLink, FaPlusCircle, FaTrash, FaTrashAlt } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkLogo from "../getLinkLogo";

const CreateOrg = () => {
    const [links, setLinks] = useState([]);
    const [imgUrl, setImgUrl] = useState("/assets/userFlowIcon.svg");
    const [linksObj, setLinksObj] = useState({});
    const [members, setMembers] = useState([]);
    const [independent, setIndependent] = useState(false);
    const [users, setUsers] = useState([]);

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
        console.log("haa");
        if (
            inputFile.name.toLowerCase().endsWith(".png") ||
            inputFile.name.toLowerCase().endsWith(".jpg") ||
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
                        console.log(resp);
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
        document.querySelector("input[name='org-logo']").value = "";
    };

    const addMember = () => {
        const name = document
            .getElementById("addModName")
            .value.split("-thvdnta-")[0];
        const pfp = document
            .getElementById("addModName")
            .value.split("-thvdnta-")[1];
        const pos = document.getElementById("addModPos").value;

        if (name.trim() !== "") {
            const member = {
                name,
                pfp,
                pos,
            };

            console.log(member);

            document.getElementById("addModName").value = "";
            document.getElementById("addModPos").value = "member";

            setMembers([...members, member]);
        } else {
            notyf.error("Add a Name for the member");
        }
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
        const admins = [];

        for (let member of members) {
            if (member.pos === "admin") admins.push(member);
        }

        if (name === "" || description === "") {
            notyf.error("Please fill all required fields");
            return;
        } else {
            if (!independent) {
                if (institute === "") {
                    notyf.error("Please fill all required fields");
                    return;
                }
            }
            const body = {
                name,
                institute,
                isIndependent: independent,
                description,
                website_url,
                links,
                members,
                logo_url,
                admins,
            };

            const submittedJson = await fetch(
                `${BASE_API_URL}/org/add?access_token=${localStorage.getItem(
                    "authToken"
                )}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }
            );
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

    useEffect(() => {
        const getUsers = async () => {
            const userDataJson = await fetch(`${BASE_API_URL}/user/all`);
            const userData = await userDataJson.json();

            if (userData.users) {
                setUsers(userData.users);
            } else {
                notyf.error("Some error occured");
            }
        };

        try {
            getUsers();
        } catch (err) {
            notyf.error("Some Error occurred");
        }
    }, []);

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
                        <h3>Independent Organisation</h3>
                        <input
                            type="checkbox"
                            className="indi-radio"
                            name="isIndependent"
                            value="html"
                            onChange={() => {
                                setIndependent(!independent);
                            }}
                        ></input>
                    </div>
                    {!independent ? (
                        <>
                            <h3>Institute name *</h3>
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
                                <div
                                    className="link-unit"
                                    key={links.indexOf(link)}
                                >
                                    {linksObj[link]}
                                    <input
                                        maxLength="200"
                                        type="text"
                                        placeholder="example: https://github.com/kevin"
                                        defaultValue={link}
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
                    <h3>Organisation Members</h3>
                    <div className="mod-wrap">
                        <div className="mod-input-wrap">
                            <select
                                id="addModName"
                                placeholder="Name"
                                className="mod-input"
                            >
                                <option value="">Username</option>
                                {users.map((user) => {
                                    return (
                                        <option
                                            key={user._id}
                                            value={`${user.username}-thvdnta-${user.pfp_url}`}
                                        >
                                            {user.username}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                id="addModPos"
                                placeholder="Position"
                                className="mod-input"
                            >
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                                <option value="alumni">Alumni</option>
                            </select>
                            <FaPlusCircle
                                className="addMemIcon"
                                onClick={addMember}
                            />
                        </div>
                    </div>
                    {members.map((member) => {
                        return (
                            <div className="mod-wrap" key={member.name}>
                                <div className="mod-input-wrap">
                                    <input
                                        type="text"
                                        name="mod-name"
                                        autoComplete="off"
                                        defaultValue={member.name}
                                        readOnly
                                        className="mod-input"
                                    ></input>
                                    <input
                                        type="text"
                                        name="mod-pos"
                                        autoComplete="off"
                                        defaultValue={member.pos}
                                        style={{
                                            textTransform: "capitalize",
                                        }}
                                        readOnly
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
