import { useEffect } from "react";

const Layout = ({ children, title }) => {
  useEffect(() => {
    document.title = title || "Welcome";
  }, []);

  return <div className="layout">{children}</div>;
};

export default Layout;
