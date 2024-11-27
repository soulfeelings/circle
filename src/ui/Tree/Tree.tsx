import {useEffect, useRef, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';

// Компонент дерева
const Tree = ({position}: { position: [number, number, number] }) => {
    const trunkRef = useRef<THREE.Mesh>(null);
    const branchesRef = useRef<THREE.Mesh[]>([]);
    const leavesRef = useRef<THREE.Mesh[]>([]);

    // Ствол дерева
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.3, 5, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({color: 'brown'});

    // Ветви дерева
    const branchGeometry = new THREE.CylinderGeometry(0.05, 0.1, 3, 8);
    const branchMaterial = new THREE.MeshStandardMaterial({color: 'green'});

    // Листья (текстура или просто примитивы)
    const leafGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const leafMaterial = new THREE.MeshStandardMaterial({color: 'green'});

    // Анимация ветвей (например, колебание)
    useFrame(() => {
        if (branchesRef.current.length) {
            branchesRef.current.forEach((branch) => {
                branch.rotation.z += 0.02;
            });
        }
    });

    return (
        <group position={position}>
            {/* Ствол */}
            <mesh ref={trunkRef} geometry={trunkGeometry} material={trunkMaterial}/>

            {/* Ветки */}
            <group>
                {Array.from({length: 3}).map((_, i) => (
                    <mesh
                        key={i}
                        ref={(el) => branchesRef.current.push(el!)}
                        geometry={branchGeometry}
                        material={branchMaterial}
                        position={[0, 2 + i, 0]}
                        rotation={[Math.random(), Math.random(), Math.random()]}
                    />
                ))}
            </group>

            {/* Листья */}
            <group>
                {Array.from({length: 5}).map((_, i) => (
                    <mesh
                        key={i}
                        ref={(el) => leavesRef.current.push(el!)}
                        geometry={leafGeometry}
                        material={leafMaterial}
                        position={[Math.random() * 2 - 1, 4 + Math.random(), Math.random() * 2 - 1]}
                    />
                ))}
            </group>
        </group>
    );
};

// Основной компонент для сцены
const Scene = () => {
    const [trees, setTrees] = useState<JSX.Element[]>([]);

    const handleAddTree = () => {
        // Добавляем дерево в сцену
        setTrees((prev) => [
            ...prev,
            <Tree key={prev.length} position={[Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5]}/>
        ]);
    };

    useEffect(() => {
        const listener = () => {
            handleAddTree();
        }
        window.addEventListener('tree', listener)

        return () => {
            window.removeEventListener('tree', listener)
        }
    }, []);

    return (
        <Canvas>
            <ambientLight/>
            <pointLight position={[10, 10, 10]}/>
            <OrbitControls/>
            {trees}
        </Canvas>
    );
};

export default Scene;
