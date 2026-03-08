function nodes_list_to_dictionary(initialNodes) {
    let nodes = {};
    for (const node of initialNodes) {
        nodes[node.id] = node;
    }

    return nodes;
}

// get a list of the names of the inputs to a block in the order they should be called
function get_block_inputs(block) {
    if(block.type === "input") {
        return [];
    } else if (block.type === "output") {
        return [block.data.label];
    } else if (block.type === "code") {
        let names = [];
        for (const out of block.inputs) {
            names.push(out.name);
        }
        return names;
    } else if (block.type === "composed") {
        let names = [];
        for (const node of block.react_flow.initialNodes) {
            if (node.type === "input") {
                names.push(node.data.label);
            }
        }
        return names;
    }

    return [];
}

// get a list of the name of the outputs to a block in the order they should be called
function get_block_outputs(block) {
    if(block.type === "input") {
        return [block.data.label];
    } else if (block.type === "output") {
        return [];
    } else if (block.type === "code") {
        let names = [];
        for (const out of block.outputs) {
            names.push(out.name);
        }
        return names;
    } else if (block.type === "composed") {
        let names = [];
        for (const node of block.react_flow.initialNodes) {
            if (node.type === "output") {
                names.push(node.data.label);
            }
        }
        return names;
    }

    return [];
}

function get_composed_block_outs(block) {
    let names = [];
    let ids = [];
    for (const node of block.react_flow.initialNodes) {
        if (node.type === "output") {
            names.push(node.data.label);
            ids.push(node.id);
        }
    }

    return [names, ids];
}


// Generate python code for a composed node
// blocks is a list of all the blocks available in the program
// generate_name is the name of the block to generate code for
// generate_id must correspond to a type: "composed" node
export function GenerateComposite(blocks, generate_name) {
    let output = "";

    let block = blocks[generate_name];
    // We can only generate code for composed blocks
    if(block.type !== "composed") {
        return output;
    }
    // add function definition
    output += `def ${block.name}(`;
    // find inputs
    let inputs = get_block_inputs(block);
    let input_count = 0;
    for(const inp of inputs) {
        if(input_count > 0) {
            output += ", ";
        }
        output += inp + "_";
        input_count++;
    }
    output += "):\n";

    // generated nodes
    const nodes_by_id = nodes_list_to_dictionary(block.react_flow.initialNodes);

    let generated_node_ids = new Set();

    function generate_node_code(id) {
        // if this node has already been generated we don't need to do anything
        if(generated_node_ids.has(id)) { return; }

        const node = nodes_by_id[id];
        // inputs are defined in the function header so we don't have to generate any code for them
        if (node.type === "input") {
            generated_node_ids.add(node.id);
        } 
        // we need to generate all dependencies of this node
        else if (node.type === "code" || node.type === "composed") {
            const node_inputs = get_block_inputs(blocks[node.data.label]);
            // get node ids and corresponding output names which supply node_inputs
            let supplier_id = new Array(node_inputs.length);
            let supplier_out_name = new Array(node_inputs.length);
            for(const edge of block.react_flow.initialEdges) {
                if(edge.target !== id) continue;

                const input_index = node_inputs.indexOf(edge.targetHandle);
                if (input_index === -1) continue;
                supplier_id[input_index] = edge.source;
                if(nodes_by_id[edge.source].type === "input") {
                    supplier_out_name[input_index] = nodes_by_id[edge.source].data.label;
                    // input arguments don't have id in name since we assume they are unique
                    supplier_id[input_index] = "";
                } else {
                    supplier_out_name[input_index] = edge.sourceHandle;
                }

                // recursively generate the code for this edge
                generate_node_code(edge.source);
            }

            // generate this function call
            const node_outputs = get_block_outputs(blocks[node.data.label]);
            // output names
            if (node_outputs.length == 1) {
                output += `    ${node_outputs[0]}_${node.id} = `;
            } else {
                output += `    `;
                let count = 0;
                for(const out in node_outputs) {
                    if(count > 0) output += ", ";
                    output += `${out}${node.id}`;
                    count++;
                }
                output += " = ";
            }
            // function call
            output += `${node.data.label}(`;
            for(let i = 0; i < supplier_id.length; i++) {
                if(i > 0) output += ", ";
                output += `${supplier_out_name[i]}_${supplier_id[i]}`;
            }
            output += ")\n"

            generated_node_ids.add(node.id);

        } else if(node.type === "output") {
            for (const edge of block.react_flow.initialEdges) {
                if(edge.target !== id) continue;

                generate_node_code(edge.source);
                const target = nodes_by_id[edge.target];
                const source = nodes_by_id[edge.source];
                output += `    ${target.data.label}_${target.id} = ${edge.sourceHandle}_${source.id}\n`;
            }

            generated_node_ids.add(node.id);
        }
    }

    // Generate all output nodes
    let [outputs, outputs_ids] = get_composed_block_outs(block);
    for(let i = 0; i < outputs.length; i++) {
        generate_node_code(outputs_ids[i]);
    }

    if(outputs.length == 1) {
        output += `    return ${outputs[0]}_${outputs_ids[0]}\n`;
    } else {
        output += `    return `;
        for(let i = 0; i < outputs.length; i++) {
            if(i > 0) output += ", ";
            output += `${outputs[i]}_${outputs_ids[i]}`;
        }
        output += "\n";
    }

    return output;
}

export default GenerateComposite;