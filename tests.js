'use strict';
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {isEqual} = require('lodash');

const JoinUtility = require('./joinUtility');

describe('Join utility tests', () => {
    it('should throw an error if start field position is missing after -1 flag', () => {
        const field = -1;
        assert.throws(() => {JoinUtility.parseInteger('', field)}, Error, `Position to read should be an integer after ${field}`);
    });

    it('should throw an error if start field position is missing after -1 flag', () => {
        const field = -2;
        assert.throws(() => {JoinUtility.parseInteger('', field)}, Error, `Position to read should be an integer after ${field}`);
    });
});