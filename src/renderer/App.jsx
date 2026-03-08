import { useCallback, useContext, useState, createContext } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
 
import ComposedNode from './components/Composed';
import CodeNode from './components/Code';
import InputNode from './components/Input';
import OutputNode from './components/Output';
import Button from './components/Button';
import ListBlock from './components/ListBlock'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import makeAPICall from './API/API';
import getPromptFromCodeBlock from './API/GetPrompt';
import WriteToFile from './API/WriteToFile';
import ParseOutput from './API/ParseOutput';
import RunTest from './Testing/RunTest';
import GenerateAndTest from './API/GenerateAndTest';

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
  file: "",
  test_cases: [
      {
      inputs: "1,2",
      outputs: "3"
      }
  ]
};



const initialNodes = [
  {
    id: 'node-1',
    type: 'composed',
    position: { x: 100, y: 0 },
    data: { label: "sum3" },
  },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
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
 
export const GlobalBlocksContext = createContext(null);

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

  const applyNewNode = (blocks, node) => ({
    ...blocks,
    [DEFAULT_BLOCK_NAME]: {
      ...blocks[DEFAULT_BLOCK_NAME],
      react_flow: {
        ...blocks[DEFAULT_BLOCK_NAME].react_flow,
        initialNodes: [
          ...blocks[DEFAULT_BLOCK_NAME].react_flow.initialNodes,
          node
        ]
      }
    }
  });

  const addNode = (node) => {
    setBlocks((blocks) => applyNewNode(blocks, node));
  };

  const addNodeCounted = (node_callback) => {
    const num_nodes = blocks[DEFAULT_BLOCK_NAME].react_flow.initialNodes.length;
    setBlocks((blocks) => applyNewNode(blocks, node_callback(num_nodes)));
  }

  const newInput = () => {
    let id = `${blocks[DEFAULT_BLOCK_NAME].react_flow.initialNodes.length + 1}`;
    const newNode = {
      id: id,
      type: "input",
      position: { x: 200, y: 200 },
      data: { label: `Input ${id}` },
    };
    addNode(newNode);
  };

  const newOutput = () => {
    let id = `${blocks[DEFAULT_BLOCK_NAME].react_flow.initialNodes.length + 1}`;
    const newNode = {
      id: id,
      type: "output",
      position: { x: 200, y: 200 },
      data: { label: `Output ${id}` },
    };
    addNode(newNode);
  }

  const codeBlocksList = Object.entries(blocks).filter(([, block]) => block.type === 'code');
  const composedBlocksList = Object.entries(blocks).filter(([, block]) => block.type === 'composed');

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    console.log("yay it works");
  }

  function closeModal() {
    setIsOpen(false);
  }
  function generateBlock() {
    console.log("hello!");
  }
 
  return (
    <ReactFlowProvider>
      <div className= "parent-flex-box">
        <div className = "header-container">
          <p>test</p>
        </div>
        <div className = "parent-grid-container">
          <div className = "side-panel">
            <Button onClick={openModal} className = "primary-button" buttonText = "New Code Block"/>

              <Button onClick={newInput} className = "primary-button" buttonText = "Add Input"/>

              <Button onClick={newOutput} className = "primary-button" buttonText = "Add Output"/>

              <div className = "list-container">
                <h3 className = "label-title">Compose Blocks</h3>
                {composedBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted}/>
                )}
              </div>
              <div className = "list-container">
                <h3 className = "label-title">Code Blocks</h3>
                {codeBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted}/>
                )}
              </div>
            </div>
            <div className = "canvas">
              <GlobalBlocksContext.Provider value={blocks}>
                  <ReactFlow
                    nodes={blocks[DEFAULT_BLOCK_NAME].react_flow.initialNodes}
                    onNodesChange={onNodesChange}
                    edges={blocks[DEFAULT_BLOCK_NAME].react_flow.initialEdges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={["Backspace", "Delete"]}
                    fitView
                    style={rfStyle}
                  >
                    <Background bgColor="var(--background)" color="var(--brand-dark)" variant={"dots"} gap={15} />
                  </ReactFlow>
              </GlobalBlocksContext.Provider>
            </div>
          </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Code Block"
        className = "new-block-form"
      >
        <h2>New Code Block</h2>

        <form onSubmit={(e) => {
          e.preventDefault(); // prevents page reload
          handleSubmit();
        }}>
          <Button type="submit" onClick = {generateBlock} className = "primary-button" buttonText = "Create"/>
          <Button type="button" onClick={closeModal} className = "secondary-button" buttonText = "Cancel"/>
        </form>
      </Modal>
      </div>
    </ReactFlowProvider>
  );
}

console.log(getPromptFromCodeBlock(sum_block));
WriteToFile("temp.txt", "check this out\n");
const code_in = `import os
print("Hello")
import numpy as np
import os
from math import sqrt
print("World")
import numpy as np`;
console.log(ParseOutput(code_in));

const test_result = await RunTest(`def sum(a,b):\n\treturn a+b\n`, sum_block);
console.log(test_result);

const text = window.env.TEST;
console.log(text);

const prompt_resp = await GenerateAndTest("sum", initialBlocks, true);
console.log(prompt_resp);

export default Flow;
