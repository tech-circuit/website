import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextBox = () => {
    const handleEditorChange = (e) => {
      localStorage.setItem("content", e.target.getContent())
    }

    return (
      <>
        <div className="textbox-wrapper">
          <Editor
            onChange={handleEditorChange}
            apiKey="6qe6iqm7o54kawhl9yap1pljb09c0lpqrnf0ehytebrqf6jm"
            init={{
              skin_url: `${process.env.PUBLIC_URL}/assets/textbox-custom`,
              min_height: 316,
              max_height: 773,
              width: '100%',
              menubar: false,
              statusbar: false,
              selector: "textarea",
              plugins: "image code autoresize",
              toolbar: "bold italic underline strike | alignleft aligncenter alignright | image",
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: function (cb, value, meta) {
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.onchange = function () {
                  var inputFile = this.files[0];
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
                        cb(resp.link, { title: inputFile.name });
                      })
                      .catch((error) => console.log(error));
                  };
                };

                input.click();
              },
              content_style:
                `
                @import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900'); 
                body { font-family: Poppins }
                #tinymce { color: #747474; }
                #mce-toolbar-grp {
                    background-color: #000 !important; /* uses !important or override .mce-panel background-color/image */
                    background-image: none !important;
                }
                `,
              object_resizing: true,
            }}
          />
        </div>
      </>
    );
}

export default TextBox;
