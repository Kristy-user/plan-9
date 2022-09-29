import React from 'react';
import { FallingLines } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <FallingLines
      color="#8683e1"
      width="100"
      visible={true}
      // ariaLabel="falling-lines-loading"
    />
  );
};
export default Spinner;
