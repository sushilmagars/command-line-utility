#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

class JoinUtility {
    constructor() {}

    parseInteger(val) {
        if (Number.isNaN(Number.parseInt(val))) {
            throw new Error('Should be an integer');
        }
    }

    /**
     * @function - process
     * [A] Read both files
     *  a. If no options are passed in
     *      1a. If strings are same
     *          -> concat sentence on first file with the sentence on second file by exluding common string
     *          -> go to next row on second file
     *          -> check if the string on the second file also matches first string of the first file
     *              ->> If same, repeat step 1a
     *              ->> If not same, go to next row on first file and repeat step a
     *      2a. If string are not same, return result.
     *  b. If -1 and -2 options are passed in
     *      1b. Start reading both files from given position e.g. -1 2 means start reading first file from 2nd word
     *      2b. If strings are same on both first and second file
     *          -> concat sentence on first file with the sentence on second file by exluding common string
     *          -> go to next row on second file
     *          -> check if the string on the second file also matches first string of the first file
     *              ->> If same, repeat step 2b
     *              ->> If not same, go to next row on first file and repeat step b
     *      3b. If string are not same, return result.
     */
    process() {
        try {
            program
            .arguments('<firstFileName>') 
            .arguments('<secondFileName>')
            .option('-1 firstfilestartposition <n>', 'integer', this.parseInteger)
            .option('-2 secondfilestartposition <n>', 'integer', this.parseInteger)
            .action(function(firstFileName, secondFileName) {
                    const readFile = (filename) => fs.readFileSync(filename, {encoding: 'utf8'}).split('\n');
                    
                    // Read file content from both files
                    let firstFile = readFile(firstFileName);
                    let secondFile = readFile(secondFileName);

                    if (firstFile && secondFile) {
                        let result = [];
                        let firstFileRow = 0;
                        let secondFileRow = 0;
                        let isFileEnd = false;
                        
                        // start reading both files
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
            })
            .parse(process.argv);
        } catch (err) {
            console.log(err.message)
        }
    }
}

const joinUtility = new JoinUtility();
joinUtility.process();
