import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Html } from '@react-three/drei'

import Sky from './Models/Sky';
import SlotHouse from './Models/SlotHouse'
import SlotWheel1 from './Models/SlotWheel1'
import SlotWheel2 from './Models/SlotWheel2'
import SlotWheel3 from './Models/SlotWheel3'
import SlotWheel4 from './Models/SlotWheel4'
import SlotWheel5 from './Models/SlotWheel5'


const Rotations = () => {

    const Angles = [
        0 * Math.PI, 0.25 * Math.PI, 0.5 * Math.PI, 0.75 * Math.PI,
        Math.PI, 1.25 * Math.PI, 1.5 * Math.PI, 1.75 * Math.PI
    ];

    const GetRotation = () => {
        return [
            Angles[Math.floor(Math.random() * Angles.length)],
            Angles[Math.floor(Math.random() * Angles.length)],
            Angles[Math.floor(Math.random() * Angles.length)],
            Angles[Math.floor(Math.random() * Angles.length)],
            Angles[Math.floor(Math.random() * Angles.length)]
        ];
    };

    return GetRotation();
}

const Lights = () => {
    return (
        <group>
            <ambientLight/>
            <directionalLight/>
            <pointLight/>
            <spotLight/>
            <hemisphereLight/>
        </group>
    )
}

const findDuplicates = (array) => {
    const countMap = {};
    const duplicates = [];

    array.forEach(value => {
        countMap[value] = (countMap[value] || 0) + 1;
    });

    for (const [value, count] of Object.entries(countMap)) {
        if (count > 1) {
            duplicates.push({ value, count });
        }
    }

    return duplicates.map(({ count }) => count); 
}

