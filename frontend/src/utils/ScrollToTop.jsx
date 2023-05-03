import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const loc = useLocation();

  useEffect(() => {
    document.body.scrollTop = 0;
  }, [loc]);
};

export default ScrollToTop;
