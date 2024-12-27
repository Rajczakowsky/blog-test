import { styled } from 'styled-components';
export const PostsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 180px);
  padding: var(--sl, sm);
  background-color: var(--background-color, #f9f9f9);
`;