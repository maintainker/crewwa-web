import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  transform: translateY(-20px);
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  max-width: 486px;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const RefreshButton = styled.button`
  width: 80px;
  font-size: 12px;
`;

export const Table = styled.table`
  border: 1px solid #fff;
  font-size: 11px;
  th,
  td {
    padding: 4px;
    text-align: center;
  }
`;
