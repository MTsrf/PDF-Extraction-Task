import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { Icon, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogContent = styled('div')(({ theme, isActive }) => ({
    margin: "0px",
    padding: "0px"
}))
const Heading = styled('h6')(({ theme, titleColor }) => ({
    margin: 0,
    color: titleColor !== "" ? 'white' : "black",
    marginTop: '2px',
    fontSize: '20px',
    fontWeight: '500',
    marginBottom: "5px"
}));
const PopupHeader = styled('div')(({ theme, titleColor }) => ({
    cursor: "pointer",
    backgroundColor: titleColor !== "" ? titleColor : "#d3d3d370",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px"
}))



function BootstrapDialogTitle(props) {
    const { children, onClose, titleColor, ...other } = props;
    return (
        <PopupHeader sx={{ m: 0 }} {...other} titleColor={titleColor}>
            <Heading titleColor={titleColor}>
                {children}
            </Heading>
            <IconButton onClick={onClose} sx={{ color: titleColor !== "" ? 'white' : "black" }}>
                <CloseIcon />
            </IconButton>
        </PopupHeader>
    );
}


export const ModalComponent = (props) => {
    const { open, handleClose = () => { }, width = '500px', children, fullScreen = "false", title = "", titleColor = "" } = props
    const sxStyle = {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: width, // Set your width here
            },
        },
    }
    return (
        <>
            <BootstrapDialog
                fullScreen={fullScreen === "true" ? true : false}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={fullScreen === "false" ? sxStyle : ""}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} titleColor={titleColor}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent >
                    {children}
                </DialogContent>
            </BootstrapDialog>

        </>
    )
}
