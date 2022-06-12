import "../styles/createOrg.css";
import React, { useState, useEffect } from "react";
import { FaLink, FaPlusCircle, FaTrash, FaTrashAlt } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkLogo from "../getLinkLogo";
import checkLoggedIn from "./utility/checkLoggedIn";
import { useParams } from "react-router-dom";
import SelectUser from "./utility/SelectUser";
import { validate } from "../validate";

const OrgAlter = ({ edit }) => {
    const [links, setLinks] = useState([]);
    const [imgUrl, setImgUrl] = useState("/assets/userFlowIcon.svg");
    const [linksObj, setLinksObj] = useState({});
    const [members, setMembers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [alumni, setAlumni] = useState([]);
    const [persons, setPersons] = useState([]);
    const [independent, setIndependent] = useState(false);
    const [users, setUsers] = useState([]);
    const [org, setOrg] = useState({});
    const [delBox, setDelBox] = useState(false);
    const [select, setSelect] = useState(false);
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

    const deleteOrg = async () => {
        try {
            const dataJson = await fetch(
                `${BASE_API_URL}/org/delete/${id}?access_token=${localStorage.getItem(
                    "authToken"
                )}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await dataJson.json();

            if (data.done) {
                window.location.href = "/community";
            } else {
                notyf.error("Some Error has occurred");
                return;
            }
        } catch (err) {
            notyf.error("Some error has occurred");
        }
    };

    const getMatches = (input) => {
        let matchList = [];

        for (let i = 0; i < users.length; i++) {
            if (
                users[i].name
                    .trim()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) !== -1
            ) {
                matchList.push(users[i].name.trim().toLowerCase());
            }
        }

        return matchList;
    };

    const search = () => {
        const searchVal = document
            .querySelector("#addModName")
            .value.trim()
            .toLowerCase();

        let matches = getMatches(searchVal);

        if (searchVal === "") {
            for (let cell of document.querySelectorAll(".user-cell")) {
                cell.classList.remove("hide");
            }
        } else {
            for (let cell of document.querySelectorAll(".user-cell")) {
                cell.classList.add("hide");
            }

            for (let match of matches) {
                for (let { name } of users) {
                    if (match === name.trim().toLowerCase()) {
                        for (let cellName of document.querySelectorAll(
                            ".user-cell h4"
                        )) {
                            if (
                                cellName.textContent.trim().toLowerCase() ===
                                name.trim().toLowerCase()
                            ) {
                                cellName.parentElement.classList.remove("hide");
                            }
                        }
                    }
                }
            }
        }
    };

    const addPerson = () => {
        const pos = document.querySelector("#addModPos").value;
        const personId = document
            .querySelector("#addModName")
            .getAttribute("data-user");
        const person = users.find((user) => user._id === personId);

        if (person) {
            pos === "admin"
                ? setAdmins([...admins, person._id])
                : pos === "member"
                ? setMembers([...members, person._id])
                : setAlumni([...alumni, person._id]);

            const personForUI = users.find((user) => user._id === person._id);
            personForUI.pos = pos;

            setPersons([...persons, personForUI]);
            document.querySelector("#addModName").value = "";
            document.querySelector("#addModName").setAttribute("data-user", "");
            document.querySelector("#addModPos").value = "member";
        } else {
            notyf.error("Please select a user");
        }
    };

    const removePerson = (remId) => {
        const person = users.find((user) => user._id === remId);
        const pos = person.pos;

        console.log(remId);

        pos === "admin"
            ? setAdmins(admins.filter((admin) => admin !== remId))
            : pos === "member"
            ? setMembers(members.filter((member) => member !== remId))
            : setAlumni(alumni.filter((alum) => alum !== remId));

        setPersons(persons.filter((person) => person._id !== remId));
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

        const reqList = ["name", "description"];
        !independent ? reqList.push("institute") : console.log("indi");
        if (!validate(reqList)) {
            notyf.error("Please fill all required fields");
            return;
        } else {
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
                alumni,
            };

            const submittedJson = await fetch(
                !edit
                    ? `${BASE_API_URL}/org/add?access_token=${localStorage.getItem(
                          "authToken"
                      )}`
                    : `${BASE_API_URL}/org/edit/${id}?access_token=${localStorage.getItem(
                          "authToken"
                      )}`,
                {
                    method: edit ? "PUT" : "POST",
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
        if (edit) {
            if (admins.length !== 0 && users.length !== 0) {
                const getPersons = (arr, pos) => {
                    const perArr = [];

                    if (arr.length !== 0) {
                        for (let ar of arr) {
                            const personToAppend = users.find(
                                (user) => user._id.toString() === ar.toString()
                            );
                            if (personToAppend) {
                                personToAppend.pos = pos;
                                perArr.push(personToAppend);
                            }
                        }
                    }

                    return perArr;
                };

                const personAdmins = getPersons(admins, "admin");
                const personAlumni = getPersons(alumni, "alumni");
                const personMembers = getPersons(members, "member");

                const finalArr = personAdmins.concat(
                    personAlumni,
                    personMembers
                );

                setPersons(finalArr);
            }
        }
    }, [admins, members, alumni, users, edit]);

    useEffect(() => {
        checkLoggedIn("/community");

        const getUsers = async () => {
            try {
                const userDataJson = await fetch(`${BASE_API_URL}/user/all`);
                const userData = await userDataJson.json();

                if (userData.users) {
                    setUsers(userData.users);
                } else {
                    notyf.error("Some error occured");
                }
            } catch (err) {
                notyf.error("Some Error has occurred");
            }
        };

        const getOrg = async () => {
            const dataJson = await fetch(
                `${BASE_API_URL}/org/getForEdit/${id}?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await dataJson.json();

            if (data.org) {
                setOrg(data.org);
                setIndependent(data.org.isIndependent);
                setLinks(data.org.links);
                setImgUrl(data.org.logo_url);
                setMembers(data.org.members);
                setAlumni(data.org.alumni);
                setAdmins(data.org.admins);

                document.getElementById(
                    "img-area"
                ).style.backgroundImage = `url('${data.org.logo_url}')`;
                document
                    .getElementById("img-area")
                    .classList.add("org-logo-uploaded");
            } else {
                notyf.error("Some error occured");
                window.location.href = "/404";
            }
        };

        if (edit) {
            getOrg();
        }
        getUsers();
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
                            <button id="del-del" onClick={deleteOrg}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="create-org-cont">
                <div className="left-org">
                    <h1>{edit ? "Edit" : "Create an"} Organisation</h1>
                    <h3>Name of Organisation *</h3>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder="Code Warriors"
                        required
                        defaultValue={org ? org.name : ""}
                    ></input>
                    <div className="indi-wrap">
                        <h3>Independent Organisation</h3>
                        <input
                            type="checkbox"
                            className="indi-radio"
                            name="isIndependent"
                            checked={independent}
                            onChange={() => {
                                setIndependent(!independent);
                            }}
                        ></input>
                    </div>

                    <h3>Institute name *</h3>
                    <input
                        type="text"
                        name="institute"
                        autoComplete="off"
                        placeholder="Delhi Public School, Vasant Kunj"
                        required
                        defaultValue={org ? org.institute : ""}
                        disabled={independent}
                        className={independent ? "grey-on" : ""}
                    ></input>

                    <h3>Organisation info *</h3>
                    <textarea
                        name="description"
                        autoComplete="off"
                        defaultValue={org ? org.description : ""}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
                    ></textarea>
                    <h3>Organisation website</h3>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Your Mom, Ribhav Sharma"
                        defaultValue={org ? org.website_url : ""}
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
                            <input
                                id="addModName"
                                placeholder="Name"
                                className="mod-input"
                                type="text"
                                style={{ cursor: "pointer" }}
                                onChange={search}
                                onClick={() => setSelect(!select)}
                            />
                            {select ? (
                                <SelectUser
                                    inp={document.querySelector("#addModName")}
                                    users={users}
                                    setSelect={setSelect}
                                />
                            ) : (
                                ""
                            )}
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
                                onClick={addPerson}
                            />
                        </div>
                    </div>
                    {persons.map((person) => {
                        return (
                            <div className="mod-wrap" key={person.name}>
                                <div className="mod-input-wrap">
                                    <input
                                        type="text"
                                        name="mod-name"
                                        autoComplete="off"
                                        defaultValue={person.name}
                                        readOnly
                                        className="mod-input"
                                    ></input>
                                    <input
                                        type="text"
                                        name="mod-pos"
                                        autoComplete="off"
                                        defaultValue={person.pos}
                                        style={{
                                            textTransform: "capitalize",
                                        }}
                                        readOnly
                                        className="mod-input"
                                    ></input>
                                    <FaTrashAlt
                                        className="removeMemIcon"
                                        onClick={() => removePerson(person._id)}
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
                            {edit ? "Finish editing" : "Create organisation"}
                        </button>
                        {edit ? (
                            <button
                                className="deleteOrgBtn"
                                onClick={() => setDelBox(true)}
                            >
                                Delete Organisation
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

export default OrgAlter;
