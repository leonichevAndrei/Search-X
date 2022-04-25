import styled from "styled-components";
import { Link } from "react-router-dom";

export const InputBox = styled.div`
    width: 50vw;
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 7px #a7a7a7;
    overflow: hidden;
`;

export const VisiblePart = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

export const Left = styled.div`
    width: 15px;
    padding: 10px 30px;
    /* background-color: #dba7a7; */
`;

export const SearchIcon = styled.img`
    position: relative;
    top: 5px;
`;

export const SearchIconMin = styled(SearchIcon)`
    width: 12px;
    position: relative;
    top: 0px;
    margin: 0 20px 0 22px;
`;

export const Center = styled.div`
    /* background-color: #b7e484; */
    flex-grow: 1;
`;

export const SearchInput = styled.input`
    /* background-color: #d39d5c; */
    border: none;
    width: 100%;
    height: 46px;
    font-size: 1em;
    &:focus {
        border: none;
        outline: none;
    }
`;

export const Right = styled.div`
    width: 15px;
    padding: 10px 30px;
    /* background-color: #97d3e6; */
`;

export const MicIcon = styled.img`
    position: relative;
    top: 2px;
`;

type AutocompleteProps = {visibility: boolean};
export const Autocomplete = styled.div`
    padding-bottom: 8px;
    display: ${(props: AutocompleteProps) => props.visibility ? "block": "none"};
`;

export const Line = styled.div`
    background-color: #ccc;
    height: 35px;
    line-height: 30px;
`;

type ResultLinkProps = {active: boolean};
export const ResultLink = styled(Link)`
    text-decoration: none;
    display: flex;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    color: black;
    background-color: ${(props: ResultLinkProps) => props.active ? "#dedede" : "white"};
`;