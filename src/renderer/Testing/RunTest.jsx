async function RunTest(code_str, code_block) {
    // Takes a generated string of python code and a code block with test cases and runs them to check for correctness.
    let run_test_str = `def main():\n`;
    for (let i = 0; i < code_block.test_cases.length; i++) {
        let test_case_inputs = code_block.test_cases[i].inputs.split(',');
        let test_case_outputs = code_block.test_cases[i].outputs.split(',');
        if (test_case_outputs.length != code_block.outputs.length) {
            return {error: true, message: `Incorrect number of outputs provided in test case ${i}.`};
        } else if (test_case_inputs.length != code_block.inputs.length) {
            return {error: true, message: `Incorrect number of inputs provided in test case ${i}.`};
        }
        for (let j = 0; j < code_block.inputs.length; j++) {
            run_test_str += `\ttest_${i}_${code_block.inputs[j].name} = ${test_case_inputs[j]}\n`;
        }
        
        run_test_str += `\t(`;
        for (let j = 0; j < code_block.outputs.length; j++) {
            run_test_str += `test_${i}_${code_block.outputs[j].name}, `;
        }
        run_test_str = run_test_str.slice(0,-2) + `) = ${code_block.name}(`
        for (let j = 0; j < code_block.inputs.length; j++) {
            run_test_str += `test_${i}_${code_block.inputs[j].name}, `;
        }
        run_test_str = run_test_str.slice(0,-2) + `)\n`;

        for (let j = 0; j < code_block.outputs.length; j++) {
            run_test_str += `\tassert test_${i}_${code_block.outputs[j].name} == ${test_case_outputs[j]}, f'Expected {${test_case_outputs[j]}}, but got {test_${i}_${code_block.outputs[j].name}}'\n`;
        }
    }   
    run_test_str += `\nmain()`;

    const code_test_str = code_str + run_test_str;
    const result = await window.run_test.RunPythonCode(`${code_block.name}_test`,code_test_str);
    
    if (result.exitCode != 0) {
        return {error: true, message: result.err_out};
    }
    return {error: false, message: ""};
}

export default RunTest;