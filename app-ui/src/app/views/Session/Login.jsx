import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Formik } from "formik";
import { validationSchema } from '../../utils/SessionValidation';
import { styled } from '@mui/material';
import useAuth from '../../hooks/useAuth'
import { Alert } from '../../component/CommonComponent/Alert';
import { LoadingButton } from "@mui/lab";
const Link = styled('span')(() => ({
    color: "blue"
}));
const initialValues = {
    email: "",
    password: "",
};

function Login({ handleChanges }) {
    const { login } = useAuth()
    const handleSubmit = async (values, { setSubmitting }) => {
        await login(values, setSubmitting)
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, action) => {
                    handleSubmit(values, action)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
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
                            Sign in
                        </Typography>
                        <Alert />
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type='email'
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                helperText={touched.email && errors.email}
                                error={Boolean(errors.email && touched.email)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="current-password"
                                onBlur={handleBlur}
                                value={values.password}
                                onChange={handleChange}
                                helperText={touched.password && errors.password}
                                error={Boolean(errors.password && touched.password)}
                            />
                            <LoadingButton
                                type="submit"
                                loading={isSubmitting}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </LoadingButton>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={handleChanges} sx={{ cursor: "pointer" }} variant="body2">
                                        {"Don't have an account? Sign Up"}
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
export default Login;