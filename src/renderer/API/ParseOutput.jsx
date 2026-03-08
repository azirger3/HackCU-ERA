function ParseOutput(file_str) {
    const lines = file_str.split('\n');
    const importRegex = /^(import\s+|from\s+[\w.]+\s+import\s+)/;

    const imports = [];
    const body = [];

    lines.forEach(line => {
        if (importRegex.test(line.trim())) {
            imports.push(line.trim());
        } else {
            body.push(line);
        }
    });
    
    const uniqueImports = [...new Set(imports)];
    return [...uniqueImports, "", ...body].join('\n').trim();
}

export default ParseOutput;