// import { Link } from "react-router-dom";
// import { FaChevronLeft, FaBehanceSquare } from "react-icons/fa";
import React, { useState } from "react";
import "../styles/createEvent.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FileDrop } from "react-file-drop";
import DangerBox from './utility/Danger'

const CreateEvent = () => {
    const [links, setLinks] = useState([]);
    const [title, setTitle] = useState("");
    // const [fieldsText, setFieldsText] = useState("");
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

    // const addField = (field) => {
    //   console.log(field);
    //   setFieldsText(fieldsText + ", " + field);
    // };

    const editTags = (tag) => {
        // console.log(tag)
        setTags(tag);
    };

    const setImage = async (inputFile) => {
        if (
            inputFile.name.toLowerCase().endsWith(".png") ||
            inputFile.name.toLowerCase().endsWith(".jpg") ||
            inputFile.name.toLowerCase().endsWith(".jpeg")
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
            <section className="create-event-cont">
                <div className="left-event">
                    <h1>Organise an Event</h1>
                    <h3>Name of Event *</h3>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder="alphaNODE'21"
                        required="true"
                    ></input>
                    <h3>Name of organising institute *</h3>
                    <input
                        type="text"
                        name="institute"
                        autoComplete="off"
                        placeholder="Delhi Public School, Gurgaon Sector-45"
                        required="true"
                    ></input>
                    <div className="indi-wrap">
                        <h3>Independant Event</h3>
                        <input
                            type="radio"
                            className="indi-radio"
                            name="isIndependant"
                            value="html"
                        ></input>
                    </div>
                    <h3>Brief description of the event *</h3>
                    <textarea
                        name="description"
                        autoComplete="off"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum eu, aenean porta neque ante tellus. Ipsum consequat semper amet nullam proin. "
                    ></textarea>
                    <h3>Add event website link *</h3>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Your Mom, Ribhav Sharma"
                    ></input>
                    <h3>Event registration link</h3>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Your Mom, Ribhav Sharma"
                    ></input>
                    <h3>Last date for registeration </h3>
                    <input
                        type="date"
                        className="lastDate"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Your Mom, Ribhav Sharma"
                    ></input>
                    <h3>How are you hosting your event? *</h3>
                    <div className="hosting-type">
                        <div className="hosting-div">
                            <input
                                type="radio"
                                id="h-online"
                                className="indi-radio"
                                name="hosting-opt"
                                value="online"
                            ></input>
                            <label for="h-online">Online</label>
                        </div>
                        <div className="hosting-div">
                            <input
                                type="radio"
                                id="h-onsite"
                                className="indi-radio"
                                name="hosting-opt"
                                value="onsite"
                            ></input>
                            <label for="h-onsite">Onsite</label>
                        </div>
                        <div className="hosting-div">
                            <input
                                type="radio"
                                id="h-other"
                                className="indi-radio"
                                name="hosting-opt"
                                value="other"
                            ></input>
                            <label for="h-other">Other (mention below)</label>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Quiz and Crossword onsite, rest are all online"
                    ></input>
                    <h3>Describe the eligibilty criteria briefly</h3>
                    <input
                        type="text"
                        name="website_url"
                        autoComplete="off"
                        placeholder="Describe who all can take part in this event"
                    ></input>
                    <div className="date-cont">
                        <div className="date-wrap">
                            <h3>Event start date*</h3>
                            <input
                                type="date"
                                name="website_url"
                                autoComplete="off"
                                placeholder="Your Mom, Ribhav Sharma"
                            ></input>
                        </div>
                        <div className="date-wrap">
                            <h3>Event end date*</h3>
                            <input
                                type="date"
                                name="website_url"
                                autoComplete="off"
                                placeholder="Your Mom, Ribhav Sharma"
                            ></input>
                        </div>
                    </div>
                    <div className="date-cont">
                        <div className="date-wrap">
                            <h3>Event start time</h3>
                            <input
                                type="time"
                                name="website_url"
                                autoComplete="off"
                                placeholder="Your Mom, Ribhav Sharma"
                            ></input>
                        </div>
                        <div className="date-wrap">
                            <h3>Event end time</h3>
                            <input
                                type="time"
                                name="website_url"
                                autoComplete="off"
                                placeholder="Your Mom, Ribhav Sharma"
                            ></input>
                        </div>
                    </div>
                    <div className="location-event">
                        <div>
                            <label htmlFor="country" className="loc">
                                Country*
                            </label>
                            <br></br>
                            <select name="country" className="country">
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">
                                    Åland Islands
                                </option>
                                <option value="Albania">Albania</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="country" className="loc">
                                State*
                            </label>
                            <br></br>
                            <select name="country" className="country">
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">
                                    Åland Islands
                                </option>
                                <option value="Albania">Albania</option>
                            </select>
                        </div>
                    </div>
                    <h3>Tags</h3>
                    <input
                        type="text"
                        name="title"
                        autoComplete="off"
                        value={tags}
                        onChange={(event) => editTags(event.target.value)}
                    ></input>
                    <h5 className="below-input">
                        Tags help users to find your event. You can use upto 8
                        tags.
                    </h5>
                    <h3>Mention your organisation</h3>
                    <input
                        type="text"
                        name="title"
                        autoComplete="off"
                        className="mentionOrg"
                        placeholder="Search for your organisation"
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
                    <h3>Event contact info</h3>
                    <div className="contact-input">
                        <i className="fas fa-regular fa-envelope"></i>
                        <input
                            type="text"
                            name="website_url"
                            autoComplete="off"
                            placeholder="Your Mom, Ribhav Sharma"
                        ></input>
                    </div>
                    <DangerBox name="event"/>
                </div>

                <div className="right-event">
                    <div className="top-inline">
                        <h3>Organisation Image Upload</h3>
                        <i
                            className="fas fa-trash"
                            id="delete-icon"
                            onClick={deleteImage}
                        ></i>
                        <span>
                            This image will be displayed on event page.
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
                        {imgUrl === "" ? (
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
                        )}
                    </div>

                    <div className="buttons button-event">
                        <button className="createEventButton">
                            Create Event
                        </button>
                    </div>
                </div>
            </section>
        </>

        //           <div className="input smol-input">
        //             <label htmlFor="country">Country</label>
        //             <select name="country">
        //               <option value="Afghanistan">Afghanistan</option>
        //               <option value="Åland Islands">Åland Islands</option>
        //               <option value="Albania">Albania</option>
        //               <option value="Algeria">Algeria</option>
        //               <option value="American Samoa">American Samoa</option>
        //               <option value="Andorra">Andorra</option>
        //               <option value="Angola">Angola</option>
        //               <option value="Anguilla">Anguilla</option>
        //               <option value="Antarctica">Antarctica</option>
        //               <option value="Antigua and Barbuda">
        //                 Antigua and Barbuda
        //               </option>
        //               <option value="Argentina">Argentina</option>
        //               <option value="Armenia">Armenia</option>
        //               <option value="Aruba">Aruba</option>
        //               <option value="Australia">Australia</option>
        //               <option value="Austria">Austria</option>
        //               <option value="Azerbaijan">Azerbaijan</option>
        //               <option value="Bahamas">Bahamas</option>
        //               <option value="Bahrain">Bahrain</option>
        //               <option value="Bangladesh">Bangladesh</option>
        //               <option value="Barbados">Barbados</option>
        //               <option value="Belarus">Belarus</option>
        //               <option value="Belgium">Belgium</option>
        //               <option value="Belize">Belize</option>
        //               <option value="Benin">Benin</option>
        //               <option value="Bermuda">Bermuda</option>
        //               <option value="Bhutan">Bhutan</option>
        //               <option value="Bolivia">Bolivia</option>
        //               <option value="Bosnia and Herzegovina">
        //                 Bosnia and Herzegovina
        //               </option>
        //               <option value="Botswana">Botswana</option>
        //               <option value="Bouvet Island">Bouvet Island</option>
        //               <option value="Brazil">Brazil</option>
        //               <option value="British Indian Ocean Territory">
        //                 British Indian Ocean Territory
        //               </option>
        //               <option value="Brunei Darussalam">Brunei Darussalam</option>
        //               <option value="Bulgaria">Bulgaria</option>
        //               <option value="Burkina Faso">Burkina Faso</option>
        //               <option value="Burundi">Burundi</option>
        //               <option value="Cambodia">Cambodia</option>
        //               <option value="Cameroon">Cameroon</option>
        //               <option value="Canada">Canada</option>
        //               <option value="Cape Verde">Cape Verde</option>
        //               <option value="Cayman Islands">Cayman Islands</option>
        //               <option value="Central African Republic">
        //                 Central African Republic
        //               </option>
        //               <option value="Chad">Chad</option>
        //               <option value="Chile">Chile</option>
        //               <option value="China">China</option>
        //               <option value="Christmas Island">Christmas Island</option>
        //               <option value="Cocos (Keeling) Islands">
        //                 Cocos (Keeling) Islands
        //               </option>
        //               <option value="Colombia">Colombia</option>
        //               <option value="Comoros">Comoros</option>
        //               <option value="Congo">Congo</option>
        //               <option value="Congo, The Democratic Republic of The">
        //                 Congo, The Democratic Republic of The
        //               </option>
        //               <option value="Cook Islands">Cook Islands</option>
        //               <option value="Costa Rica">Costa Rica</option>
        //               <option value="Cote D'ivoire">Cote D'ivoire</option>
        //               <option value="Croatia">Croatia</option>
        //               <option value="Cuba">Cuba</option>
        //               <option value="Cyprus">Cyprus</option>
        //               <option value="Czech Republic">Czech Republic</option>
        //               <option value="Denmark">Denmark</option>
        //               <option value="Djibouti">Djibouti</option>
        //               <option value="Dominica">Dominica</option>
        //               <option value="Dominican Republic">Dominican Republic</option>
        //               <option value="Ecuador">Ecuador</option>
        //               <option value="Egypt">Egypt</option>
        //               <option value="El Salvador">El Salvador</option>
        //               <option value="Equatorial Guinea">Equatorial Guinea</option>
        //               <option value="Eritrea">Eritrea</option>
        //               <option value="Estonia">Estonia</option>
        //               <option value="Ethiopia">Ethiopia</option>
        //               <option value="Falkland Islands (Malvinas)">
        //                 Falkland Islands (Malvinas)
        //               </option>
        //               <option value="Faroe Islands">Faroe Islands</option>
        //               <option value="Fiji">Fiji</option>
        //               <option value="Finland">Finland</option>
        //               <option value="France">France</option>
        //               <option value="French Guiana">French Guiana</option>
        //               <option value="French Polynesia">French Polynesia</option>
        //               <option value="French Southern Territories">
        //                 French Southern Territories
        //               </option>
        //               <option value="Gabon">Gabon</option>
        //               <option value="Gambia">Gambia</option>
        //               <option value="Georgia">Georgia</option>
        //               <option value="Germany">Germany</option>
        //               <option value="Ghana">Ghana</option>
        //               <option value="Gibraltar">Gibraltar</option>
        //               <option value="Greece">Greece</option>
        //               <option value="Greenland">Greenland</option>
        //               <option value="Grenada">Grenada</option>
        //               <option value="Guadeloupe">Guadeloupe</option>
        //               <option value="Guam">Guam</option>
        //               <option value="Guatemala">Guatemala</option>
        //               <option value="Guernsey">Guernsey</option>
        //               <option value="Guinea">Guinea</option>
        //               <option value="Guinea-bissau">Guinea-bissau</option>
        //               <option value="Guyana">Guyana</option>
        //               <option value="Haiti">Haiti</option>
        //               <option value="Heard Island and Mcdonald Islands">
        //                 Heard Island and Mcdonald Islands
        //               </option>
        //               <option value="Holy See (Vatican City State)">
        //                 Holy See (Vatican City State)
        //               </option>
        //               <option value="Honduras">Honduras</option>
        //               <option value="Hong Kong">Hong Kong</option>
        //               <option value="Hungary">Hungary</option>
        //               <option value="Iceland">Iceland</option>
        //               <option value="India">India</option>
        //               <option value="Indonesia">Indonesia</option>
        //               <option value="Iran, Islamic Republic of">
        //                 Iran, Islamic Republic of
        //               </option>
        //               <option value="Iraq">Iraq</option>
        //               <option value="Ireland">Ireland</option>
        //               <option value="Isle of Man">Isle of Man</option>
        //               <option value="Israel">Israel</option>
        //               <option value="Italy">Italy</option>
        //               <option value="Jamaica">Jamaica</option>
        //               <option value="Japan">Japan</option>
        //               <option value="Jersey">Jersey</option>
        //               <option value="Jordan">Jordan</option>
        //               <option value="Kazakhstan">Kazakhstan</option>
        //               <option value="Kenya">Kenya</option>
        //               <option value="Kiribati">Kiribati</option>
        //               <option value="Korea, Democratic People's Republic of">
        //                 Korea, Democratic People's Republic of
        //               </option>
        //               <option value="Korea, Republic of">Korea, Republic of</option>
        //               <option value="Kuwait">Kuwait</option>
        //               <option value="Kyrgyzstan">Kyrgyzstan</option>
        //               <option value="Lao People's Democratic Republic">
        //                 Lao People's Democratic Republic
        //               </option>
        //               <option value="Latvia">Latvia</option>
        //               <option value="Lebanon">Lebanon</option>
        //               <option value="Lesotho">Lesotho</option>
        //               <option value="Liberia">Liberia</option>
        //               <option value="Libyan Arab Jamahiriya">
        //                 Libyan Arab Jamahiriya
        //               </option>
        //               <option value="Liechtenstein">Liechtenstein</option>
        //               <option value="Lithuania">Lithuania</option>
        //               <option value="Luxembourg">Luxembourg</option>
        //               <option value="Macao">Macao</option>
        //               <option value="Macedonia, The Former Yugoslav Republic of">
        //                 Macedonia, The Former Yugoslav Republic of
        //               </option>
        //               <option value="Madagascar">Madagascar</option>
        //               <option value="Malawi">Malawi</option>
        //               <option value="Malaysia">Malaysia</option>
        //               <option value="Maldives">Maldives</option>
        //               <option value="Mali">Mali</option>
        //               <option value="Malta">Malta</option>
        //               <option value="Marshall Islands">Marshall Islands</option>
        //               <option value="Martinique">Martinique</option>
        //               <option value="Mauritania">Mauritania</option>
        //               <option value="Mauritius">Mauritius</option>
        //               <option value="Mayotte">Mayotte</option>
        //               <option value="Mexico">Mexico</option>
        //               <option value="Micronesia, Federated States of">
        //                 Micronesia, Federated States of
        //               </option>
        //               <option value="Moldova, Republic of">
        //                 Moldova, Republic of
        //               </option>
        //               <option value="Monaco">Monaco</option>
        //               <option value="Mongolia">Mongolia</option>
        //               <option value="Montenegro">Montenegro</option>
        //               <option value="Montserrat">Montserrat</option>
        //               <option value="Morocco">Morocco</option>
        //               <option value="Mozambique">Mozambique</option>
        //               <option value="Myanmar">Myanmar</option>
        //               <option value="Namibia">Namibia</option>
        //               <option value="Nauru">Nauru</option>
        //               <option value="Nepal">Nepal</option>
        //               <option value="Netherlands">Netherlands</option>
        //               <option value="Netherlands Antilles">
        //                 Netherlands Antilles
        //               </option>
        //               <option value="New Caledonia">New Caledonia</option>
        //               <option value="New Zealand">New Zealand</option>
        //               <option value="Nicaragua">Nicaragua</option>
        //               <option value="Niger">Niger</option>
        //               <option value="Nigeria">Nigeria</option>
        //               <option value="Niue">Niue</option>
        //               <option value="Norfolk Island">Norfolk Island</option>
        //               <option value="Northern Mariana Islands">
        //                 Northern Mariana Islands
        //               </option>
        //               <option value="Norway">Norway</option>
        //               <option value="Oman">Oman</option>
        //               <option value="Pakistan">Pakistan</option>
        //               <option value="Palau">Palau</option>
        //               <option value="Palestinian Territory, Occupied">
        //                 Palestinian Territory, Occupied
        //               </option>
        //               <option value="Panama">Panama</option>
        //               <option value="Papua New Guinea">Papua New Guinea</option>
        //               <option value="Paraguay">Paraguay</option>
        //               <option value="Peru">Peru</option>
        //               <option value="Philippines">Philippines</option>
        //               <option value="Pitcairn">Pitcairn</option>
        //               <option value="Poland">Poland</option>
        //               <option value="Portugal">Portugal</option>
        //               <option value="Puerto Rico">Puerto Rico</option>
        //               <option value="Qatar">Qatar</option>
        //               <option value="Reunion">Reunion</option>
        //               <option value="Romania">Romania</option>
        //               <option value="Russian Federation">Russian Federation</option>
        //               <option value="Rwanda">Rwanda</option>
        //               <option value="Saint Helena">Saint Helena</option>
        //               <option value="Saint Kitts and Nevis">
        //                 Saint Kitts and Nevis
        //               </option>
        //               <option value="Saint Lucia">Saint Lucia</option>
        //               <option value="Saint Pierre and Miquelon">
        //                 Saint Pierre and Miquelon
        //               </option>
        //               <option value="Saint Vincent and The Grenadines">
        //                 Saint Vincent and The Grenadines
        //               </option>
        //               <option value="Samoa">Samoa</option>
        //               <option value="San Marino">San Marino</option>
        //               <option value="Sao Tome and Principe">
        //                 Sao Tome and Principe
        //               </option>
        //               <option value="Saudi Arabia">Saudi Arabia</option>
        //               <option value="Senegal">Senegal</option>
        //               <option value="Serbia">Serbia</option>
        //               <option value="Seychelles">Seychelles</option>
        //               <option value="Sierra Leone">Sierra Leone</option>
        //               <option value="Singapore">Singapore</option>
        //               <option value="Slovakia">Slovakia</option>
        //               <option value="Slovenia">Slovenia</option>
        //               <option value="Solomon Islands">Solomon Islands</option>
        //               <option value="Somalia">Somalia</option>
        //               <option value="South Africa">South Africa</option>
        //               <option value="South Georgia and The South Sandwich Islands">
        //                 South Georgia and The South Sandwich Islands
        //               </option>
        //               <option value="Spain">Spain</option>
        //               <option value="Sri Lanka">Sri Lanka</option>
        //               <option value="Sudan">Sudan</option>
        //               <option value="Suriname">Suriname</option>
        //               <option value="Svalbard and Jan Mayen">
        //                 Svalbard and Jan Mayen
        //               </option>
        //               <option value="Swaziland">Swaziland</option>
        //               <option value="Sweden">Sweden</option>
        //               <option value="Switzerland">Switzerland</option>
        //               <option value="Syrian Arab Republic">
        //                 Syrian Arab Republic
        //               </option>
        //               <option value="Taiwan, Province of China">
        //                 Taiwan, Province of China
        //               </option>
        //               <option value="Tajikistan">Tajikistan</option>
        //               <option value="Tanzania, United Republic of">
        //                 Tanzania, United Republic of
        //               </option>
        //               <option value="Thailand">Thailand</option>
        //               <option value="Timor-leste">Timor-leste</option>
        //               <option value="Togo">Togo</option>
        //               <option value="Tokelau">Tokelau</option>
        //               <option value="Tonga">Tonga</option>
        //               <option value="Trinidad and Tobago">
        //                 Trinidad and Tobago
        //               </option>
        //               <option value="Tunisia">Tunisia</option>
        //               <option value="Turkey">Turkey</option>
        //               <option value="Turkmenistan">Turkmenistan</option>
        //               <option value="Turks and Caicos Islands">
        //                 Turks and Caicos Islands
        //               </option>
        //               <option value="Tuvalu">Tuvalu</option>
        //               <option value="Uganda">Uganda</option>
        //               <option value="Ukraine">Ukraine</option>
        //               <option value="United Arab Emirates">
        //                 United Arab Emirates
        //               </option>
        //               <option value="United Kingdom">United Kingdom</option>
        //               <option value="United States">United States</option>
        //               <option value="United States Minor Outlying Islands">
        //                 United States Minor Outlying Islands
        //               </option>
        //               <option value="Uruguay">Uruguay</option>
        //               <option value="Uzbekistan">Uzbekistan</option>
        //               <option value="Vanuatu">Vanuatu</option>
        //               <option value="Venezuela">Venezuela</option>
        //               <option value="Viet Nam">Viet Nam</option>
        //               <option value="Virgin Islands, British">
        //                 Virgin Islands, British
        //               </option>
        //               <option value="Virgin Islands, U.S.">
        //                 Virgin Islands, U.S.
        //               </option>
        //               <option value="Wallis and Futuna">Wallis and Futuna</option>
        //               <option value="Western Sahara">Western Sahara</option>
        //               <option value="Yemen">Yemen</option>
        //               <option value="Zambia">Zambia</option>
        //               <option value="Zimbabwe">Zimbabwe</option>
        //             </select>
        //           </div>
        //           <div className="input smol-input">
        //             <label htmlFor="country">Country</label>
        //             <select name="country">
        //               <option value="Afghanistan">Afghanistan</option>
        //               <option value="Åland Islands">Åland Islands</option>
        //               <option value="Albania">Albania</option>
        //               <option value="Algeria">Algeria</option>
        //               <option value="American Samoa">American Samoa</option>
        //               <option value="Andorra">Andorra</option>
        //               <option value="Angola">Angola</option>
        //               <option value="Anguilla">Anguilla</option>
        //               <option value="Antarctica">Antarctica</option>
        //               <option value="Antigua and Barbuda">
        //                 Antigua and Barbuda
        //               </option>
        //               <option value="Argentina">Argentina</option>
        //               <option value="Armenia">Armenia</option>
        //               <option value="Aruba">Aruba</option>
        //               <option value="Australia">Australia</option>
        //               <option value="Austria">Austria</option>
        //               <option value="Azerbaijan">Azerbaijan</option>
        //               <option value="Bahamas">Bahamas</option>
        //               <option value="Bahrain">Bahrain</option>
        //               <option value="Bangladesh">Bangladesh</option>
        //               <option value="Barbados">Barbados</option>
        //               <option value="Belarus">Belarus</option>
        //               <option value="Belgium">Belgium</option>
        //               <option value="Belize">Belize</option>
        //               <option value="Benin">Benin</option>
        //               <option value="Bermuda">Bermuda</option>
        //               <option value="Bhutan">Bhutan</option>
        //               <option value="Bolivia">Bolivia</option>
        //               <option value="Bosnia and Herzegovina">
        //                 Bosnia and Herzegovina
        //               </option>
        //               <option value="Botswana">Botswana</option>
        //               <option value="Bouvet Island">Bouvet Island</option>
        //               <option value="Brazil">Brazil</option>
        //               <option value="British Indian Ocean Territory">
        //                 British Indian Ocean Territory
        //               </option>
        //               <option value="Brunei Darussalam">Brunei Darussalam</option>
        //               <option value="Bulgaria">Bulgaria</option>
        //               <option value="Burkina Faso">Burkina Faso</option>
        //               <option value="Burundi">Burundi</option>
        //               <option value="Cambodia">Cambodia</option>
        //               <option value="Cameroon">Cameroon</option>
        //               <option value="Canada">Canada</option>
        //               <option value="Cape Verde">Cape Verde</option>
        //               <option value="Cayman Islands">Cayman Islands</option>
        //               <option value="Central African Republic">
        //                 Central African Republic
        //               </option>
        //               <option value="Chad">Chad</option>
        //               <option value="Chile">Chile</option>
        //               <option value="China">China</option>
        //               <option value="Christmas Island">Christmas Island</option>
        //               <option value="Cocos (Keeling) Islands">
        //                 Cocos (Keeling) Islands
        //               </option>
        //               <option value="Colombia">Colombia</option>
        //               <option value="Comoros">Comoros</option>
        //               <option value="Congo">Congo</option>
        //               <option value="Congo, The Democratic Republic of The">
        //                 Congo, The Democratic Republic of The
        //               </option>
        //               <option value="Cook Islands">Cook Islands</option>
        //               <option value="Costa Rica">Costa Rica</option>
        //               <option value="Cote D'ivoire">Cote D'ivoire</option>
        //               <option value="Croatia">Croatia</option>
        //               <option value="Cuba">Cuba</option>
        //               <option value="Cyprus">Cyprus</option>
        //               <option value="Czech Republic">Czech Republic</option>
        //               <option value="Denmark">Denmark</option>
        //               <option value="Djibouti">Djibouti</option>
        //               <option value="Dominica">Dominica</option>
        //               <option value="Dominican Republic">Dominican Republic</option>
        //               <option value="Ecuador">Ecuador</option>
        //               <option value="Egypt">Egypt</option>
        //               <option value="El Salvador">El Salvador</option>
        //               <option value="Equatorial Guinea">Equatorial Guinea</option>
        //               <option value="Eritrea">Eritrea</option>
        //               <option value="Estonia">Estonia</option>
        //               <option value="Ethiopia">Ethiopia</option>
        //               <option value="Falkland Islands (Malvinas)">
        //                 Falkland Islands (Malvinas)
        //               </option>
        //               <option value="Faroe Islands">Faroe Islands</option>
        //               <option value="Fiji">Fiji</option>
        //               <option value="Finland">Finland</option>
        //               <option value="France">France</option>
        //               <option value="French Guiana">French Guiana</option>
        //               <option value="French Polynesia">French Polynesia</option>
        //               <option value="French Southern Territories">
        //                 French Southern Territories
        //               </option>
        //               <option value="Gabon">Gabon</option>
        //               <option value="Gambia">Gambia</option>
        //               <option value="Georgia">Georgia</option>
        //               <option value="Germany">Germany</option>
        //               <option value="Ghana">Ghana</option>
        //               <option value="Gibraltar">Gibraltar</option>
        //               <option value="Greece">Greece</option>
        //               <option value="Greenland">Greenland</option>
        //               <option value="Grenada">Grenada</option>
        //               <option value="Guadeloupe">Guadeloupe</option>
        //               <option value="Guam">Guam</option>
        //               <option value="Guatemala">Guatemala</option>
        //               <option value="Guernsey">Guernsey</option>
        //               <option value="Guinea">Guinea</option>
        //               <option value="Guinea-bissau">Guinea-bissau</option>
        //               <option value="Guyana">Guyana</option>
        //               <option value="Haiti">Haiti</option>
        //               <option value="Heard Island and Mcdonald Islands">
        //                 Heard Island and Mcdonald Islands
        //               </option>
        //               <option value="Holy See (Vatican City State)">
        //                 Holy See (Vatican City State)
        //               </option>
        //               <option value="Honduras">Honduras</option>
        //               <option value="Hong Kong">Hong Kong</option>
        //               <option value="Hungary">Hungary</option>
        //               <option value="Iceland">Iceland</option>
        //               <option value="India">India</option>
        //               <option value="Indonesia">Indonesia</option>
        //               <option value="Iran, Islamic Republic of">
        //                 Iran, Islamic Republic of
        //               </option>
        //               <option value="Iraq">Iraq</option>
        //               <option value="Ireland">Ireland</option>
        //               <option value="Isle of Man">Isle of Man</option>
        //               <option value="Israel">Israel</option>
        //               <option value="Italy">Italy</option>
        //               <option value="Jamaica">Jamaica</option>
        //               <option value="Japan">Japan</option>
        //               <option value="Jersey">Jersey</option>
        //               <option value="Jordan">Jordan</option>
        //               <option value="Kazakhstan">Kazakhstan</option>
        //               <option value="Kenya">Kenya</option>
        //               <option value="Kiribati">Kiribati</option>
        //               <option value="Korea, Democratic People's Republic of">
        //                 Korea, Democratic People's Republic of
        //               </option>
        //               <option value="Korea, Republic of">Korea, Republic of</option>
        //               <option value="Kuwait">Kuwait</option>
        //               <option value="Kyrgyzstan">Kyrgyzstan</option>
        //               <option value="Lao People's Democratic Republic">
        //                 Lao People's Democratic Republic
        //               </option>
        //               <option value="Latvia">Latvia</option>
        //               <option value="Lebanon">Lebanon</option>
        //               <option value="Lesotho">Lesotho</option>
        //               <option value="Liberia">Liberia</option>
        //               <option value="Libyan Arab Jamahiriya">
        //                 Libyan Arab Jamahiriya
        //               </option>
        //               <option value="Liechtenstein">Liechtenstein</option>
        //               <option value="Lithuania">Lithuania</option>
        //               <option value="Luxembourg">Luxembourg</option>
        //               <option value="Macao">Macao</option>
        //               <option value="Macedonia, The Former Yugoslav Republic of">
        //                 Macedonia, The Former Yugoslav Republic of
        //               </option>
        //               <option value="Madagascar">Madagascar</option>
        //               <option value="Malawi">Malawi</option>
        //               <option value="Malaysia">Malaysia</option>
        //               <option value="Maldives">Maldives</option>
        //               <option value="Mali">Mali</option>
        //               <option value="Malta">Malta</option>
        //               <option value="Marshall Islands">Marshall Islands</option>
        //               <option value="Martinique">Martinique</option>
        //               <option value="Mauritania">Mauritania</option>
        //               <option value="Mauritius">Mauritius</option>
        //               <option value="Mayotte">Mayotte</option>
        //               <option value="Mexico">Mexico</option>
        //               <option value="Micronesia, Federated States of">
        //                 Micronesia, Federated States of
        //               </option>
        //               <option value="Moldova, Republic of">
        //                 Moldova, Republic of
        //               </option>
        //               <option value="Monaco">Monaco</option>
        //               <option value="Mongolia">Mongolia</option>
        //               <option value="Montenegro">Montenegro</option>
        //               <option value="Montserrat">Montserrat</option>
        //               <option value="Morocco">Morocco</option>
        //               <option value="Mozambique">Mozambique</option>
        //               <option value="Myanmar">Myanmar</option>
        //               <option value="Namibia">Namibia</option>
        //               <option value="Nauru">Nauru</option>
        //               <option value="Nepal">Nepal</option>
        //               <option value="Netherlands">Netherlands</option>
        //               <option value="Netherlands Antilles">
        //                 Netherlands Antilles
        //               </option>
        //               <option value="New Caledonia">New Caledonia</option>
        //               <option value="New Zealand">New Zealand</option>
        //               <option value="Nicaragua">Nicaragua</option>
        //               <option value="Niger">Niger</option>
        //               <option value="Nigeria">Nigeria</option>
        //               <option value="Niue">Niue</option>
        //               <option value="Norfolk Island">Norfolk Island</option>
        //               <option value="Northern Mariana Islands">
        //                 Northern Mariana Islands
        //               </option>
        //               <option value="Norway">Norway</option>
        //               <option value="Oman">Oman</option>
        //               <option value="Pakistan">Pakistan</option>
        //               <option value="Palau">Palau</option>
        //               <option value="Palestinian Territory, Occupied">
        //                 Palestinian Territory, Occupied
        //               </option>
        //               <option value="Panama">Panama</option>
        //               <option value="Papua New Guinea">Papua New Guinea</option>
        //               <option value="Paraguay">Paraguay</option>
        //               <option value="Peru">Peru</option>
        //               <option value="Philippines">Philippines</option>
        //               <option value="Pitcairn">Pitcairn</option>
        //               <option value="Poland">Poland</option>
        //               <option value="Portugal">Portugal</option>
        //               <option value="Puerto Rico">Puerto Rico</option>
        //               <option value="Qatar">Qatar</option>
        //               <option value="Reunion">Reunion</option>
        //               <option value="Romania">Romania</option>
        //               <option value="Russian Federation">Russian Federation</option>
        //               <option value="Rwanda">Rwanda</option>
        //               <option value="Saint Helena">Saint Helena</option>
        //               <option value="Saint Kitts and Nevis">
        //                 Saint Kitts and Nevis
        //               </option>
        //               <option value="Saint Lucia">Saint Lucia</option>
        //               <option value="Saint Pierre and Miquelon">
        //                 Saint Pierre and Miquelon
        //               </option>
        //               <option value="Saint Vincent and The Grenadines">
        //                 Saint Vincent and The Grenadines
        //               </option>
        //               <option value="Samoa">Samoa</option>
        //               <option value="San Marino">San Marino</option>
        //               <option value="Sao Tome and Principe">
        //                 Sao Tome and Principe
        //               </option>
        //               <option value="Saudi Arabia">Saudi Arabia</option>
        //               <option value="Senegal">Senegal</option>
        //               <option value="Serbia">Serbia</option>
        //               <option value="Seychelles">Seychelles</option>
        //               <option value="Sierra Leone">Sierra Leone</option>
        //               <option value="Singapore">Singapore</option>
        //               <option value="Slovakia">Slovakia</option>
        //               <option value="Slovenia">Slovenia</option>
        //               <option value="Solomon Islands">Solomon Islands</option>
        //               <option value="Somalia">Somalia</option>
        //               <option value="South Africa">South Africa</option>
        //               <option value="South Georgia and The South Sandwich Islands">
        //                 South Georgia and The South Sandwich Islands
        //               </option>
        //               <option value="Spain">Spain</option>
        //               <option value="Sri Lanka">Sri Lanka</option>
        //               <option value="Sudan">Sudan</option>
        //               <option value="Suriname">Suriname</option>
        //               <option value="Svalbard and Jan Mayen">
        //                 Svalbard and Jan Mayen
        //               </option>
        //               <option value="Swaziland">Swaziland</option>
        //               <option value="Sweden">Sweden</option>
        //               <option value="Switzerland">Switzerland</option>
        //               <option value="Syrian Arab Republic">
        //                 Syrian Arab Republic
        //               </option>
        //               <option value="Taiwan, Province of China">
        //                 Taiwan, Province of China
        //               </option>
        //               <option value="Tajikistan">Tajikistan</option>
        //               <option value="Tanzania, United Republic of">
        //                 Tanzania, United Republic of
        //               </option>
        //               <option value="Thailand">Thailand</option>
        //               <option value="Timor-leste">Timor-leste</option>
        //               <option value="Togo">Togo</option>
        //               <option value="Tokelau">Tokelau</option>
        //               <option value="Tonga">Tonga</option>
        //               <option value="Trinidad and Tobago">
        //                 Trinidad and Tobago
        //               </option>
        //               <option value="Tunisia">Tunisia</option>
        //               <option value="Turkey">Turkey</option>
        //               <option value="Turkmenistan">Turkmenistan</option>
        //               <option value="Turks and Caicos Islands">
        //                 Turks and Caicos Islands
        //               </option>
        //               <option value="Tuvalu">Tuvalu</option>
        //               <option value="Uganda">Uganda</option>
        //               <option value="Ukraine">Ukraine</option>
        //               <option value="United Arab Emirates">
        //                 United Arab Emirates
        //               </option>
        //               <option value="United Kingdom">United Kingdom</option>
        //               <option value="United States">United States</option>
        //               <option value="United States Minor Outlying Islands">
        //                 United States Minor Outlying Islands
        //               </option>
        //               <option value="Uruguay">Uruguay</option>
        //               <option value="Uzbekistan">Uzbekistan</option>
        //               <option value="Vanuatu">Vanuatu</option>
        //               <option value="Venezuela">Venezuela</option>
        //               <option value="Viet Nam">Viet Nam</option>
        //               <option value="Virgin Islands, British">
        //                 Virgin Islands, British
        //               </option>
        //               <option value="Virgin Islands, U.S.">
        //                 Virgin Islands, U.S.
        //               </option>
        //               <option value="Wallis and Futuna">Wallis and Futuna</option>
        //               <option value="Western Sahara">Western Sahara</option>
        //               <option value="Yemen">Yemen</option>
        //               <option value="Zambia">Zambia</option>
        //               <option value="Zimbabwe">Zimbabwe</option>
        //             </select>
        //           </div>
    );
};

export default CreateEvent;
