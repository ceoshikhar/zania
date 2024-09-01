import React from "react";
import styled from "styled-components";

import { Card } from "../components/Card/Card";
import { useApp } from "../AppContext";
import { Overlay } from "../components/Overlay/Overlay";

export const Home: React.FC = () => {
    const { cards } = useApp();

    return (
        <>
            <Overlay />

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
