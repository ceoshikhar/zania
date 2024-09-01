import React, { useState } from "react";
import styled from "styled-components";

import { Card as CardType } from "../../types";
import { Spinner } from "../Spinner/Spinner";

type CardProps = {
    data: CardType;
};

export const Card: React.FC<CardProps> = ({ data }) => {
    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div>
            <h3>{data.title}</h3>
            <StyledSpinnerContainer $loading={loading}>
                <Spinner />
            </StyledSpinnerContainer>

            <StyledImage
                src={data.image}
                alt={data.title}
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
