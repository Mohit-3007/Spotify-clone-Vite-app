import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react';
import {  useLocation, } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
  const {pathname} = useLocation();
//   useLayoutEffect(() => {
//     console.log("useLayoutEffect is running or not?  ")
//     // document.documentElement.scrollTo(0, 0);
//     document.body.scrollTo(0, 0);
//     // window.scrollTo({top:0, behavior:"smooth"});
//   }, [pathname])

  useEffect(() => {
    console.log("Am i running or not?  ")
    document.body.scrollTo(0, 0);
    // window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTopOnRouteChange;