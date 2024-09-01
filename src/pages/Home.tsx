import React from "react";
import styled from "styled-components";

import { Card } from "../components/Card/Card";
import { useApp } from "../AppContext";

const StyledContainer = styled.div`
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
`;

export const Home: React.FC = () => {
    const { cards } = useApp();

    return (
        <StyledContainer>
            {cards.map((item) => (
                <Card key={item.type} data={item} />
            ))}
        </StyledContainer>
    );
};
