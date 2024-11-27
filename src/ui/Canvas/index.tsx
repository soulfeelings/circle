import {initialEdges} from "../../data/edges.ts";
import {initialNodes} from "../../data/nodes.ts";
import {Canvas as CanvasInner} from './Canvas';

export const Canvas = () => <CanvasInner initialEdges={initialEdges} initialNodes={initialNodes}/>