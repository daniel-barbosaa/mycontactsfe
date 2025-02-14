import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    margin-top: 8px;
    display: block;
    font-size: 12px;
  }
`;
