import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextBox = () => {
    const handleEditorChange = (e) => {
      localStorage.setItem("content", e.target.getContent())
    }

    return (
      <>
        <div className="textbox-wrapper">
          <input type="file" id="imgupload" style={{ display: 'none' }}/> 
          <Editor
            onChange={handleEditorChange}
            apiKey="6qe6iqm7o54kawhl9yap1pljb09c0lpqrnf0ehytebrqf6jm"
            init={{
              setup: function (editor) {
                editor.ui.registry.addButton('imageUploadButton', {
                  icon: 'image',
                  tooltip: 'Insert/edit image',
                  onAction: function (_) {
                    const uploadElement = document.getElementById("imgupload")
                    uploadElement.click()
                    uploadElement.onchange = () => {
                      const inputFile = uploadElement.files[0]
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
                            editor.insertContent(`<img title="${inputFile.name}" src="${resp.link}" alt="" />`);
                          })
                          .catch((error) => console.log(error));
                      };
                    }
                  }
                })
              },
              skin_url: `${process.env.PUBLIC_URL}/assets/textbox-custom`,
              min_height: 250,
              max_height: 773,
              width: '100%',
              menubar: false,
              statusbar: false,
              selector: "textarea",
              plugins: "image code autoresize",
              toolbar: "bold italic underline strike | alignleft aligncenter alignright | imageUploadButton",
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
