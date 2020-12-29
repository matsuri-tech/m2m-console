import styled, { css } from "styled-components"

export const PageHeader = styled.header<{ center?: boolean }>`
    margin: 4ex 0;

    ${(props) =>
        props.center &&
        css`
            display: flex;
            justify-content: center;
        `}
`
