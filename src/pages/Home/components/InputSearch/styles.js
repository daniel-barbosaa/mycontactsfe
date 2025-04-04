import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  input {
    width: 100%;
    border-radius: 25px;
    border: none;
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 50px;
    outline: none;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
