import { Backdrop, Box, CircularProgress } from '@mui/material';


const LoadingModelComponent = ({ isLoading }) => {
    return (

        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <Box>
                    <CircularProgress className="circleProgress" />
                </Box>

            </Backdrop>
        </div>
    );
};

export default LoadingModelComponent;
