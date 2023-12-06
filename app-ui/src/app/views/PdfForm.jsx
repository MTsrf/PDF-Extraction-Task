import { Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { uploadPdfService } from '../service/pdfService';
import { AlertService } from '../service/alertService';
import { useSnackbar } from 'notistack';
import { trackPromise } from 'react-promise-tracker';

const REQUIRED = "Field is required"
const validationSchema = Yup.object().shape({
    file: Yup.mixed()
        .required(REQUIRED)
        .test('fileType', 'Only PDF files are allowed', (value) => {
            if (value) {
                return value && value.type === 'application/pdf';
            }
            return true;
        }),
});
const PdfForm = ({ onClose }) => {
    const { enqueueSnackbar } = useSnackbar()
    const initialStates = {
        file: ""
    }

    const formSubmit = async (formData) => {
        try {
            const resp = await uploadPdfService.addPdf(formData)
            if (resp.statusCode === 200) {
                enqueueSnackbar("Successfully Uploaded", { variant: "success" })
                onClose()
            }
        } catch (error) {
            AlertService.error(error, { keepAfterRouteChange: true, autoClose: true })
        }
    }
    return (
        <>
            <Formik
                initialValues={initialStates}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const { file } = values
                    const formData = new FormData()
                    formData.append("file", file)
                    trackPromise(formSubmit(formData))
                }}
            >
                {(formik) => (
                    <Form>
                        <Grid container spacing={1} p={2}>
                            <Grid item xl={12} xs={12}>
                                <Button
                                    type='button'
                                    component="label"
                                    style={{ display: "flex", }}
                                    variant="outlined"
                                    fullWidth
                                >
                                    {" "}
                                    {formik?.values.file.name ? formik?.values.file?.name : "Please Choose File"}
                                    <input
                                        type="file"
                                        onBlur={() => {
                                            formik.setFieldTouched(`file`, true)
                                        }}
                                        hidden
                                        style={{ margin: "0", padding: "0" }}
                                        onChange={(e) => {
                                            formik.setFieldValue(`file`, e.target.files[0]);
                                        }}
                                        onClick={(e) => e.target.value = ""}
                                    />
                                    <Button size='small' type='button' style={{ margin: "0 0 0 0", padding: "0" }}
                                        onClick={() => formik.setFieldValue(`file`, "")}
                                    >
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </Button>
                                </Button>
                                <div>
                                    {formik.touched.file && formik.errors.file && (<p style={{ marginLeft: "13px", fontSize: "12px", fontWeight: 450, color: "#FF0000" }}>{formik.errors.file}</p>)}
                                </div>
                            </Grid>

                            <Grid item xl={12} xs={12}>
                                <Button
                                    color="primary"
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    <IconButton>
                                        <SendIcon />
                                    </IconButton>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default PdfForm
