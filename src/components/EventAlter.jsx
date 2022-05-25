import React, { useState, useEffect } from "react";
import { FaLink, FaPlusCircle, FaTrash } from "react-icons/fa";
import BASE_API_URL from "../constants";
import notyf from "../tcNotyf";
import getLinkLogo from "../getLinkLogo";
import { useParams } from "react-router-dom";
import "../styles/createProject.css";
import Tags from "./utility/Tags";
import Fields from "./utility/Fields";

const EventAlter = ({ edit }) => {
    const [links, setLinks] = useState([]);
    const [imgUrl, setImgUrl] = useState("/assets/userFlowIcon.svg");
    const [linksObj, setLinksObj] = useState({});
    const [tags, setTags] = useState([]);
    const [fields, setFields] = useState([]);
    const [indi, setIndi] = useState(false);
    const [event, setEvent] = useState({});
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
        document.querySelector("input[name='event-banner']").value = "";
        document
            .getElementById("img-area")
            .classList.remove("org-logo-uploaded");
    };

    const submit = async () => {
        const name = document.querySelector("input[name='name']").value;
        const institute = document.querySelector(
            "input[name='institute']"
        ).value;
        const description = document.querySelector(
            "textarea[name='description']"
        ).value;
        const website = document.querySelector("input[name='website']").value;
        const regLink = document.querySelector("input[name='reg-link']").value;
        const lastDate = document.querySelector("input[name='last-date']").value
            ? document.querySelector("input[name='last-date']").value
            : new Date();
        const hosts = document.querySelectorAll("input[name='host']");
        const eligibility = document.querySelector(
            "textarea[name='eligibility']"
        ).value;
        const startDate = document.querySelector("input[name='start-date']")
            .value
            ? document.querySelector("input[name='start-date']").value
            : new Date();
        const endDate = document.querySelector("input[name='end-date']").value
            ? document.querySelector("input[name='end-date']").value
            : new Date();
        const phone = document.querySelector("input[name='phone']").value;
        const email = document.querySelector("input[name='email']").value;
        let host;

        for (let radio of hosts) {
            if (radio.checked) {
                host = radio.value;
            }
        }

        console.log(startDate, endDate);

        if (
            name === "" ||
            description === "" ||
            website === "" ||
            regLink === "" ||
            !host ||
            indi
                ? true
                : institute === ""
        ) {
            notyf.error("Please fill all required fields");
            return;
        } else {
            const body = {
                cover_image: imgUrl,
                name,
                institute: institute !== "" ? institute : false,
                description,
                website,
                regLink,
                lastDate,
                host,
                eligibility,
                startDate,
                endDate,
                phone,
                email,
                tags,
                fields,
                indi,
                links,
            };

            const fetchUrl = edit
                ? `${BASE_API_URL}/event/edit/${
                      event._id
                  }?access_token=${localStorage.getItem("authToken")}`
                : `${BASE_API_URL}/event/add?access_token=${localStorage.getItem(
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
                window.location.href = "/events";
            } else {
                console.log(submitted);
                notyf.error("Some Error has occurred");
                return;
            }
        }
    };

    // SET LINK LOGOS
    useEffect(() => {
        let theObj = {};
        for (let link of links) {
            theObj[link] = getLinkLogo(link);
        }
        setLinksObj(theObj);
    }, [links]);

    useEffect(() => {
        const getEvent = async () => {
            const dataJson = await fetch(
                `${BASE_API_URL}/event/getForEdit/${id}?access_token=${localStorage.getItem(
                    "authToken"
                )}`
            );
            const data = await dataJson.json();

            if (data.event) {
                setImgUrl(data.event.cover_image);
                setLinks(data.event.links);
                setTags(data.event.tags);
                setFields(data.event.fields);
                setIndi(data.event.isIndependant);
                setEvent(data.event);

                document.getElementById(
                    "img-area"
                ).style.backgroundImage = `url('${data.project.cover_image}')`;
                document
                    .getElementById("img-area")
                    .classList.add("org-logo-uploaded");
            } else {
                window.location.href = "/404";
            }
        };

        if (edit) {
            getEvent();
        }
    }, [id, edit]);

    return (
        <>
            <div className="create-org-cont">
                <div className="left-org">
                    <h1>{edit ? "Edit" : "Organize an"} Event</h1>
                    <p style={{ color: "#c4c4c4 !important" }}>
                        {edit
                            ? ""
                            : "Oraganize an event on the most loved platform"}
                    </p>

                    <h3>Name of Event *</h3>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder="EXUN 2022"
                        required
                        defaultValue={event ? event.name : ""}
                    ></input>

                    <h3 id="grey-on">Name of Organising institute *</h3>
                    <input
                        type="text"
                        name="institute"
                        autoComplete="off"
                        placeholder="DPS VK"
                        required
                        id="grey-on"
                        defaultValue={event ? event.institute : ""}
                    ></input>

                    <div className="indi-wrap">
                        <h3>Independant Event</h3>
                        <input
                            type="checkbox"
                            className="indi-radio"
                            name="independant"
                            defaultChecked={event ? event.isIndependant : false}
                            onChange={() => {
                                setIndi(!indi);

                                const greys =
                                    document.querySelectorAll("#grey-on");
                                for (let grey of greys) {
                                    grey.classList.toggle("grey-on");
                                    if (grey.value) grey.value = "";
                                    grey.disabled
                                        ? (grey.disabled = false)
                                        : (grey.disabled = true);
                                }
                            }}
                        ></input>
                    </div>

                    <h3>Decription of the Event *</h3>
                    <textarea
                        name="description"
                        autoComplete="off"
                        required
                        defaultValue={event ? event.description : ""}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
                    ></textarea>

                    <h3>Add Website Link *</h3>
                    <input
                        type="text"
                        required
                        name="website"
                        autoComplete="off"
                        placeholder="https://code-warriors.org/"
                        defaultValue={event ? event.website : ""}
                    ></input>

                    <h3>Registration Link *</h3>
                    <input
                        type="text"
                        name="reg-link"
                        autoComplete="off"
                        placeholder="https://code-warriors.org/"
                        defaultValue={event ? event.regLink : ""}
                    ></input>

                    <h3>Last date to register</h3>
                    <input
                        type="date"
                        name="last-date"
                        defaultValue={event ? event.lastDate : new Date()}
                    />

                    <h3>How are you hosting your Event? *</h3>
                    <div className="rads">
                        <div className="rad">
                            <span>Online</span>
                            <input
                                type="radio"
                                id="host"
                                name="host"
                                value="online"
                                defaultChecked={
                                    event.host === "online" ? true : false
                                }
                            />
                        </div>
                        <div className="rad">
                            <span>Onsite</span>
                            <input
                                type="radio"
                                id="host"
                                name="host"
                                value="onsite"
                                defaultChecked={
                                    event.host === "onsite" ? true : false
                                }
                            />
                        </div>
                        <div className="rad">
                            <span>Both</span>
                            <input
                                type="radio"
                                id="host"
                                name="host"
                                value="both"
                                defaultChecked={
                                    event.host === "both" ? true : false
                                }
                            />
                        </div>
                    </div>

                    <h3>Eligibility Criteria</h3>
                    <textarea
                        name="eligibility"
                        autoComplete="off"
                        required
                        defaultValue={event ? event.eligibility : ""}
                        placeholder="Describe who all can take part in this event"
                    ></textarea>

                    <h3>Event Start date</h3>
                    <input
                        type="date"
                        name="start-date"
                        defaultValue={event ? event.startDate : new Date()}
                    />

                    <h3>Event End date</h3>
                    <input
                        type="date"
                        name="end-date"
                        defaultValue={event ? event.endDate : new Date()}
                    />

                    <Fields updateFields={setFields} />
                    <p className="input-sub-text">Upto 5 Fields</p>

                    <Tags updateTags={setTags} />
                    <p className="input-sub-text">
                        Upto 5 tags, Use space to separate
                    </p>

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

                    <h3>Phone (Event Contact)</h3>
                    <input
                        type="number"
                        name="phone"
                        placeholder="1234567890"
                        defaultValue={event ? event.phone : ""}
                    />
                    <h3>Email (Event Contact)</h3>
                    <input
                        type="email"
                        name="email"
                        placeholder="yourmom@myhouse.cum"
                        defaultValue={event ? event.email : ""}
                    />
                </div>

                <div className="right">
                    <div className="top-inline">
                        <h3>Event Banner Upload</h3>
                        <i
                            className="fas fa-trash"
                            id="delete-icon"
                            onClick={deleteImage}
                        ></i>
                        <span>
                            This image will be displayed on Event page.
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
                            name="event-banner"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="buttons button-org">
                        <button className="createOrgButton" onClick={submit}>
                            {edit ? "Finish Editing" : "Create Event"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventAlter;
