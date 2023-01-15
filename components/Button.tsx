import React from 'react';

const Button = (props: any) => {
  return (
    <button
      onClick={props.onClick}
      className={props.className + 'cursor-pointer'}
    >
      {props.children}
    </button>
  );
};

export default Button;
