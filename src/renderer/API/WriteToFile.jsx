async function WriteToFile(file_name, content, overwrite) {
    const result = await window.write_to_file.saveFile(file_name, content, overwrite);
    
    if (!result.success) {
        console.error("File write failed", result.error, "\n");
    }
}

export default WriteToFile;