const Game = () => {
    const [rotation, setRotation] = useState([0, 0.25 * Math.PI, 0.5 * Math.PI, 0.75 * Math.PI, Math.PI]);
    const [reward, setReward] = useState(0)
    const [bet, setBet] = useState(0)
    const [deposit, setDeposit] = useState(5)
    const [played, setPlayed] = useState(false);
    const [money, setMoney] = useState(false);
    const [pairCount, setPairCount] = useState(0);
    const [tripletCount, setTripletCount] = useState(0);
    const [quadrupletCount, setQuadrupletCount] = useState(0);
    const [quintupletCount, setQuintupletCount] = useState(0);
    
    const [gameOver, setGameOver] = useState(false);

    const handlePlayClick = () => {
        const newRotation = Rotations(); 
        setRotation(newRotation);

        const duplicates = findDuplicates(newRotation)

        let pair = 0
        let triple = 0
        let quad = 0
        let quin = 0

        duplicates.forEach(( count ) => {
            if (count === 2){
                pair++;
            } else if (count === 3) {
                triple++;
            } else if (count === 4) {
                quad++;
            } else if (count === 5) {
                quin++;
            }
        })

        setPairCount(pair);
        setTripletCount(triple);
        setQuadrupletCount(quad);
        setQuintupletCount(quin);

        const Reward = duplicates.length * (pair * 1.25 + triple * 1.5 + quad * 1.75 + quin * 2) * bet;
        setReward(Reward);
        if (Reward > 0) {
            setMoney(true)
        } else{
            setMoney(false)
        }
    };

    const handleUpClick = () => {
        if (deposit > 0) { 
            setBet((bet) => bet + 1);
            setDeposit((prevDeposit) => prevDeposit - 1);
        }
    };

    const handleDownClick = () => {
        if (bet > 0) { 
            setBet((bet) => bet - 1);
            setDeposit((prevDeposit) => prevDeposit + 1);
        }
    };

    const handleRewardClick = () => {
        // setMoney(false)
        if (reward === 0) {
            setDeposit((prevDeposit) => prevDeposit);
            setBet(0)
            if (deposit + reward === 0) {
                setGameOver(true);
            }

        } else {
            setDeposit((prevDeposit) => prevDeposit + reward + bet);
            setBet(0)
            if (deposit + reward + bet === 0) {
                setGameOver(true);
            }
        }
        setReward(0)
        console.log(gameOver)
    };

    const handleRestartClick = () => {
        setGameOver(false)
        setRotation([0, 0.25 * Math.PI, 0.5 * Math.PI, 0.75 * Math.PI, Math.PI])
        setReward(0)
        setDeposit(5)
        setBet(0)
        setMoney(false)

    };
    
    const Money = () => {
        return (
            <Html style={{ position: 'relative', top: '-280px', left: '45px' }}>
                <div className='Money flex flex-col w-40 h-36 bg-slate-500 rounded-md p-2 justify-center' style={{ left: '-100px' }}>
                    <p className='text-white text-xl'>Bet: $ {bet}</p>
                    <p className='text-white text-md'>Deposit: $ {deposit}</p>
                    <p className='text-white'>Reward: $ {reward}</p>
                </div>
            </Html>
            
        )
    }

    const Buttons = () => {
        return (
            <Html style={{ position: 'relative', top: '160px', left: '-200px', transform: 'rotateX(30deg)' }}>
                <div className='ButtonContainer grid grid-cols-3 space-x-2 w-96'>

                    <div className='flex flex-col items-center justify-center space-y-1'> 
                        <button 
                            className={gameOver ? 'UpButtonInActive bg-slate-200 rounded-md border border-white text-white p-2 h-12 w-12 font-bold' : 'UpButtonActive bg-slate-600 rounded-md border border-emerald-200 text-emerald-200 p-2 h-12 w-12 font-bold'}
                            style={{ borderWidth: '3px' }}
                            onClick={handleUpClick}
                            disabled={gameOver}
                            >/\
                        </button>
                        <button 
                            className={gameOver ? 'DownButtonInActive bg-slate-200 rounded-md border border-white text-white p-2 h-12 w-12 font-bold' : 'DownButtonActive bg-slate-600 rounded-md border border-emerald-200 text-emerald-200 p-2 h-12 w-12 font-bold'}
                            style={{ borderWidth: '3px' }}
                            onClick={handleDownClick}
                            disabled={gameOver}
                            >\/
                        </button>
                    </div>

                    <div className='flex flex-col items-center justify-center space-y-1'>
                        <button 
                            className='RewardButton bg-slate-600 rounded-md border border-emerald-200 text-emerald-200 p-2 h-12 w-24 font-bold'
                            style={{ borderWidth: '3px' }}
                            onClick={handleRewardClick}
                            >{money ? 'CLAIM' : 'AGAIN'}
                        </button>
                        <button 
                            className={gameOver ? 'RestartButtonActive bg-slate-600 rounded-md border border-emerald-200 text-emerald-200 p-2 h-12 w-24 font-bold' : 'RestartButtonInActive bg-slate-200 rounded-md border border-white text-white p-2 h-12 w-24 font-bold'}
                            style={{ borderWidth: '3px' }}
                            onClick={handleRestartClick}
                            disabled={!gameOver}
                            >RESTART
                        </button>              
                    </div>

                    
                    <div className='flex flex-col items-center justify-center space-y-1'>
                        <button 
                            className={gameOver ? 'PlayButtonActive bg-slate-200 rounded-md border border-white text-white p-2 h-12 w-24 font-bold' : 'PlayButtonInActive bg-slate-600 rounded-md border border-emerald-200 text-emerald-200 p-2 h-12 w-24 font-bold'}
                            style={{ borderWidth: '3px' }}
                            onClick={handlePlayClick}
                            disabled={gameOver}
                            >PLAY
                        </button>          
                    </div>


                </div>
            </Html>
        )
    }

    const Counts = () => (
        <Html style={{ position: 'relative', top: '-280px', left: '-205px' }}>
            <div className='Counts flex flex-col w-60 h-36 bg-slate-500 rounded-md p-2 justify-center' style={{ left: '-100px' }}>
                <p className='text-white'>Pair Count: {pairCount}</p>
                <p className='text-white'>Triplet Count: {tripletCount}</p>
                <p className='text-white'>Quadruplet Count: {quadrupletCount}</p>
                <p className='text-white'>Quintuplet Count: {quintupletCount}</p>
            </div>
        </Html>
    )

    return (
        <div className='w-full h-screen relative'>

            <Canvas>
                <group className='Environment'>
                    <Sky/>
                    <Lights/>
                    <PerspectiveCamera makeDefault position={[0,0,4]}/>
                </group>

                <group className='Display'>
                    <Counts/>
                    <Money/>
                </group>

                <group className='Models'>
                    <SlotHouse/>
                    <SlotWheel1 rx={rotation[0]}/>
                    <SlotWheel2 rx={rotation[1]}/>
                    <SlotWheel3 rx={rotation[2]}/>
                    <SlotWheel4 rx={rotation[3]}/>
                    <SlotWheel5 rx={rotation[4]}/>  
                </group>

                <group>
                    <Buttons/>
                </group>

            </Canvas>

        </div>
    )
}

export default Game