#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

program
    .arguments('<firstFileName>') 
    .arguments('<secondFileName>')
    .option('-1, --firstfilestartposition <n>', 'An integer argument', Number.parseInt)
    .option('-2, --secondfilestartposition <n>', 'An integer argument', Number.parseInt)
    .action(function(firstFileName, secondFileName) {
        try {
            const readFile = (filename) => fs.readFileSync(filename, {encoding: 'utf8'}).split('\n');
            
            // Read file content from both files
            let firstFile = readFile(firstFileName);
            let secondFile = readFile(secondFileName);

            let maxLength = Math.max(secondFile.length, secondFile.length);

            if (firstFile && secondFile) {
                let result = [];
                let firstFileRow = 0;
                let secondFileRow = 0;
                let isFileEnd = false;
                
                while(!isFileEnd) {
                    if (firstFile[firstFileRow] && secondFile[secondFileRow]) {
                        const splitRow = (row) => row.split(' ');
                        const sliceRow = (row, sliceFrom) => row.slice(sliceFrom);
                        
                        let fileOneContent = splitRow(firstFile[firstFileRow]);
                        let fileTwoContent = splitRow(secondFile[secondFileRow]);

                        let fileOneContentSliced, fileTwoContentSliced;

                        fileOneContentSliced = program.firstfilestartposition > 1 ?
                            sliceRow(fileOneContent, program.firstfilestartposition - 1) :
                            fileOneContent; 

                        fileTwoContentSliced = program.secondfilestartposition > 1 ?
                            sliceRow(fileTwoContent, program.secondfilestartposition - 1) :
                            fileTwoContent; 

                        let isRowEnd = false;
                        
                        while (!isRowEnd) {
                            if (fileOneContentSliced[0] === fileTwoContentSliced[0]) {
                                let line = '';
                                const concatLine = (itemToConcat) => {
                                    return line.concat(itemToConcat);
                                }

                                for (let i = 0; i < fileOneContent.length; i++) {
                                    line = concatLine(fileOneContent[i] + ' ');
                                }

                                for (let i = 0; i < fileTwoContent.length; i++) {
                                    if (fileTwoContent[i] !== fileOneContentSliced[0]) {
                                        line = concatLine(fileTwoContent[i] + ' ');
                                    }
                                }

                                result.push(line);
                                secondFileRow++;
                                isRowEnd = true;
                            } else if (firstFileRow !== secondFileRow) {
                                firstFileRow++;
                                secondFileRow = firstFileRow;
                                isRowEnd = true;
                            } else {
                                isRowEnd = true;
                                isFileEnd = true;
                            }
                        }
                    } else {
                        isFileEnd = true;
                    }
                }

                const printResult = (arr) => {
                    for (let i = 0; i < arr.length; i++) {
                        console.log(arr[i]);
                    }
                }

                return result.length ? printResult(result) : console.log('Nothing could be joined');
            }
        } catch (err) {
            console.log(err.message)
        }        
    })
    .parse(process.argv);

