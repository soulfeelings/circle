import { useState } from 'react'
import {Canvas} from "./ui/Canvas/Canvas.tsx";
import './App.css'
import {initialEdges} from "./data/edges.ts";
import {initialNodes} from "./data/nodes.ts";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main-space'>
        <Canvas initialEdges={initialEdges} initialNodes={initialNodes} />
    </div>
  )
}

export default App
