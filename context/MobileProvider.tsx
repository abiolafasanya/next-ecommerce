import React, { useState, createContext } from 'react';
// import { PropTypes } from 'utility/types';

type PropTypes = {
  [name: string]: React.Context<{}> | React.PropsWithChildren | any;
};

const MobileContext = createContext<PropTypes>({});

export const MobileProvider: React.FC<PropTypes> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <MobileContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileContext.Provider>
  );
};

export default MobileContext;
