import React, { useEffect, useState } from 'react';
import { Box, Paper, styled } from '@mui/material';
import { Document, Page } from 'react-pdf';

const ThumbnailPaper = styled(Paper)(({ isSelected }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    alignItems: 'center',
    padding: '1px',
    margin: '2px',
    marginBottom: '4px',
    border: isSelected ? '2px solid #1E40AF' : '1px solid #D1D5DB',
    backgroundColor: isSelected ? '#7F9CF5' : '#F3F4F6',
    '&:hover': {
        boxShadow: isSelected ? '0 0 8px 0px rgba(30, 64, 175, 0.5)' : '0 0 8px 0px rgba(209, 213, 219, 0.5)',
        transform: 'scale(1.01)',
    },
}));

const BadgeBox = styled(Box)(({ isSelected }) => ({
    position: 'absolute',
    top: '4px',
    right: '4px',
    padding: '4px',
    fontSize: '0.75rem',
    backgroundColor: '#1E40AF',
    color: '#ffffff',
    borderRadius: '30%',
    zIndex: '100',
}));

const PdfViewPages = ({ pageNumber, isSelected, onClick, selectedPages, screenWidth }) => {
    const pageWidth = screenWidth < 600 ? screenWidth : 800;

    return (
        <>
            <ThumbnailPaper isSelected={isSelected} onClick={onClick}>
                {isSelected && (
                    <BadgeBox>
                        {selectedPages.indexOf(pageNumber) + 1}
                    </BadgeBox>
                )}

                <Page pageNumber={pageNumber} width={pageWidth} />
            </ThumbnailPaper>
        </>
    );
};

const PdfPages = ({ pdf, noPages, selectedPages, pageSelection, setNoPages }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onLoadPdf = ({ numPages }) => {
        setNoPages(numPages);
    };

    return (
        <>
            <Document file={pdf} onLoadSuccess={onLoadPdf}>
                {[...Array(noPages)]?.map((_, index) => {
                    return (
                        <PdfViewPages
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            selectedPages={selectedPages}
                            isSelected={selectedPages.includes(index + 1)}
                            onClick={() => pageSelection(index + 1)}
                            screenWidth={screenWidth}
                        />
                    );
                })}
            </Document>
        </>
    );
};

export default PdfPages;
