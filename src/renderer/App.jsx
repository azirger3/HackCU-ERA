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

import GenerateComposite from './API/GenerateComposite';
 
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

const initialBlocksA = {"main": {
  type: "composed",
  name: "main",
  react_flow: {
      initialNodes: [],
      initialEdges: []
  }
}};

import { initialBlocks } from '../../out/emptyBlocks';

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { composed: ComposedNode, code: CodeNode, input: InputNode, output: OutputNode };
 
export const GlobalBlocksContext = createContext({global_blocks: null, setGlobalBlocks: null, activeBlock: null, setActiveBlock: null, setActiveCode: null});

const DEFAULT_BLOCK_NAME = "main";

function Flow() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [activeBlock, setActiveBlock] = useState(DEFAULT_BLOCK_NAME);
  const [activeCode, setActiveCode] = useState(null);

  async function generateCode() {
    WriteToFile("blocks.js", "export const initialBlocks = " + JSON.stringify(blocks) + ";", true);

    let output_str = "";

    Object.entries(blocks).forEach(([key, block]) => {
      if(block.type === "composed") {
        output_str += GenerateComposite(blocks, block.name) + "\n";
      }
    });

    let first = true;
    let passed = true;

    for(const [key, block] of Object.entries(blocks)) {
      if(block.type === "code") {
        console.log(block.gen_code);
        if(block.gen_code.trim() == "") {
          const [code_str, test_result] = await GenerateAndTest(block.name, blocks, first);
          first = false;

          console.log(test_result);
          if(test_result.error) {
            alert(`Test on ${block.name} failed: ${test_result.message}`);
            passed = false;
          } else {
            setBlocks((b) => ({
              ...b,
              [block.name]: {
                ...b[block.name],
                gen_code: ParseOutput(code_str)
              }
            }));
          }

          output_str += code_str + "\n";

        } else {
          output_str += block.gen_code;
        }
      }
    }

    output_str = ParseOutput(output_str);

    if(passed) {
      await WriteToFile("main.py", output_str, true);
    }

    /* console.log(getPromptFromCodeBlock(sum_block));
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

    const code_str, test_result = await GenerateAndTest("sum", initialBlocks, true);
    console.log(prompt_resp); */
  }

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
    const num_blocks = Object.keys(blocks).length;

    let new_block = {
      id: `block-${num_blocks+1}`,
      type: "code",
      name: `block-${num_blocks+1}`,
      inputs: [],
      outputs: [],
      ai_description: "",
      file: "/home/.....",
      test_cases: [],
      gen_code: ""
    };

    setBlocks((blocks) => ({...blocks, [new_block.name]: new_block}));
    setActiveCode(() => new_block.name);
  }

  function afterOpenModal() {
    console.log("yay it works");
  }

  function closeModal() {
    setActiveCode(null);
  }

  function generateBlock() {
  }

  function handleSubmit(){
    closeModal();
  }

  let [newComp, setNewComp] = useState(null);

  function openNewComposite() {
    setNewComp(`composite-${Object.keys(blocks).length + 1}`);
  }

  function saveNewComposite() {
    setBlocks((b) => ({
      ...b,
      [newComp]: {
        type: "composed",
        name: newComp,
        react_flow: {
            initialNodes: [],
            initialEdges: []
        }
      }
    }));
    setActiveBlock(() => newComp);
    setNewComp(() => null);
  }
 
  return (
    <ReactFlowProvider>
      <div className= "parent-flex-box">
        <div className = "header-container">
          <div></div>
          <Button buttonText = "Generate Main Block" className = "secondary-button" onClick={generateCode}/>
        </div>
        <div className = "parent-grid-container">
          <div className = "side-panel">
            <Button onClick={openModal} className = "primary-button" buttonText = "New Code Block"/>
            <Button onClick={openNewComposite} className = "primary-button" buttonText = "New Composite Block"/>

              <ListBlock block={{type: "input", name:"Input"}} addNode={addNodeCounted} setActiveBlock={() => {}}/>
              <ListBlock block={{type: "output", name:"Output"}} addNode={addNodeCounted} setActiveBlock={() => {}}/>

              <div className = "list-container">
                <h3 className = "label-title">Composite Blocks</h3>
                {composedBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted} setActiveBlock={setActiveBlock} setActiveCode={setActiveCode}/>
                )}
              </div>
              <div className = "list-container">
                <h3 className = "label-title">Code Blocks</h3>
                {codeBlocksList.map(([title, block]) => 
                  <ListBlock key={title} block={block} addNode={addNodeCounted} setActiveBlock={setActiveBlock} setActiveCode={setActiveCode}/>
                )}
              </div>
            </div>
            <div className = "canvas">
              <GlobalBlocksContext.Provider value={{global_blocks: blocks, setGlobalBlocks: setBlocks, activeBlock: activeBlock, setActiveBlock: setActiveBlock, setActiveCode: setActiveCode}}>
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
            isOpen={newComp !== null}
            onRequestClose={() => setNewComp(() => null)}
            contentLabel={"New Composite Block"}
            className="new-comp-form"
            overlayClassName="new-block-overlay"
          >
            <div className="modal-header">
              <span className="material-symbols-rounded" onClick={() => setNewComp(() => null)}>close</span>
              <Button type="button" onClick={saveNewComposite} className="primary-button" buttonText="Save & Edit"/>
            </div>
            
            <div className="label-title" style={{marginBottom: "1rem"}}>Block Name:</div>
            <input className="modal-input" placeholder="Block Name" value={newComp === null ? "" : newComp} onChange={(e) => {setNewComp(() => e.target.value)}} />
          </Modal>
          {activeCode !== null &&
            <Modal
            isOpen={activeCode !== null}
            onRequestClose={closeModal}
            contentLabel="New Code Block"
            className="new-block-form"
            overlayClassName="new-block-overlay"
          >
            <div className="modal-header">
              <span className="material-symbols-rounded" onClick={closeModal}>close</span>
              <Button type="button" onClick={handleSubmit} className="primary-button" buttonText="Save"/>
            </div>
            <input className="modal-input" placeholder="Block Name" value={blocks[activeCode].name} onChange={(e) => {
              setBlocks((b) => {
                let blocks = {...b, [e.target.value]: {...b[activeCode], name: e.target.value}};
                delete blocks[activeCode];
                return blocks;
              });
              setActiveCode(e.target.value);
            }} />
            <div className = "code-form">
              <div className="modal-io-row">
                <div className="modal-io-col">
                  <h3 className="modal-section-title">Inputs</h3>
                  {blocks[activeCode].inputs.map((input, index) => 
                    <>
                      <input key={index + "N"} className="modal-input" placeholder="Name" value={blocks[activeCode].inputs[index].name} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].inputs[index].name = e.target.value;
                        newB[activeCode].gen_code = "";
                        e.preventDefault();
                        return newB;
                      })}/>
                      <input key={index + "d"} className="modal-input" placeholder="Description" value={blocks[activeCode].inputs[index].description} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].inputs[index].description = e.target.value;
                        newB[activeCode].gen_code = "";
                        e.preventDefault();
                        return newB;
                      })}/>
                      <div style={{height: "1em"}}></div>
                    </>
                  )}
                  <span className="material-symbols-rounded" onClick={() => {
                    setBlocks((b) => ({...b, [activeCode]: {...b[activeCode], inputs: [...b[activeCode].inputs, {name: "", description: ""}]}}))
                  }}>add</span>
                </div>
                <div className="modal-io-col">
                  <h3 className="modal-section-title">Outputs</h3>
                  {blocks[activeCode].outputs.map((output, index) => 
                    <>
                      <input key={index + "n"} className="modal-input" placeholder="Name" value={blocks[activeCode].outputs[index].name} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].outputs[index].name = e.target.value;
                        newB[activeCode].gen_code = "";
                        e.preventDefault();
                        return newB;
                      })}/>
                      <input key={index + "d"} className="modal-input" placeholder="Description" value={blocks[activeCode].outputs[index].description} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].outputs[index].description = e.target.value;
                        newB[activeCode].gen_code = "";
                        e.preventDefault();
                        return newB;
                      })}/>
                      <div style={{height: "1em"}}></div>
                    </>
                  )}
                  <span className="material-symbols-rounded" onClick={() => {
                    setBlocks((b) => ({...b, [activeCode]: {...b[activeCode], outputs: [...b[activeCode].outputs, {name: "", description: ""}]}}))
                  }}>add</span>
                </div>
              </div>

        
              <h3 className="modal-section-title">Generation Instructions</h3>
              <textarea className="modal-textarea" placeholder="Generation Instructions" value={blocks[activeCode].ai_description} onChange={(e) => setBlocks((b) => ({...b, [activeCode]: {...b[activeCode], ai_description: e.target.value, gen_code: ""}}))}/>

            
              <h3 className="modal-section-title">Test Cases</h3>
              <div className="modal-io-col">
                <div className="modal-io-row">
                  <div className="modal-io-col">
                    <p className="modal-io-label">Input</p>
                    {blocks[activeCode].test_cases.map((test_case, index) =>
                      <input key={index} className="modal-input" placeholder="Test case inputs" value={test_case.inputs} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].test_cases[index].inputs = e.target.value;
                        e.preventDefault();
                        return newB;
                      })}/>
                    )}
                  </div>
                  <div className="modal-io-col">
                    <p className="modal-io-label">Output</p>
                    {blocks[activeCode].test_cases.map((test_case, index) =>
                      <input key={index} className="modal-input" placeholder="Test case inputs" value={test_case.outputs} onChange={(e) => setBlocks((b) => {
                        const newB = JSON.parse(JSON.stringify(b));
                        newB[activeCode].test_cases[index].outputs = e.target.value;
                        e.preventDefault();
                        return newB;
                      })}/>
                    )}
                  </div>
                </div>
                <span className="material-symbols-rounded" onClick={() => {
                    setBlocks((b) => ({...b, [activeCode]: {...b[activeCode], test_cases: [...b[activeCode].test_cases, {inputs: "", outputs: ""}]}}))
                  }}>add</span>

              </div>

            </div>
          </Modal>
        }
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
