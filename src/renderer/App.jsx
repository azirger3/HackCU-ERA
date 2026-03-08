import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Styles/index.css';
 
import ComposedNode from './components/Composed';
import CodeNode from './components/Code';
import InputNode from './components/Input';
import OutputNode from './components/Output';
 
const rfStyle = {
  backgroundColor: '#B8CEFF',
};

let blocks = {};

let sum_block = {
  id: "10",
  type: "code",
  block_id: 1,
  name: "sum",
  inputs: [
      {
      name: "a",
      description: "The first number to sum"
      },
      {
      name: "b",
      description: "The second number to sum"
      }
  ],
  outputs: [
      {
      name: "sum",
      description: "the sum of a and b"
      }
  ],
  ai_description: "output the sum of numbers a and b",
  file: "/home/.....",
  test_cases: [
      {
      inputs: ["1", "2"],
      outputs: ["3"]
      }
  ]
};


const initialNodes = [
  {
    id: '1',
    type: 'composed',
    position: { x: 100, y: 0 },
    data: { label: "sum3", global_blocks: blocks },
  },
  {
    id: '2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: '2', global_blocks: blocks },
  },
  {
    id: '3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: '3', global_blocks: blocks },
  },
];
 
const initialEdges = [
  { id: 'edge-1', source: '1', target: '2', sourceHandle: '2', targetHandle: "outputTarget"},
  { id: 'edge-2', source: '1', target: '3', sourceHandle: '3', targetHandle: "outputTarget"},
];
 
let composed_block = {
  id: "11",
  type: "composed",
  block_id: 2,
  name: "sum3",
  react_flow: {
      initialNodes: initialNodes,
      initialEdges: initialEdges
  }
};

blocks["sum"] = sum_block;
blocks["sum3"] = composed_block;

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { composed: ComposedNode, code: CodeNode, input: InputNode, output: OutputNode };
 
function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}
 
export default Flow;