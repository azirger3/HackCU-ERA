function getPromptFromCodeBlock(code_block) {
    let out_str = `I would like to create a python function named ${code_block.name} that does "${code_block.ai_description}".\n It should take the following inputs:\n`;
    for (let i = 0; i < code_block.inputs.length; i++) {
        out_str += `${i+1}: ${code_block.inputs[i].name}, "${code_block.inputs[i].description}"\n`;
    }
    out_str += `It should produce the following outputs:`;
    for (let i = 0; i < code_block.outputs.length; i++) {
        out_str += `\n${i+1}: ${code_block.outputs[i].name}, "${code_block.outputs[i].description}"`;
    }
    return out_str;
}

export default getPromptFromCodeBlock;