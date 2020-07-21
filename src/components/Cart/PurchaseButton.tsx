import * as React from 'react';
import styled from 'styled-components';

type PurchaseButtonProp = {
    onButtonClicked: () => void;
    children: string;
    isActive: boolean;
};

type ButtonProp = {
    isActive: boolean;
};

const Button = styled.button<ButtonProp>`
    margin-top: 20px;
    height: 50px;
    width: 240px;
    font-size: 18px;
    font-weight: 600;
    padding: 2px 0;
    color: #ffffff;
    background-color: ${(prop) => (prop.isActive ? '#000000' : '#c2c2c2')};
    border: none;
    cursor: ${(prop) => prop.isActive && 'pointer'};

    &:focus {
        outline: none;
    }
`;

function PurchaseButton({
    onButtonClicked,
    children,
    isActive,
}: PurchaseButtonProp): React.ReactElement {
    return (
        <Button
            disabled={!isActive}
            isActive={isActive}
            onClick={onButtonClicked}
        >
            {children}
        </Button>
    );
}

export default PurchaseButton;
