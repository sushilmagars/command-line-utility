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
            let firstFileContent = readFile(firstFileName);
            let secondFileContent = readFile(secondFileName);

            // If common elements exists
            if (firstFileContent && secondFileContent) {
                let row = 0;
                let isFileEnd = false;
                
                // if its not file end, go to next row in the file
                while (!isFileEnd) {
                    if(firstFileContent[row] && secondFileContent[row]) {
                        const splitRow = (row) => row.split(' ');
                        const sliceRow = (row, sliceFrom) => row.slice(sliceFrom);
                        
                        let fileOneContent = splitRow(firstFileContent[row]);
                        let fileTwoContent = splitRow(secondFileContent[row]);

                        if (program.firstfilestartposition > 1) {
                            fileOneContent = sliceRow(fileOneContent, program.firstfilestartposition - 1);
                        }

                        if (program.secondfilestartposition > 1) {
                            fileTwoContent = sliceRow(fileTwoContent, program.secondfilestartposition - 1);
                        }

                        let column = 0;

                        if (fileOneContent[column] === fileTwoContent[column]) {
                            let result = [];
                            let isFileRowEnd = false;
        
                            result.push(fileOneContent[column]);
                            column++;

                            // read each row
                            while (!isFileRowEnd) {
                                const fileOne = fileOneContent[column];
                                const fileTwo = fileTwoContent[column];

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
                                    isFileRowEnd = true;
                                    row++;
                                }
                            }
                        } else {
                            isFileEnd = true;
                        }
                    } else {
                        isFileEnd = true;
                    }
                }

                console.log(result);
            }
        } catch (err) {
            console.log(err.message)
        }        
    })
    .parse(process.argv);

