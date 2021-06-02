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
                                    const b64 = reader.result
                                    fetch('http://api.techcircuit.co/image/upload', {
                                        
                                        // Adding method type
                                        method: "POST",
                                        
                                        // Adding body or contents to send
                                        body: JSON.stringify({
                                            b64
                                        }),
                                        
                                        // Adding headers to the request
                                        headers: {
                                            "Content-type": "application/json; charset=UTF-8"
                                        }
                                    })
                                    .then(response => {
                                        console.log(response)
                                        console.log(response.status)
                                        console.log(response.link)
                                    })
                                    .catch(error => console.log(error));
                                }
                                // if(inputFile.name.endsWith('.png') || inputFile.name.endsWith('.jpg') || inputFile.name.endsWith('.jpeg')) {
                                //     let file = inputFile;
                                //     var storage = firebase.storage();
                                //     var storageRef = storage.ref();
                                //     var uploadTask = storageRef.child('folder/' + file.name).put(file);
                        
                                //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                //         (snapshot) => {
                                //                 var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                                //                 console.log(progress)
                                //             }, (error) => {
                                //                 console.log(error)
                                //                 throw error
                                //             },() => {
                                //             uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                                //                 cb(url, { title: file.name })
                                //             })
                                //         }
                                //     ) 
                                // }
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