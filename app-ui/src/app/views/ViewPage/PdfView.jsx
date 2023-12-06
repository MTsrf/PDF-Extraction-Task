import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PdfPages from './PdfPages';
import { Box, Button, CardHeader, Grid, Paper, styled } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { AlertService } from '../../service/alertService';
import { uploadPdfService } from '../../service/pdfService';
import { useSnackbar } from 'notistack'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import LoadingModelComponent from '../../component/CommonComponent/LoadingModelComponent';

const MainCard = styled(Paper)({
    width: '100%',
    height: '700px',
    overflow: 'auto',
    position: 'relative',
    '& body': {
        overflow: 'hidden',
    },
});

const StickyCardHeader = styled(CardHeader)({
    position: 'sticky',
    top: 0,
    zIndex: 1000,
});

const PdfView = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { promiseInProgress } = usePromiseTracker()
    const { state } = useLocation();
    const navigate = useNavigate();
    const [noPages, setNoPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);

    const pageSelection = pageNumber => {
        if (selectedPages.includes(pageNumber)) {
            setSelectedPages(selectedPages.filter(page => page !== pageNumber));
        } else {
            setSelectedPages([...selectedPages, pageNumber]);
        }
    };

    const pdfExtract = async () => {
        const formData = {
            selectedPages: selectedPages
        }
        try {
            const resp = await uploadPdfService.extractPdf(state?.data?._id, formData)
            if (resp.statusCode === 200) {
                enqueueSnackbar("Successfully Extracted", { variant: "success" })
                navigate("/view/default")
            }
        } catch (error) {
            AlertService.error(error, { keepAfterRouteChange: true, autoClose: true })
        }
    }

    return (
        <>
            <MainCard>
                <LoadingModelComponent isLoading={promiseInProgress} />
                <StickyCardHeader
                    title="Pdf-Viewer"
                    sx={{ p: 2, mb: 1, bgcolor: '#e0e0e0' }}
                    action={
                        selectedPages?.length ? (
                            <Button
                                variant="outlined"
                                onClick={() => trackPromise(pdfExtract())}
                                startIcon={<FileUpload />}
                            >
                                Pdf Export
                            </Button>
                        ) : (
                            <></>
                        )
                    }
                />
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={12} display={'flex'} justifyContent={'center'}>
                        <Box>
                            <PdfPages
                                pdf={state?.data?.path}
                                noPages={noPages}
                                selectedPages={selectedPages}
                                pageSelection={pageSelection}
                                setNoPages={setNoPages}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default PdfView;
