import styled from "styled-components";

export const ResultsPagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

type PageProps = { currentPage: boolean }

export const Page = styled.a`
    display: block;
    cursor: ${(props: PageProps) => props.currentPage ? "default" : "pointer"};
    padding: 0 3px 5px 3px;
    color: ${(props: PageProps) => props.currentPage ? "#1a0dab" : "#9f9f9f"};
    text-decoration: ${(props: PageProps) => props.currentPage ? "underline" : "none"};
    &:hover {
        text-decoration: underline;
    }
`;