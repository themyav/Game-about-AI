let model;

run();

async function getThis_Model() {
    model = await tf.loadLayersModel('./model/model.json');
    console.log(model);
}

function out_predict(drawing) {
    //resizeArray(drawing);
    console.log(doPredictionUser(resizeArray(drawing)));
    doPredictionUser(resizeArray(drawing)).print()
}

function handle_predict_result(result) {
}

function resizeArray(inputArray) {
    const INPUT_ARRAY_SIZE = 280;
    const OUTPUT_ARRAY_SIZE = 28;
    const COMRESSION_RATE = INPUT_ARRAY_SIZE / OUTPUT_ARRAY_SIZE;
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

async function showExamples(data) {
    // Create a container in the visor
    const surface =
        tfvis.visor().surface({name: 'Input Data Examples', tab: 'Input Data'});

    // Get the examples
    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];

    // Create a canvas element to render each example
    for (let i = 0; i < numExamples; i++) {
        const imageTensor = tf.tidy(() => {
            // Reshape the image to 28x28 px
            return examples.xs
                .slice([i, 0], [1, examples.xs.shape[1]])
                .reshape([28, 28, 1]);
        });

        const canvas = document.createElement('canvas');
        canvas.width = 28;
        canvas.height = 28;
        canvas.style = 'margin: 4px;';
        await tf.browser.toPixels(imageTensor, canvas);
        surface.drawArea.appendChild(canvas);

        imageTensor.dispose();
    }
}

async function run() {
    getThis_Model();
    const data = new MnistData();
    await data.load();
    //await showExamples(data);
    //tfvis.show.modelSummary({name: 'Model Architecture'}, model);
    //showAccuracy(model, data);
    //showConfusion(model, data);
}

const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function doPrediction(model, data, testDataSize = 500) {
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const testData = data.nextTestBatch(testDataSize);
    console.log(testData);
    const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    const labels = testData.labels.argMax(-1);
    const preds = model.predict(testxs).argMax(-1);

    testxs.dispose();
    return [preds, labels];
}

function doPredictionUser(input) {
    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const testData = tf.tensor(input);
    //const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
    //const labels = testData.labels.argMax(-1);
    const preds = model.predict(tf.tensor(input).reshape([1, 28, 28, 1])).argMax(-1);
    //preds.dispose();
    return preds;
}


async function showAccuracy(model, data) {
    const [preds, labels] = doPrediction(model, data);
    const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
    const container = {name: 'Accuracy', tab: 'Evaluation'};
    tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

    labels.dispose();
}

async function showConfusion(model, data) {
    const [preds, labels] = doPrediction(model, data);
    const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
    const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
    tfvis.render.confusionMatrix(
        container, {values: confusionMatrix}, classNames);

    labels.dispose();
}