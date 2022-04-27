import styled from "styled-components";

export const PageBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    align-content: center;
`;

export const SearchBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 20vh;
`;

export const SearchTop = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 5vh; 
`;

export const Logo = styled.img`
    width: 300px;
`;

export const SearchBottom = styled.div`
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0);
`;

export const Bold = styled.b`
`;
