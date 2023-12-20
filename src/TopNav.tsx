import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { isDarkAtom } from "./atoms";

const NavContainer = styled.div`
  /* fonts.googleapi */
  /* @font-face {
    font-family: "Material Symbols Outlined";
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v7/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzazHD_dY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOej.woff2)
      format("woff2");
  } */
  .material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    /* -webkit-font-feature-settings: "liga"; */
    /* -webkit-font-smoothing: antialiased; */
  }
  position: fixed;
  background-color: ${(props) => props.theme.themeColor};
  width: 100vw;
  /* max-width: 480px; */
  margin: auto;
  left: 0;
  right: 0;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    padding: 10px;
  }
  padding : 30px;
  border-bottom-style: solid;
  border-width: 2px;
  border-image: linear-gradient(to right, gold, gold, white, gold);
  border-image-slice: 1;
`;

const Card = styled.div`
  border: 2px solid transparent;
  background: linear-gradient(#fff, #fff),
    linear-gradient(to right bottom, #fdd783, #eb7a89);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Section = styled.div``;
const Home = styled.div`
  color: linear-gradient(to right, gold, gold, white, gold);
  font-size: 32px;
  font-style: italic oblique;
`;

const DarkMode = styled.div`
  color: ${(props) => props.theme.darkModeColor};
  cursor: pointer;
`;

const gradient = keyframes`
0% {
  background-position: 0 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0 50%;
}
`;

const AnimatedGradientText = styled.h1`
  animation: ${gradient} 3s ease-in-out infinite;
  background: linear-gradient(to right, gold, white, #2193b0, #6dd5ed);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export let TopNav = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const ToggleDarkAtom = () => {
    setIsDark((current) => !current);
  };
  return (
    <>
      <head>
        <link
          rel="preload stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0"
          as="style"
        />
      </head>

      <NavContainer>
        <Home>
          <Link to={"/"}>
            <AnimatedGradientText>CRYPTO</AnimatedGradientText>
          </Link>
        </Home>
        <DarkMode>
          <span onClick={ToggleDarkAtom} className="material-symbols-outlined">
            {isDark ? "dark_mode" : "light_mode"}
          </span>
        </DarkMode>
      </NavContainer>
    </>
  );
};
