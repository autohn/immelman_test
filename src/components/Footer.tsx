import Link from "next/link";
import styled from "styled-components";

const StyledContainer = styled.div`
  color: white;
  position: sticky;
  bottom: 0;
  text-align: end;
`;

export default function Footer() {
  return (
    <StyledContainer>
      <Link href="http://auto.hn">
        <a>Mishalex 2022</a>
      </Link>
    </StyledContainer>
  );
}
