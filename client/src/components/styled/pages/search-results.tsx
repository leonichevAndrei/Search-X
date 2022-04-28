import { Link } from "react-router-dom";
import styled from "styled-components";

export const ResultsPageBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    align-content: center;
`;

export const SearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-top: 20px;
    width: 70vw;
`;

export const LogoArea = styled.div`
    display: flex;
    justify-content: left;
    width: 20vw;
    height: 48px;
    box-sizing: border-box;
    padding-right: 10px;
`;

export const LogoLink = styled(Link)`
    
`;

export const LogoMin = styled.img`
    width: 100%;
    max-width: 205px;
`;

export const SearchComp = styled.div`
    width: 50vw;
    height: 48px;
    position: relative;
`;

export const SearchCompAbs = styled.div`
    position: absolute;
`;

export const ResultsBlock = styled.div`
    width: 70vw;
`;

export const GetInfo = styled.div`
    width: 70vw;
    padding: 20px 0 5px;
    font-size: 0.8em;
    color: #9f9f9f;
    border-bottom: 1px solid #dbdbdb;
`;

export const GetResults = styled.div`
    width: 70vw;
    padding: 10px 0 30px;
`;

export const ResultLine = styled.div`
    padding: 15px 0 0 0;
`;

export const Title = styled.div`
    padding-bottom: 5px;
`;

type TitleLinkProps = { recentlySearched: boolean };

export const TitleLink = styled(Link)`
    color: ${(props: TitleLinkProps) => props.recentlySearched ? "#7100ad" : "#1a0dab"};
    text-decoration: none;
    font-size: 1.2em;
    &:hover {
        text-decoration: underline;
    }
`;

export const Desc = styled.div`
    font-size: 0.8em;
    line-height: 1.6em;
`;