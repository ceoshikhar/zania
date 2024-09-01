import { CSSProperties, useMemo } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

import { useApp } from "../../AppContext";

export const Overlay = () => {
    const { overlayCard, closeOverlay } = useApp();

    const content = useMemo(() => {
        if (overlayCard === null) return null;

        return (
            <img src={overlayCard.image} alt={overlayCard.title} height={500} />
        );
    }, [overlayCard]);

    return (
        <Modal
            style={modalStyles}
            open={overlayCard !== null}
            onClose={closeOverlay}
        >
            <StyledModalContainer>{content}</StyledModalContainer>
        </Modal>
    );
};

const modalStyles = {
    position: "fixed",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.8)",
} as CSSProperties;

const StyledModalContainer = styled.div`
    position: fixed;
    background: #fff;
    height: 100%;
    width: 100%;
    min-width: 500px;
    max-width: fit-content;
    max-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: none;
`;
