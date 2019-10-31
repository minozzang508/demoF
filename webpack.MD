# What is webpack

## need for what
- n개의 모듈(JS 파일)을 1개의 JS파일로 만들어주는 기술. (react로 치면 n개의 컴포넌트)
- 웹 서버 배포 시 작업들 자동화 ( HTML, CSS, JS 압축 -> 이미지 압축 -> CSS 전처리기 변환 )
- Code Splitting으로 Lazy loading 예방 : 미리 로딩이 아닌 그 때 그 때 요청하자는 철학으로 빠른 로딩 속도와 높은 성능 

### Start
1. node와 npm을 설치하자
 - node : 브라우저 밖에서도 JS를 실행할 수 있는 실행기
 - npm or yarn : node package manager [npm 커스텀 사례](https://joshua1988.github.io/webpack-guide/build/npm-custom-commands.html#npm-%EC%BB%A4%EC%8A%A4%ED%85%80-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%8B%A4%EC%A0%9C-%EC%82%AC%EB%A1%80)
2. npm init : npm 프로젝트 만들기
3. npm -i -D webpack webpack-cli : npm 프로젝트에서 웹팩 모듈 설치
4. npm -i -D react react-dom : 리액트, 리액트 돔 설치
5. configuration 설정하기 (webpack.config.js)
 * 주요 properties
  - Entry : 어떤 모듈을 input할꺼냐
  - Output : Webpack의 module bundling의 결과물
   - filename : 최소 파일네임은 지정해줘야한다.
   - path : output 파일의 경로
  - Loader : module 이라는 이름을 사용한다. JS가 아닌 웹 자원(HTML, CSS, Images, JSX(babel)) 등을 변환해주는 properties
   - test : 로더를 적용할 파일 유형(regular expression)
   - use : 해당 파일에 적용할 로더의 이름
  -plugins : 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성
   - loader은 파일 변환, 해석 과정
   - plugin은 해당 결과물의 형태를 바꾸는 역할

## BABEL / JSX
- JS + XML : js 안에서 태그 직접 입력할 수 있도록 해주는 문법
- BABEL : JSX안의 태그를 createElement를 통해 DOM 객체를 만들어줌
