import {useCallback, useEffect, useState} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

interface CanvasProps {
    initialNodes: Node[];
    initialEdges: Edge[];
}

let nodeId = 0;

export function Canvas({ initialNodes, initialEdges = [] }: CanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeName, setNodeName] = useState(''); // State для имени узла

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const addNode = useCallback(() => {
        const newNode = {
            id: `${++nodeId}`,
            position: {
                x: Math.random() * 600,
                y: Math.random() * 400,
            },
            data: { label: nodeName || `New Node ${nodeId}` },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeName(''); // Очистка инпута после добавления узла

    }, [setNodes, nodeName]);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="Введите имя для нового узла"
                />
                <button onClick={addNode}>
                    Добавить узел
                </button>
            </div>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        </div>
    );
}
