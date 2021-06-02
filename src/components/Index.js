import React, { Component } from 'react';
import { Editor } from "@tinymce/tinymce-react";

class Index extends Component {
    render(){
        return (
            <>
                <br></br><br></br><br></br>
                 <Editor
                    apiKey="6qe6iqm7o54kawhl9yap1pljb09c0lpqrnf0ehytebrqf6jm"
                    init={{
                        height: 500,
                        selector: 'textarea', 
                        plugins: 'image code',
                        toolbar: 'undo redo | link image',
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        file_picker_callback: function (cb, value, meta) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.onchange = function () {
                                var inputFile = this.files[0];
                                let reader = new FileReader()
                                reader.readAsDataURL(inputFile)
                                reader.onload = () => {
                                    const b64 = reader.result.split('base64,')[1]
                                    fetch('https://techcircuit.herokuapp.com/image/upload', {
                                        
                                        // Adding method type
                                        method: "POST",
                                        
                                        // Adding body or contents to send
                                        body: JSON.stringify({
                                            b64
                                        }),
                                        
                                        // Adding headers to the request
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8",
                                            "Access-Control-Allow-Origin": "*"
                                        }
                                    })
                                    .then(async (response) => {
                                        const resp = await response.json()
                                        cb(resp.link, { title: inputFile.name })
                                    })
                                    .catch(error => console.log(error));
                                }
                            };

                            input.click();
                        },
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        object_resizing: true
                    }}
                />
            </>
        )
    }
}

export default Index;