const IMAGE_HEIGHT = 28;
const IMAGE_WIDTH = 28;

let model;
getModel();
async function getModel() {
    model = await tf.loadLayersModel('./model/model.json');
}

async function out_predict(drawing) {
    result = await doPredictionUser(resizeArray(drawing)).array();
    document.getElementById('result').innerText = "Вероятно вы нарисовали цифру " + result;
}

function resizeArray(inputArray) {
    const INPUT_ARRAY_SIZE = 280;
    const OUTPUT_ARRAY_SIZE = 28;
    let output = [];

    for (let x = 0; x < OUTPUT_ARRAY_SIZE * OUTPUT_ARRAY_SIZE; x++) {
        output.push(0);
    }

    for (let dstInd = 0; dstInd < OUTPUT_ARRAY_SIZE ** 2; dstInd++) {
        let dstY = div(dstInd, OUTPUT_ARRAY_SIZE);
        let dstX = dstInd % OUTPUT_ARRAY_SIZE;
        for (let srcY = dstY * 10; srcY < dstY * 10 + 10; srcY++) {
            for (let srcX = dstX * 10; srcX < dstX * 10 + 10; srcX++) {
                output[dstInd] += inputArray[srcY][srcX];
            }
        }
        output[dstInd] /= 100;
    }
    return output;
}

function doPredictionUser(input) {
    return model.predict(tf.tensor(input).reshape([1, IMAGE_HEIGHT, IMAGE_WIDTH, 1])).argMax(-1);
}