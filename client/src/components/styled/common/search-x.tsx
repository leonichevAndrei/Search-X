import styled from "styled-components";
import { Link } from "react-router-dom";

export const InputBox = styled.div`
    width: 50vw;
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 7px #a7a7a7;
    overflow: visible;
`;

export const VisiblePart = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: visible;
`;

export const Left = styled.div`
    width: 15px;
    padding: 10px 30px;
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
    flex-grow: 1;
`;

export const SearchInput = styled.input`
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
    overflow: visible;
`;

export const Microphone = styled.a`
    position: relative;
    overflow: visible;
    cursor: pointer;
`;

type MicIconProps = { micActive: boolean };

export const MicIcon = styled.img`
    position: absolute;
    top: 3px;
    width: 15px;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: none;
    animation-name: ${(props: MicIconProps) => props.micActive ? "pulsing" : "none"};;
    animation-play-state: ${(props: MicIconProps) => props.micActive ? "running" : "paused"};
    @keyframes pulsing {
        0% {
            transform: scale(1, 1);
        }
        50% {
            transform: scale(1.4, 1.4);
        }
        100% {
            transform: scale(1, 1);
        }
    }
`;

type AutocompleteProps = { visibility: boolean };
export const Autocomplete = styled.div`
    padding-bottom: 8px;
    display: ${(props: AutocompleteProps) => props.visibility ? "block" : "none"};
    overflow: hidden;
`;

export const Line = styled.div`
    background-color: #ccc;
    height: 35px;
    line-height: 30px;
`;

type ResultLinkProps = { active: boolean };
export const ResultLink = styled.a`
    cursor: pointer;
    white-space: pre;
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