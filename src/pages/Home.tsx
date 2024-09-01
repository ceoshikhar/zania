import React, { useMemo } from "react";
import styled from "styled-components";

import { Card } from "../components/Card/Card";
import { useApp } from "../AppContext";
import { Overlay } from "../components/Overlay/Overlay";
import { Spinner } from "../components/Spinner/Spinner";
import moment from "moment";

export const Home: React.FC = () => {
    const { cards, loadingCards, savedAt, savingCards } = useApp();

    const savedAtFormatted = moment.unix(savedAt).format("MMMM Do, h:mm:ss a");

    const savingContent = useMemo(() => {
        if (savingCards) {
            return (
                <StyledSaving>
                    Saving <Spinner />
                </StyledSaving>
            );
        }

        if (savedAt === 0)
            return (
                <StyledSaving>
                    Not saved even once. Move cards to trigger a save.
                </StyledSaving>
            );

        return <StyledSaving>Saved at {savedAtFormatted}</StyledSaving>;
    }, [savedAt, savedAtFormatted, savingCards]);

    if (loadingCards) {
        return <Spinner size={16} />;
    }

    return (
        <>
            <Overlay />

            <StyledSaving>{savingContent}</StyledSaving>

            <StyledContainer>
                {cards.map((item) => (
                    <Card key={item.type} card={item} />
                ))}
            </StyledContainer>
        </>
    );
};

const StyledContainer = styled.div`
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
`;

const StyledSaving = styled.div`
    font-weight: bold;
    font-size: 16px;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    column-gap: 6px;
`;
