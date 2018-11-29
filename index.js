#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

program
    .arguments('<firstFileName>') 
    .arguments('<secondFileName>')
    .option('-1, --firstField <n>', 'An integer argument', parseInt)
    .option('-2, --secondField <n>', 'An integer argument', parseInt)
    .action(function(firstFileName, secondFileName, fields, field) {
        try {
            const readFile = (filename) => fs.readFileSync(filename, {encoding: 'utf8'}).split('\n');
            
            // Read file content from both files
            const firstFileContent = readFile(firstFileName);
            const secondFileContent = readFile(secondFileName);


            // If common elements exists
            if (firstFileContent && secondFileContent) {
                let row = 0;
                let isFileEnd = false;
                
                while (!isFileEnd) {
                    let fileOneContent;
                    let fileTwoContent;
                    
                    if(firstFileContent[row] && secondFileContent[row]) {
                        fileOneContent = firstFileContent[row].split(' ');
                        fileTwoContent = secondFileContent[row].split(' ');

                        let column = 0;

                        if (fileOneContent[column] === fileTwoContent[column]) {
                            let result = [];
                            let isFileRowEnd = false;
        
                            result.push(fileOneContent[column]);
                            column++;

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
        
                            console.log(result);
                        } else {
                            isFileEnd = true;
                        }
                    } else {
                        isFileEnd = true;
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }        
    })
    .parse(process.argv);

