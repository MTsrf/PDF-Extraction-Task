import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import { styled } from '@mui/material';
import { validationSignupSchema } from '../../utils/SessionValidation';
import { Alert } from '../../component/CommonComponent/Alert';
import useAuth from '../../hooks/useAuth';

const Link = styled('span')(() => ({
    color: "blue"
}));

const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
};

function Register({ handleChanges }) {
    const { register } = useAuth()
    const handleSubmit = async (values, { setSubmitting }) => {
        await register(values, setSubmitting)
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSignupSchema}
                onSubmit={(values, action) => {
                    handleSubmit(values, action)
                }}
            >
                {({
                    values,
                    handleChange,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (


                    <Box
                        sx={{
                            my: 13,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Alert />
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        type="text"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        onBlur={handleBlur}
                                        value={values.name}
                                        onChange={handleChange}
                                        helperText={touched.name && errors.name}
                                        error={Boolean(errors.name && touched.name)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        type='email'
                                        name="email"
                                        autoComplete="email-address"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange}
                                        helperText={touched.email && errors.email}
                                        error={Boolean(errors.email && touched.email)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type='number'
                                        id="phone_number"
                                        label="Phone Number"
                                        name="phone_number"
                                        autoComplete="phone_number"
                                        onBlur={handleBlur}
                                        value={values.phone_number}
                                        onChange={handleChange}
                                        helperText={touched.phone_number && errors.phone_number}
                                        error={Boolean(errors.phone_number && touched.phone_number)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onBlur={handleBlur}
                                        value={values.password}
                                        onChange={handleChange}
                                        helperText={touched.password && errors.password}
                                        error={Boolean(errors.password && touched.password)}
                                    />
                                </Grid>
                            </Grid>
                            <LoadingButton
                                type="submit"
                                loading={isSubmitting}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </LoadingButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={handleChanges} sx={{ cursor: "pointer" }} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )}
            </Formik>
        </>
    );
}

export default Register