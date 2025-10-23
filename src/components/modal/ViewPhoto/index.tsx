import * as S from "./index.styled";

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const ViewPhoto = ({ onClose, imageUrl }: Props) => {
  return (
    <>
      <S.Dim onClick={onClose} />
      <S.ImageContainer>
        <S.CloseButton onClick={onClose}>
          <span>닫기</span>
        </S.CloseButton>
        <S.Image src={imageUrl} alt="이미지" />
      </S.ImageContainer>
    </>
  );
};

export default ViewPhoto;
