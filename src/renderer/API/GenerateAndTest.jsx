import makeAPICall from './API';
import getPromptFromCodeBlock from './GetPrompt';
import WriteToFile from './WriteToFile';
import RunTest from '../Testing/RunTest';

async function GenerateAndTest(block_name, block_dict, overwrite) {
    let block = block_dict[block_name];
    if (block == null) {
        return {error: true, message: `Function ${block_name} not in dict.`};
    }
    const prompt = getPromptFromCodeBlock(block);
    const response = await makeAPICall(prompt);
    console.log(response);
    let file = block.file;
    if (file == "") {
        file = "out.py";
    }
    WriteToFile(file, response, overwrite);
    const err_resp = await RunTest(response, block);
    return err_resp;
}

export default GenerateAndTest;