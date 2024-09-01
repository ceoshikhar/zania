import React from "react";

import { Card as CardType } from "../../types";

type CardProps = {
    data: CardType;
};

export const Card: React.FC<CardProps> = ({ data }) => {
    return (
        <div>
            <h3>{data.title}</h3>
            <img src={data.image} alt={data.title} height={200} />
        </div>
    );
};
