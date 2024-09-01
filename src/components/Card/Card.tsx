import React, { useState } from "react";
import styled from "styled-components";

import { Card as CardType } from "../../types";
import { Spinner } from "../Spinner/Spinner";
import { useApp } from "../../AppContext";

type CardProps = {
    card: CardType;
};

export const Card: React.FC<CardProps> = ({ card }) => {
    const [loading, setLoading] = useState(true);

    const { openOverlay } = useApp();

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div onClick={() => openOverlay(card)}>
            <h3>{card.title}</h3>
            <StyledSpinnerContainer $loading={loading}>
                <Spinner />
            </StyledSpinnerContainer>

            <StyledImage
                src={card.image}
                alt={card.title}
                height="200px"
                width="200px"
                onLoad={handleLoad}
                $loading={loading}
            />
        </div>
    );
};

const StyledSpinnerContainer = styled.div<{ $loading: boolean }>`
    display: ${({ $loading }) => ($loading ? "flex" : "none")};
    height: 200px;
    width: 200px;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.img<{ $loading: boolean }>`
    display: ${({ $loading }) => ($loading ? "none" : "inherit")};
`;
