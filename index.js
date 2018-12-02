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

                        let column = 0;
                        let isRowEnd = false;
                        
                        while (!isRowEnd) {
                            if (fileOneContentSliced[column] === fileTwoContentSliced[column]) {
                                result.push(fileOneContentSliced[column]);
                                column++;

                                const fileOne = fileOneContentSliced[column];
                                const fileTwo = fileTwoContentSliced[column];

                                console.log('fileOne: ', fileOne);
                                console.log('fileTwo: ', fileTwo);

                                if (fileOne && fileTwo) {
                                    result.push(fileOne, fileTwo);
                                    column++;
                                } else if (fileOne && !fileTwo) {
                                    result.push(fileOne);
                                    column++;
                                } else if (!fileOne && fileTwo) {
                                    result.push(fileTwo);
                                    column++;
                                } else {
                                    secondFileRow++;
                                    isRowEnd = true;
                                }
                            } else {
                                firstFileRow++;
                                isRowEnd = true;
                            }
                        }
                    } else {
                        isFileEnd = true;
                    }
                }

                return result.length ? console.log(result.join(' ')) : console.log('Nothing could be joined');
            }
        } catch (err) {
            console.log(err.message)
        }        
    })
    .parse(process.argv);

