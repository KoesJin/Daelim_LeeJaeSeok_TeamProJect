import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createGlobalStyle, styled } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header/Header';

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-enter-active {
      opacity: 1;
      transition: opacity 250ms ease-in;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit-active {
      opacity: 0;
      transition: opacity 250ms ease-out;
    }
  `;

const AnimationContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function Root() {
    //useNavigate 훅
    const navigate = useNavigate();
    //useLocation 훅
    const location = useLocation();

    //모든페이지에서 accessToken값이 세션과 , 로컬에 없으면 /로 튕기게 하는 코드
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/');
        }
    }, [navigate, location.pathname]);

    return (
        <>
            <Helmet>
                <title>LeeJaeSeok</title>
            </Helmet>
            <GlobalStyle />
            {location.pathname !== '/' &&
                location.pathname !== '/signuppage' &&
                location.pathname !== '/checksignuppage' && <Header />}
            <TransitionGroup>
                <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                    <AnimationContainer>
                        <Outlet />
                    </AnimationContainer>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
}

export default Root;
