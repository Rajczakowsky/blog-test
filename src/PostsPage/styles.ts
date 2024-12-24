import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

export const PostsCount = styled.div`
  color: black;
  margin-bottom: var(--sl);
  text-align: center;
  flex: 1;
  height: 100%;
`;

export const Message = styled.p`
  color: var(--text-color);
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;
`;

export const PageWrapper = styled.div``;

export const PageHeading = styled.h1`
  color: var(--text-color);
  text-align: center;
`;

export const PostsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 210px);
  padding: var(--sl, sm);
  background-color: var(--background-color, #f9f9f9);
`;

export const PostsListContainer = styled.div`
  position: relative;
  flex: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    pointer-events: none;
    z-index: 1; /* Ensure the shadow is above the content */
  }

  &::before {
    top: 0;
    box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.5); /* Top shadow */
  }

  &::after {
    bottom: 0;
    box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5); /* Bottom shadow */
  }
`;

export const Button = styled(Link)<{ disabled?: boolean }>`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
  border-radius: var(--border-radius);
  ${(props) => props.disabled && "opacity: 0.5; cursor: default;"}
`;

export const PageIndicator = styled(Link)<{ active: boolean }>`
  padding: 0 5px;
  margin: 0 1px;
  color: white;
  vertical-align: middle;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.active ? "#1668aa" : "lighten(rgb(var(--background-color)), 80%)"};
`;

export const PageIndicators = styled.div``;

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
`;
