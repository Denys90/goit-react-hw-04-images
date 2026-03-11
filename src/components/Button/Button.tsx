import React from 'react';
import { ButtonStyle } from './ButtonStyle';

type ButtonProps = {
  onClick: () => void;
};

const Button = ({ onClick }: ButtonProps) => {
  return <ButtonStyle onClick={onClick}>Load more</ButtonStyle>;
};

export default Button;
