import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei';

import slotWheelScene from '../Assets/GLB/SlotWheel4.glb';

const SlotWheel4 = ({ play, rx }) => {
    const slotWheel = useGLTF(slotWheelScene)
    const slotWheelRef = useRef()



    return (
        <mesh ref={slotWheelRef} position={[0.4, 0, 0]} rotation={[rx, 0, 0]}>
            <primitive object = {slotWheel.scene}/>
        </mesh>
    )
}

export default SlotWheel4