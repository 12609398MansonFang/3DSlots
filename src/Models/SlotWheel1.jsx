import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';

import slotWheelScene from '../Assets/GLB/SlotWheel1.glb';

const SlotWheel1 = ({ play, rx }) => {
    const slotWheel = useGLTF(slotWheelScene)
    const slotWheelRef = useRef()

    // slotWheelRef.current.rotation.x %= Math.PI * 2;

    return (
        <mesh ref={slotWheelRef} position={[-0.8, 0, 0]} rotation={[rx, 0, 0]}>
            <primitive object = {slotWheel.scene}/>
        </mesh>
    )
}

export default SlotWheel1