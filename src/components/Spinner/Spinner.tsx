import styled, { keyframes } from "styled-components";

type SpinnerProps = {
    color?: string;
    size?: number;
    sizeUnit?: "px" | "em" | "rem";
};

export const Spinner: React.FC<SpinnerProps> = ({
    color = "#003459",
    size = 30,
    sizeUnit = "px",
}) => (
    <Container $size={size} $sizeUnit={sizeUnit}>
        <Ring color={color} $size={size} $sizeUnit={sizeUnit} />
    </Container>
);

const motion = () => keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform : rotate(360deg);
    }
`;

const Container = styled.div<{ $size: number; $sizeUnit: string }>`
    display: inline-block;
    position: relative;
    width: ${(props) => `${props.$size}${props.$sizeUnit}`};
    height: ${(props) => `${props.$size}${props.$sizeUnit}`};
`;

const Ring = styled.div<{ $size: number; $sizeUnit: string }>`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => `${props.$size}${props.$sizeUnit}`};
    height: ${(props) => `${props.$size}${props.$sizeUnit}`};
    margin: 2px;
    border: 3px solid ${(props) => props.color};
    border-radius: 50%;
    border-color: ${(props) => props.color} transparent transparent transparent;
    animation: ${() => motion()} 1.4s cubic-bezier(0.5, 0, 0.5, 1) infinite;
`;
