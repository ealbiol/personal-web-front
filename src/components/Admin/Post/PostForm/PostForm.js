// COMPONENT POST FORM
import React, { useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import {ENV} from "../../../../utils";
import { initialValues, validationSchema } from "./PostForm.form";
import "./PostForm.scss";

const postController = new Post();

export function PostForm(props) {

    const { onClose, onReload, post } = props;

    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(post),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (post) {
                    // if post state has content: UPDATE/PATCH
                    await postController.updatePost(accessToken, post._id, formValue);
                } else {
                    // if post state is empty: CREATE/POST
                    await postController.createPost(accessToken, formValue);
                }

                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    })

    //Function to get miniature
    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.miniature;
        } else if (formik.values.miniature){
            return `${ENV.BASE_PATH}/${formik.values.miniature}`
        }
        return null;
    }


    return (
        <Form className='post-form' onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
                <Form.Input
                    name="title"
                    placeholder="Post Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Form.Input
                    name="path"
                    placeholder="Post Path"
                    onChange={formik.handleChange}
                    value={formik.values.path}
                    error={formik.errors.path}
                />
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
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
                initialValue={formik.values.content}
                onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
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

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {post ? "Update Post" : "Create Post"}
            </Form.Button>
        </Form>
    )
}
