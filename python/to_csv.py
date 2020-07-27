with open('train-labels.idx1-ubyte', 'rb') as labels_file:
    with open('train-images.idx3-ubyte', 'rb') as images_file:
        with open('train-lil.csv', 'w', encoding='ascii') as out_file:
            print('label, ', file=out_file, end = '')
            print(*range(28*28), sep=',', file=out_file)
            labels_file.read(8)
            images_file.read(16)
            for i in range(500):
                label = int.from_bytes(labels_file.read(1), byteorder='little')
                pixels = []
                for j in range(28):
                    for t in range(28):
                        pixels.append(int.from_bytes(images_file.read(1), byteorder='little'))
                print(label, end=',', file=out_file)
                print(*pixels, sep=',', file=out_file)
