import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    styled,
    Hidden,
} from '@mui/material'
import { Paragraph } from '../../component/CommonComponent/Typography';
import EditIcon from '@mui/icons-material/Edit';
import LoadingModelComponent from '../../component/CommonComponent/LoadingModelComponent';
import { uploadPdfService } from '../../service/pdfService';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import { AlertService } from '../../service/alertService';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ModalComponent } from '../../component/Modal';
import PdfForm from '../PdfForm';
import { useNavigate } from 'react-router-dom';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

const CardHeader = styled(Box)(() => ({
    display: "flex",
    paddingLeft: "24px",
    paddingRight: "24px",
    marginBottom: "12px",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
    fontSize: "1rem",
    fontWeight: "500",
    textTransform: "capitalize",
}));

const ProductTable = styled(Table)(({ theme }) => ({
    minWidth: 400,
    width: "100%",
    maxWidth: "100%",
    whiteSpace: "pre",
    overflowX: "auto",
    "& small": {
        width: 50,
        height: 15,
        borderRadius: 500,
        boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
    },
    "& td": { borderBottom: "none" },
    "& td:first-of-type": { paddingLeft: "16px !important" },
    [theme.breakpoints.down('sm')]: {
        minWidth: "100%",
        overflowX: "auto",
    },
}));

const DataList = () => {
    const navigate = useNavigate()
    const { promiseInProgress } = usePromiseTracker()
    const [IsOpen, setIsOpen] = useState(false)
    const [pdfList, setPdfList] = useState([])
    const [openExtractList, setOpenExtractList] = useState(false)

    useEffect(() => {
        trackPromise(fetchFile())
    }, [])

    const fetchFile = async () => {
        try {
            const resp = await uploadPdfService.getAll()
            setPdfList(resp)
        } catch (error) {
            AlertService.error(error, { keepAfterRouteChange: true, autoClose: true })
        }
    }
    const formHandle = () => {
        setIsOpen(false)
        trackPromise(fetchFile())
    }

    return (
        <>
            <Grid container>
                <Grid item xl={12}>
                    <LoadingModelComponent isLoading={promiseInProgress} />
                    <Card elevation={1} sx={{ pt: "20px", mb: 3, overflowX: "auto" }}>
                        <CardHeader>
                            <Title> {openExtractList ? "Extracted List" : "Upload-PDF List"}</Title>
                            <Box display={"flex"} gap={"3px"}>
                                <Button onClick={() => setOpenExtractList(!openExtractList)} variant="outlined" startIcon={<SwitchLeftIcon />}>
                                    {openExtractList ? "Upload-PDF List" : "Extracted List"}
                                </Button>
                                <Button onClick={() => setIsOpen(true)} variant="outlined" startIcon={<FileUploadIcon />}>
                                    Upload Pdf
                                </Button>
                            </Box>
                        </CardHeader>
                        {openExtractList ? (
                            <Box overflow="auto">
                                <ProductTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                                File Name
                                            </TableCell>
                                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {pdfList?.pdf?.map((item, index) => item?.IsExtract && (
                                            <TableRow key={index} hover>
                                                <TableCell
                                                    colSpan={4}
                                                    align="left"
                                                    sx={{ px: 0, textTransform: "capitalize" }}
                                                >
                                                    <Box display="flex" alignItems="center">
                                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                                            {item.name}
                                                        </Paragraph>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ px: 0 }} colSpan={2}>
                                                    <IconButton onClick={() => navigate("/view/pdf", { state: { data: item } })}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </ProductTable>
                            </Box>
                        ) : (
                            <Box overflow="auto">
                                <ProductTable>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                                File Name
                                            </TableCell>
                                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {pdfList?.pdf?.map((item, index) => !item?.IsExtract && (
                                            <TableRow key={index} hover>
                                                <TableCell
                                                    colSpan={4}
                                                    align="left"
                                                    sx={{ px: 0, textTransform: "capitalize" }}
                                                >
                                                    <Box display="flex" alignItems="center">
                                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                                            {item.name}
                                                        </Paragraph>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ px: 0 }} colSpan={2}>
                                                    <IconButton onClick={() => navigate("/view/pdf", { state: { data: item } })}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </ProductTable>
                            </Box>
                        )}
                    </Card>
                </Grid>
            </Grid>
            <ModalComponent open={IsOpen} handleClose={() => setIsOpen(false)} title={"PDF - Upload Form"}>
                <PdfForm onClose={formHandle} />
            </ModalComponent>
        </>
    )
}

export default DataList;
