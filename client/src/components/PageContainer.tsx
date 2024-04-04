import styled from "styled-components";

export const PageContainer = styled.div`
  grid-column: 2/-1;
  grid-row: 1 / -1;
  // padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100dvh;
  background: var(--background-blue);
  transition: 0.4s ease;

  @media (max-width: 640px) {
    grid-column: 1 /-1;
  }
`;
