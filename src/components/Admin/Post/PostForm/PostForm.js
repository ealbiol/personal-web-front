// COMPONENT POST FORM
import React, { useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import "./PostForm.scss";

export function PostForm() {

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        console.log(file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    })

    //Function to get miniature
    const getMiniature = () => {
        return null;
    }


    return (
        <Form className='post-form'>
            <Form.Group widths="equal">
                <Form.Input name="tile" placeholder="Post Title" />
                <Form.Input name="path" placeholder="Post Path" />
            </Form.Group>


            {/*Post Editor*/}
            <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
      />


            <div className='post-form__miniature' {...getRootProps()}>
                <input {...getInputProps()} />
                {/*if getMiniature gives back content we take it*/}
                {getMiniature() ? (
                    <Image size="small" src={getMiniature()} />
                ) : (
                    //and if not we get image
                    <div>
                        <span>Drop your image</span>
                    </div>
                )}
            </div>

            <Form.Button type="submit" primary fluid>
                Create Post
            </Form.Button>
        </Form>
    )
}
