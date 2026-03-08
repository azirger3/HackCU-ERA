async function WriteToFile(file_path, content) {
    const result = await window.write_to_file.saveFile(file_path, content);
    
    if (!result.success) {
        console.error("File write failed", result.error, "\n");
    }
}

export default WriteToFile;