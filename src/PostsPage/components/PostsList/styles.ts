import styled from "styled-components";

export const PostsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 175px);
  padding: var(--sl, sm);
  background-color: var(--background-color, #f9f9f9);
`;

export const PostBody = styled.p`
  margin: 0;
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
export const PostActions = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
  border-radius: var(--border-radius);
`;

export const PostTitle = styled.h2`
  margin: 0 0 var(--gap);
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const PostContent = styled.div`
  flex: 1;
`;

export const Post = styled.article`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  margin-bottom: var(--sm);
  padding: var(--sl);
  display: flex;
  flex-direction: row;
  gap: var(--sl);
  border-radius: var(--border-radius);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`;
