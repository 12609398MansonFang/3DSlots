import React from 'react';
import { useGLTF } from '@react-three/drei';

import slotHouseScene from '../Assets/GLB/SlotHouse.glb'

const SlotHouse = () => {
    const slotHouse = useGLTF(slotHouseScene)
    
    return (
        <mesh>
            <primitive object = {slotHouse.scene}/>
        </mesh>
    )
}

export default SlotHouse