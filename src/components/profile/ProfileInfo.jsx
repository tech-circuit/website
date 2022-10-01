import "../../styles/profile-info.css";
import {
    FaLink,
    FaPencilAlt,
    FaPlusCircle,
    FaRegArrowAltCircleRight,
    FaTrash,
} from "react-icons/fa";
import "../../styles/add.css";
import { useState, useEffect } from "react";
import BASE_API_URL from "../../constants";
import getLinkLogo from "../../getLinkLogo";
import DangerBox from "../utility/Danger";
import notyf from "../../tcNotyf";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
    const [links, setLinks] = useState([]);
    const [linksObj, setLinksObj] = useState({});
    const [user, setUser] = useState({});
    const [orgs, setOrgs] = useState([]);
    const authToken = localStorage.getItem("authToken");
    let oldE;

    let typeTimeout;

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

            await fetch(
                `${BASE_API_URL}/user/update?access_token=${authToken}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ links: linkList }),
                }
            );
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

        await fetch(`${BASE_API_URL}/user/update?access_token=${authToken}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ links: linkList }),
        });
    };

    const updateUser = (e) => {
        if (oldE !== undefined) {
            if (
                e.target.getAttribute("name") ===
                oldE.target.getAttribute("name")
            ) {
                clearTimeout(typeTimeout);
            }
        }
        oldE = e;

        typeTimeout = setTimeout(() => {
            let body = {};
            body[`${e.target.getAttribute("name")}`] = e.target.value.trim();

            fetch(`${BASE_API_URL}/user/update?access_token=${authToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then();
        }, 2000);
    };

    const updatePfp = async (url) => {
        const updatedJson = await fetch(
            `${BASE_API_URL}/user/pfp?access_token=${localStorage.getItem(
                "authToken"
            )}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pfp: url }),
            }
        );
        const updated = await updatedJson.json();

        if (updated.user) {
            setUser(updated.user);
        } else {
            notyf.error("Some error occurred");
        }

        document
            .querySelector(".delete-modal")
            .classList.remove("delete-modal-active");
        removeBodyOpacity();
    };

    const setImage = async (inputFile) => {
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
                        updatePfp(resp.link);
                    })
                    .catch((error) => {
                        console.log(error);
                        notyf.error("Some error has occurred");
                    });
            };
        }
    };

    const deletePfp = async () => {
        const updatedJson = await fetch(
            `${BASE_API_URL}/user/pfp?access_token=${localStorage.getItem(
                "authToken"
            )}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );
        const updated = await updatedJson.json();

        if (updated.user) {
            setUser(updated.user);
        } else {
            notyf.error("An Error occurred");
        }
        document
            .querySelector(".delete-modal")
            .classList.remove("delete-modal-active");
        removeBodyOpacity();
    };

    useEffect(() => {
        fetch(
            `${BASE_API_URL}/user/info?access_token=${authToken}&&org=true`
        ).then(async (data) => {
            const gotUser = await data.json();
            const user = gotUser.user;
            const orgs = gotUser.orgs;

            // Links
            if (user.links) {
                setLinks(user.links);
            }

            // SET
            setUser(user);
            setOrgs(orgs);
        });
    }, [authToken]);

    useEffect(() => {
        let theObj = {};

        for (let link of links) {
            theObj[link] = getLinkLogo(link);
        }
        setLinksObj(theObj);
    }, [links]);

    return (
        <>
            <div className="opaq-layer"></div>
            <div className="delete-modal">
                <h1>Are you sure you want to delete your profile picture?</h1>

                <div className="report-btns">
                    <button
                        className="report-close"
                        onClick={(e) => {
                            e.target.parentElement.parentElement.classList.remove(
                                "delete-modal-active"
                            );
                            removeBodyOpacity();
                        }}
                        id="delete-cancel-button"
                    >
                        No
                    </button>
                    <button className="delete-submit" onClick={deletePfp}>
                        Yes
                    </button>
                </div>
            </div>
            <div className="profileInfo">
                <div className="fields">
                    <div className="pfp-null"></div>
                    <div className="pfp-sec">
                        <img src={user.pfp_url} alt="pfp" />
                        <p>We recommend an image of 500x500px</p>
                        <div className="pfp-opts">
                            <label
                                style={{ cursor: "pointer" }}
                                htmlFor="pfp-edit"
                                id="edit-pfp"
                            >
                                <FaPencilAlt />
                                &nbsp;&nbsp;Edit
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="pfp-edit"
                                name="pfp-edit"
                                onChange={(e) => setImage(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                            <button id="remove-pfp" onClick={deleteBtn}>
                                <FaTrash />
                                &nbsp;&nbsp;Delete
                            </button>
                        </div>
                    </div>
                    <div className="pInfo">
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>

                        <div className="input">
                            <label htmlFor="username">Username</label>
                            <input
                                maxLength="200"
                                type="text"
                                name="username"
                                placeholder="eg. theVedanta"
                                defaultValue={
                                    user.username ? user.username : ""
                                }
                                onChange={(eve) => updateUser(eve)}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="title">Title</label>
                            <input
                                maxLength="200"
                                type="text"
                                name="title"
                                defaultValue={user.title ? user.title : ""}
                                onChange={(eve) => updateUser(eve)}
                                placeholder="Student, Designer and Developer"
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="about">About me</label>
                            <textarea
                                maxLength="200"
                                type="text"
                                name="about"
                                defaultValue={user.about ? user.about : ""}
                                onChange={(eve) => updateUser(eve)}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. Pretium eget ut et blandit cursus. Mattis malesuada at semper cursus."
                            ></textarea>
                        </div>

                        <div className="create-links input">
                            <label>Add Links</label>
                            <div className="link-unit">
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
                            {links.map((link, i) => {
                                return (
                                    <div className="link-unit" key={i}>
                                        {linksObj[link]}
                                        <input
                                            maxLength="200"
                                            type="text"
                                            placeholder="example: https://github.com/kevin"
                                            value={link}
                                            readOnly
                                            disabled
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

                        <div className="input profile-clubs">
                            <label>Organizations</label>
                            {orgs.map((org) => (
                                <OrgCard key={org._id} org={org} />
                            ))}
                        </div>

                        <div className="input">
                            <label htmlFor="country">Country</label>
                            <select
                                type="text"
                                name="country"
                                onChange={(eve) => updateUser(eve)}
                            >
                                <option value={user.country}>
                                    SELECTED: {user.country}
                                </option>
                                <option value="India">India</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">
                                    Åland Islands
                                </option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                    American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua and Barbuda">
                                    Antigua and Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia and Herzegovina">
                                    Bosnia and Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">
                                    Bouvet Island
                                </option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">
                                    British Indian Ocean Territory
                                </option>
                                <option value="Brunei Darussalam">
                                    Brunei Darussalam
                                </option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                    Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                    Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                    Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">
                                    Christmas Island
                                </option>
                                <option value="Cocos (Keeling) Islands">
                                    Cocos (Keeling) Islands
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, The Democratic Republic of The">
                                    Congo, The Democratic Republic of The
                                </option>
                                <option value="Cook Islands">
                                    Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote D'ivoire">
                                    Cote D'ivoire
                                </option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                    Czech Republic
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                    Dominican Republic
                                </option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">
                                    Falkland Islands (Malvinas)
                                </option>
                                <option value="Faroe Islands">
                                    Faroe Islands
                                </option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">
                                    French Guiana
                                </option>
                                <option value="French Polynesia">
                                    French Polynesia
                                </option>
                                <option value="French Southern Territories">
                                    French Southern Territories
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-bissau">
                                    Guinea-bissau
                                </option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island and Mcdonald Islands">
                                    Heard Island and Mcdonald Islands
                                </option>
                                <option value="Holy See (Vatican City State)">
                                    Holy See (Vatican City State)
                                </option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran, Islamic Republic of">
                                    Iran, Islamic Republic of
                                </option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People's Republic of">
                                    Korea, Democratic People's Republic of
                                </option>
                                <option value="Korea, Republic of">
                                    Korea, Republic of
                                </option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People's Democratic Republic">
                                    Lao People's Democratic Republic
                                </option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">
                                    Libyan Arab Jamahiriya
                                </option>
                                <option value="Liechtenstein">
                                    Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="Macedonia, The Former Yugoslav Republic of">
                                    Macedonia, The Former Yugoslav Republic of
                                </option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                    Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States of">
                                    Micronesia, Federated States of
                                </option>
                                <option value="Moldova, Republic of">
                                    Moldova, Republic of
                                </option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">
                                    Netherlands Antilles
                                </option>
                                <option value="New Caledonia">
                                    New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                    Norfolk Island
                                </option>
                                <option value="Northern Mariana Islands">
                                    Northern Mariana Islands
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory, Occupied">
                                    Palestinian Territory, Occupied
                                </option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                    Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">
                                    Russian Federation
                                </option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">
                                    Saint Helena
                                </option>
                                <option value="Saint Kitts and Nevis">
                                    Saint Kitts and Nevis
                                </option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre and Miquelon">
                                    Saint Pierre and Miquelon
                                </option>
                                <option value="Saint Vincent and The Grenadines">
                                    Saint Vincent and The Grenadines
                                </option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome and Principe">
                                    Sao Tome and Principe
                                </option>
                                <option value="Saudi Arabia">
                                    Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                    Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                    Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                    South Africa
                                </option>
                                <option value="South Georgia and The South Sandwich Islands">
                                    South Georgia and The South Sandwich Islands
                                </option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard and Jan Mayen">
                                    Svalbard and Jan Mayen
                                </option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">
                                    Syrian Arab Republic
                                </option>
                                <option value="Taiwan, Province of China">
                                    Taiwan, Province of China
                                </option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic of">
                                    Tanzania, United Republic of
                                </option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-leste">Timor-leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad and Tobago">
                                    Trinidad and Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                    Turkmenistan
                                </option>
                                <option value="Turks and Caicos Islands">
                                    Turks and Caicos Islands
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">
                                    United Arab Emirates
                                </option>
                                <option value="United Kingdom">
                                    United Kingdom
                                </option>
                                <option value="United States">
                                    United States
                                </option>
                                <option value="United States Minor Outlying Islands">
                                    United States Minor Outlying Islands
                                </option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Virgin Islands, British">
                                    Virgin Islands, British
                                </option>
                                <option value="Virgin Islands, U.S.">
                                    Virgin Islands, U.S.
                                </option>
                                <option value="Wallis and Futuna">
                                    Wallis and Futuna
                                </option>
                                <option value="Western Sahara">
                                    Western Sahara
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                        </div>

                        <DangerBox name="account" />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </>
    );

    function bodyClick(eve) {
        if (eve.target.classList.contains("opaq-layer")) {
            document.querySelector(".report-modal-active")
                ? document
                      .querySelector(".report-modal")
                      .classList.remove("report-modal-active")
                : document
                      .querySelector(".delete-modal")
                      .classList.remove("delete-modal-active");

            removeBodyOpacity();

            document.body.removeEventListener("click", bodyClick);
        }
    }

    function deleteBtn(postID) {
        document
            .querySelector(".delete-modal")
            .classList.add("delete-modal-active");

        document.body.classList.add("report-modal-body");

        setTimeout(() => {
            document.body.addEventListener("click", bodyClick);
        }, 100);
    }

    function removeBodyOpacity() {
        document.body.classList.remove("report-modal-body");
    }
};

const OrgCard = ({ org }) => {
    return (
        <div className="profile-org-card">
            <div className="profile-org-img">
                <img src={org.logo_url} alt="org-logo" />
            </div>
            <div className="profile-org-info">
                <Link to={`/org/${org._id}`}>{org.name}</Link>
                <p>{org.description}</p>
            </div>
            <div className="leave-opt">
                <button>
                    <FaRegArrowAltCircleRight />
                    &nbsp;&nbsp;Leave
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;
