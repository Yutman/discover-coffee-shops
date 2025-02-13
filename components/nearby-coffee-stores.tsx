'use client'

import React from 'react'
import Banner from './banner.client';
import useTrackLocation from '@/hooks/use-track-location';

export default function NearbyCoffeeStores() {

    const {handleTrackLocation} = useTrackLocation(); //this hook will be used for mainly getting the location info and showing it to us

    const handleOnClick = () => {
        handleTrackLocation(); 
};

  return (
  <div>
        <Banner  />
  </div>
  );
}

