import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  background: #fff;
  border: none;
  height: 52px;
  border-radius: 4px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.danger.main};
      border-color: ${({ theme }) => theme.colors.danger.main} !important;
    `}
  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
