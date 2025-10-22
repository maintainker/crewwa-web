import styled from "styled-components";

export const Dim = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;
export const ImageContainer = styled.div`
  position: absolute;
  min-width: 80px;
  min-height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Image = styled.img`
  max-width: 400px;
  margin: 0;
  display: block;
`;
