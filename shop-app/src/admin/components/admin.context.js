import React from "react";

// set the defaults
const AdminContext = React.createContext({
  user: {},
  toggleNavs: false,
  setUser: () => {},
  reRenderNavs: () => {},
  history: {}
});

export default AdminContext;
