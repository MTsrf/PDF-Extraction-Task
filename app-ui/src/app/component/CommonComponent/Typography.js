import { Box, styled } from '@mui/material';
import clsx from 'clsx';

const StyledBox = styled(Box)(({ theme, texttransformstyle, ellipsis }) => ({
    textTransform: texttransformstyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
}));

export const Paragraph = ({ children, className, ellipsis, textTransform, ...props }) => {
    return (
        <StyledBox
            texttransformstyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || '']: true,
            })}
            component="p"
            mb={0}
            mt={0}
            fontSize="14px"
            {...props}
        >
            {children}
        </StyledBox>
    );
};
