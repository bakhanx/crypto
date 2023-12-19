import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
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
    font-size: 40px;
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
  max-width: 720px;
  margin: auto;
  left:0;
  right:0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    padding: 10px;
  }
`;
const Home = styled.div`
  color: orange;
`;

const DarkMode = styled.div`
  color: ${(props) => props.theme.darkModeColor};
  cursor: pointer;
`;

export let TopNav = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const ToggleDarkAtom = () =>{ setIsDark((current)=>!current)}
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
            <span className="material-symbols-outlined">monetization_on</span>
          </Link>
        </Home>
        <DarkMode>
          <span
            onClick={ToggleDarkAtom}
            className="material-symbols-outlined"
          >
            {isDark ? "dark_mode" : "light_mode"}
          </span>
        </DarkMode>
      </NavContainer>
    </>
  );
};