
import styled from "styled-components";

export const Search = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap);
  margin-bottom: var(--gap);
`;

export const SearchInput = styled.input`
  padding: var(--input-padding);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  min-width: 400px;
`;