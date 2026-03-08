import makeAPICall from './API';
import getPromptFromCodeBlock from './GetPrompt';
import WriteToFile from './WriteToFile';
import RunTest from '../Testing/RunTest';

async function GenerateAndTest(block_name, block_dict, overwrite, do_test) {
    let block = block_dict[block_name];
    if (block == null) {
        return {error: true, message: `Function ${block_name} not in dict.`};
    }
    const prompt = getPromptFromCodeBlock(block);
    const response = await makeAPICall(prompt);

    const lines = response.split('\n');
    let body = [];

    lines.forEach(line => {
        if(!line.trim().startsWith("```")) {
            body.push(line);
        }
    });

    const response_clean = lines.join('\n');

    /* console.log(response_clean);
    let file = block.file;
    if (file == "") {
        file = "out.py";
    }
    WriteToFile(file, response_clean, overwrite); */
    
    const err_resp = await RunTest(response_clean, block);
    return [response_clean, err_resp];
}

export default GenerateAndTest;