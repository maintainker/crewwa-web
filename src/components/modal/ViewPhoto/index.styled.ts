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
  background: white;
`;
export const Image = styled.img`
  max-width: 400px;
  margin: 0;
  display: block;
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(calc(-100% - 12px));
  border-radius: 0;
  padding: 0;
  margin: 0;
  border: 0;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background: white;
    transform-origin: center;
    transition: background 0.2s ease;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  span {
    opacity: 0;
  }
`;
