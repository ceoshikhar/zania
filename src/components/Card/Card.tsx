import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

import { Card as CardType } from "../../types";
import { Spinner } from "../Spinner/Spinner";
import { useApp } from "../../AppContext";

type CardProps = {
    card: CardType;
};

export const Card: React.FC<CardProps> = ({ card }) => {
    const [loading, setLoading] = useState(true);

    const { openOverlay, swapCards } = useApp();

    const handleLoad = () => {
        setLoading(false);
    };

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: "card",
            item: { card },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { card: droppedCard } = item;
                const didDrop = monitor.didDrop();

                if (!didDrop) {
                    // The drop failed, moving the card back to it's original position.
                    swapCards(droppedCard.position, card.position);
                }
            },
        }),
        [card, swapCards]
    );

    const [, drop] = useDrop(
        () => ({
            accept: "card",
            hover(item) {
                const { card: draggedCard } = item as { card: CardType };

                if (draggedCard.type !== card.type) {
                    swapCards(draggedCard.position, card.position);
                }
            },
        }),
        [swapCards]
    );

    return (
        <div>
            <h3>{card.title}</h3>
            <StyledSpinnerContainer $loading={loading}>
                <Spinner />
            </StyledSpinnerContainer>

            <StyledImage
                ref={(node) => preview(drop(drag(node)))}
                src={card.image}
                alt={card.title}
                height="200px"
                width="200px"
                onLoad={handleLoad}
                $loading={loading}
                $isDragging={isDragging}
                onClick={() => openOverlay(card)}
            />
        </div>
    );
};

const StyledSpinnerContainer = styled.div<{
    $loading: boolean;
}>`
    display: ${({ $loading }) => ($loading ? "flex" : "none")};
    height: 200px;
    width: 200px;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.img<{ $loading: boolean; $isDragging: boolean }>`
    display: ${({ $loading }) => ($loading ? "none" : "inherit")};
    opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
    cursor: grab;
`;
