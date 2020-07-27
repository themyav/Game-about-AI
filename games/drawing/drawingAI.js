console.log('ml5 version:', ml5.version);

const options = {
    task: 'classification' // or 'regression'
}

const nn = ml5.neuralNetwork(options);

const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
}

nn.load(modelDetails, modelLoaded)

function modelLoaded() {
    console.log("model loaded");
    // continue on your neural network journey
    // use nn.classify() for classifications or nn.predict() for regressions
}

function out_predict() {
    console.log('Вы нарисовали шк');
}

function resizeArray(inputArray) {
    const INPUT_ARRAY_SIZE = 280;
    const OUTPUT_ARRAY_SIZE = 28;
    const COMRESSION_RATE = INPUT_ARRAY_SIZE / OUTPUT_ARRAY_SIZE;
    let output = [];

    for (let x = 0; x < OUTPUT_ARRAY_SIZE * OUTPUT_ARRAY_SIZE; x++) {
        output.push(0);
    }

    for (let y = 0; y < OUTPUT_ARRAY_SIZE; y++) {
        for (let x = 0; x < OUTPUT_ARRAY_SIZE; x++) {
            let ind = div(y, COMRESSION_RATE) * OUTPUT_ARRAY_SIZE + div(x, COMRESSION_RATE);
            output[ind] += inputArray[y][x];
        }
    }

    for (let x = 0; x < OUTPUT_ARRAY_SIZE * OUTPUT_ARRAY_SIZE; x++) {
        output[x] /= (COMRESSION_RATE * COMRESSION_RATE);
    }
    return output;
}