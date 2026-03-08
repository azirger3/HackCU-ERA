import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
 
import ComposedNode from './components/Composed';
import CodeNode from './components/Code';
import InputNode from './components/Input';
import OutputNode from './components/Output';
import Button from './components/Button';
 
const rfStyle = {
  backgroundColor: '#B8CEFF',
};

let initialBlocks = {};

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
    id: 'node-1',
    type: 'composed',
    position: { x: 100, y: 0 },
    data: { label: "sum3", global_blocks: initialBlocks },
  },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2', global_blocks: initialBlocks },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3', global_blocks: initialBlocks },
  },
];
 
const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'node 2', targetHandle: "outputTarget"},
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'node 3', targetHandle: "outputTarget"},
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

initialBlocks["sum"] = sum_block;
initialBlocks["sum3"] = composed_block;

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { composed: ComposedNode, code: CodeNode, input: InputNode, output: OutputNode };
 
const DEFAULT_BLOCK_NAME = "sum3";

function Flow() {
  const [blocks, setBlocks] = useState(initialBlocks);

  // Node and edge change callbacks
  const onNodesChange = useCallback(
    (changes) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [DEFAULT_BLOCK_NAME]: {
        ...blocks_snapshot[DEFAULT_BLOCK_NAME],
        react_flow: {
          ...blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow,
          initialNodes: applyNodeChanges(changes, blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow.initialNodes)
        }
      }
    })),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [DEFAULT_BLOCK_NAME]: {
        ...blocks_snapshot[DEFAULT_BLOCK_NAME],
        react_flow: {
          ...blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow,
          initialEdges: applyEdgeChanges(changes, blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow.initialEdges)
        }
      }
    })),
    [],
  );

  const onConnect = useCallback(
    (params) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [DEFAULT_BLOCK_NAME]: {
        ...blocks_snapshot[DEFAULT_BLOCK_NAME],
        react_flow: {
          ...blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow,
          initialEdges: addEdge(params, blocks_snapshot[DEFAULT_BLOCK_NAME].react_flow.initialEdges)
        }
      }
    })),
    [],
  );
 
  return (
    <div className= "parent-flex-box">
      <div className = "header-container">
        <p>test</p>
      </div>
       <div className = "parent-grid-container">
        <div className = "side-panel">
          <Button onClick = {() => {
            console.log("hi");
          }} className = "primary-button" buttonText = "hi"/>
        </div>
        <div className = "canvas">
          <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          style={rfStyle}
        />
        </div>
      </div>
    </div>
  );
}
 
export default Flow;