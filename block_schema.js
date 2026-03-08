let code_block = {
    id: "10",
    type: "code",
    block_id: 1,
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
}
    
let composed_block = {
    id: "11",
    type: "composed",
    block_id: 2,
    name: "sum3",
    react_flow: {
        initialNodes: [
            {
              id: "12",
              type: "input",
              position: { x: 100, y: 0 },
              data: { value: "in1" },
            },
            {
              id: "13",
              type: "input",
              position: { x: 100, y: 10 },
              data: { value: "in2" },
            },
            {
                id: "10",
                type: "code",
                position: { x: 150, y: 10 },
                data: { value: "sum" },
            },
        ],
        initialEdges: [
            { id: 'edge-1', source: '12', target: '10', sourceHandle: 'a', targetHandle: 'c' },
            { id: 'edge-2', source: '13', target: '10', sourceHandle: 'b', targetHandle: 'd' },
        ]
    }
}

let input_block1 = {
    id: "12",
    type: "input",
    block_id: 3,
    name: "in1"
}

let input_block2 = {
    id: "13",
    type: "input",
    block_id: 3,
    name: "in2"
}

let input_block3 = {
    id: "14",
    type: "input",
    block_id: 3,
    name: "in3"
}

let output_block = {
    id: "15",
    type: "output",
    block_id: 4,
    name: "out"
}
    