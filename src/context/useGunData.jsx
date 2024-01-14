// useGunData.js
import { useState, useEffect } from 'react';
import { useGun } from './GunContext';

export const useGunData = (node) => {
  const gun = useGun();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!gun || !node) return;

    const gunNode = gun.get(node);
    gunNode.on((data, key) => {
      setData({ data, key });
    });

    return () => {
      gunNode.off();
    };
  }, [gun, node]);


  return data;
};
