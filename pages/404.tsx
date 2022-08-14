import Image from "next/image";
import styled from "styled-components";

const ImageWrap = styled.div`
  position: relative;
  width: auto;
  height: 1000px;
  top: 30px;
`;

export default function Error() {
  return (
    <ImageWrap>
      <Image
        src={"/sw_404.png"}
        alt={"404"}
        layout={"fill"}
        objectFit={"contain"}
        priority
      />
    </ImageWrap>
  );
}
