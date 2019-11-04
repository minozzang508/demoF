import { createGlobalStyle } from 'styled-components';
import memphisColorful from '../assets/images/memphis-colorful.png';

const GlobalStyles = createGlobalStyle`
  
  body {
  font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', 'Nanum Gothic', 나눔고딕, NanumGothic, 돋움, Dotum, 굴림, Gulim, Helvetica, sans-serif;
  line-height: normal;
  overscroll-behavior-y: none;
  background-color: #fff;
  background-image: url(${memphisColorful});


  }

  ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p, figure, blockquote {
    margin: 0;
  }
`;

export default GlobalStyles;
