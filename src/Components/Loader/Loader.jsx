import React from 'react';
import { Vortex } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <p>ЗАГРУЖАЕМ.....</p>
      <Vortex
        visible={true}
        height="150"
        width="150"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </>
  );
};

export default Loader;
