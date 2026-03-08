import { useCallback, useContext, useState, createContext } from 'react';
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ReactFlowProvider,
  Panel
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

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

let initialBlocks = {};

let sum_block = {
  id: "test-4",
  type: "code",
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
  id: "test-2",
  type: "composed",
  block_id: 2,
  name: "sum3",
  react_flow: {
      initialNodes: initialNodes,
      initialEdges: initialEdges
  }
};

let composed_block2 = {
  type: "composed",
  name: "test_composed",
  react_flow: {
      initialNodes: [],
      initialEdges: []
  }
};


initialBlocks["sum"] = sum_block;
initialBlocks["sum3"] = composed_block;
initialBlocks["test_composed"] = composed_block2;

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { composed: ComposedNode, code: CodeNode, input: InputNode, output: OutputNode };
 
export const GlobalBlocksContext = createContext({global_blocks: null, setGlobalBlocks: null, activeBlock: null, setActiveBlock: null});

const DEFAULT_BLOCK_NAME = "sum3";

function Flow() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeBlock, setActiveBlock] = useState(DEFAULT_BLOCK_NAME);
  const [activeCode, setActiveCode] = useState(null);

  // Node and edge change callbacks
  const onNodesChange = useCallback(
    (changes) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [activeBlock]: {
        ...blocks_snapshot[activeBlock],
        react_flow: {
          ...blocks_snapshot[activeBlock].react_flow,
          initialNodes: applyNodeChanges(changes, blocks_snapshot[activeBlock].react_flow.initialNodes)
        }
      }
    })),
    [activeBlock, blocks],
  );

  const onEdgesChange = useCallback(
    (changes) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [activeBlock]: {
        ...blocks_snapshot[activeBlock],
        react_flow: {
          ...blocks_snapshot[activeBlock].react_flow,
          initialEdges: applyEdgeChanges(changes, blocks_snapshot[activeBlock].react_flow.initialEdges)
        }
      }
    })),
    [activeBlock, blocks],
  );

  const onConnect = useCallback(
    (params) => setBlocks((blocks_snapshot) => ({
      ...blocks_snapshot, 
      [activeBlock]: {
        ...blocks_snapshot[activeBlock],
        react_flow: {
          ...blocks_snapshot[activeBlock].react_flow,
          initialEdges: addEdge(params, blocks_snapshot[activeBlock].react_flow.initialEdges)
        }
      }
    })),
    [activeBlock, blocks],
  );

  const applyNewNode = (blocks, node) => ({
    ...blocks,
    [activeBlock]: {
      ...blocks[activeBlock],
      react_flow: {
        ...blocks[activeBlock].react_flow,
        initialNodes: [
          ...blocks[activeBlock].react_flow.initialNodes,
          node
        ]
      }
    }
  });

  const addNodeCounted = (node_callback) => {
    setBlocks((blocks) => {
      const num_nodes = blocks[activeBlock].react_flow.initialNodes.length;
      return applyNewNode(blocks, node_callback(num_nodes));
    });
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
    setActiveCode(null);
  }
  function generateBlock() {
    console.log("hello!");
  }
  function handleSubmit(){
    console.log("hello!");
    closeModal();
  }
 
  return (
    <ReactFlowProvider>
      <div className= "parent-flex-box">
        <div className = "header-container">
          <div></div>
          <Button buttonText = "Run Main Block" className = "secondary-button"/>
        </div>
        <div className = "parent-grid-container">
          <div className = "side-panel">
            <Button onClick={openModal} className = "primary-button" buttonText = "New Code Block"/>
              <ListBlock block={{type: "input", name:"Input"}} addNode={addNodeCounted} setActiveBlock={() => {}}/>
              <ListBlock block={{type: "output", name:"Output"}} addNode={addNodeCounted} setActiveBlock={() => {}}/>

              <div className = "list-container">
                <h3 className = "label-title">Compose Blocks</h3>
                {composedBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted} setActiveBlock={setActiveBlock}/>
                )}
              </div>
              <div className = "list-container">
                <h3 className = "label-title">Code Blocks</h3>
                {codeBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted} setActiveBlock={setActiveBlock}/>
                )}
              </div>
            </div>
            <div className = "canvas">
              <GlobalBlocksContext.Provider value={{global_blocks: blocks, setGlobalBlocks: setBlocks, activeBlock: activeBlock, setActiveBlock: setActiveBlock}}>
                  <ReactFlow
                    colorMode="dark"
                    nodes={blocks[activeBlock].react_flow.initialNodes}
                    onNodesChange={onNodesChange}
                    edges={blocks[activeBlock].react_flow.initialEdges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={["Backspace", "Delete"]}
                    fitView
                    style={rfStyle}
                  >
                    <Background bgColor="var(--background)" color="var(--brand-dark)" variant={"dots"} gap={15} />
                    <Panel position="top-center" className = "compose-title">{activeBlock}</Panel>
                  </ReactFlow>
              </GlobalBlocksContext.Provider>
            </div>
          </div>
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="New Code Block"
          className="new-block-form"
          overlayClassName="new-block-overlay"
        >
          <div className="modal-header">
            <span className="material-symbols-rounded" onClick={closeModal}>close</span>
            <Button type="button" onClick={handleSubmit} className="primary-button" buttonText="Save"/>
          </div>
          <input className="modal-input" placeholder="Block Name"/>
          <div className = "code-form">
            <div className="modal-io-row">
              <div className="modal-io-col">
                <h3 className="modal-section-title">Inputs</h3>
                <input className="modal-input" placeholder="Hello Words"/>
                <span className="material-symbols-rounded">add</span>
              </div>
              <div className="modal-io-col">
                <h3 className="modal-section-title">Outputs</h3>
                <input className="modal-input" placeholder="Hello Words"/>
                <span className="material-symbols-rounded">add</span>
              </div>
            </div>

      
            <h3 className="modal-section-title">Generation Instructions</h3>
            <textarea className="modal-textarea" placeholder="Hello Words"/>

          
            <h3 className="modal-section-title">Test Cases</h3>
            <div className="modal-io-col">
              <div className="modal-io-row">
                <div className="modal-io-col">
                  <p className="modal-io-label">Input</p>
                  <input className="modal-input" placeholder="Hello Words"/>
                </div>
                <div className="modal-io-col">
                  <p className="modal-io-label">Output</p>
                  <input className="modal-input" placeholder="Hello Words"/>
                </div>
              </div>
              <span className="material-symbols-rounded">add</span>
            </div>

          </div>
        </Modal>
      </div>
    </ReactFlowProvider>
  );
}

console.log(getPromptFromCodeBlock(sum_block));

export default Flow;
