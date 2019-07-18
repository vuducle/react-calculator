import React, { Component } from 'react';
import { ResultPanel } from './ResultPanel';
import Button from './Button';

import '../static/css/styles.scss'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftOperand: '',
            rightOperand: '',
            result: '',
            operator: '',
            operatorPressed: false,
            equalPressed: false, 
            isCalculated: false,
            numberPressed: false,
            hasLeftOperand: false
        }
        this.handleButtonPressed = this.handleButtonPressed.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    /**
     * Handles keyboard input!
     * @param {*} e - keyboard input
     */
    onKeyPressed(e) {
        const value = e.key;
        if (e.keyCode === 27) this.clearCalculator();
        if (e.keyCode === 13) this.equalPressed();
        this.pressedOnOperator(value);
        this.setNumbers(value);

        // calculates the result, if there was no previous calculation yet AND 
        // when there exits a left operand and AT LEAST an operator
        if (e.keyCode === 13 && !this.state.isCalculated &&
            this.state.leftOperand.length > 0 && this.state.operatorPressed &&
            this.state.result.length > 0) {
            setTimeout(() => {
                this.setState({
                    rightOperand: this.state.result
                }, function() {
                    this.calculateResult();
                })
            }, 500)
        }   
    }

    /**
     * Handles the button inputs!
     * @param {*} e - button value
     */
    handleButtonPressed(e) {
        const value = e.target.value;
        if (value === 'C') this.clearCalculator();
        if (value === '=' || value.keyCode === 13) this.equalPressed();
        this.pressedOnOperator(value);
        this.setNumbers(value);

        // calculates the result, if there was no previous calculation yet AND 
        // when there exits a left operand and AT LEAST an operator
        if (value === '=' && !this.state.isCalculated &&
            this.state.leftOperand.length > 0 && this.state.operatorPressed &&
            this.state.result.length > 0) {
            setTimeout(() => {
                this.setState({
                    rightOperand: this.state.result
                }, function() {
                    this.calculateResult();
                })
            }, 500)
           
        }   
    }

    /**
     * Applies number to the window panel.
     * Resets the window, when some conditions occur.
     * @param {{0 - 9}} value 
     */
    setNumbers(value) {
        if (!Number.isInteger(parseInt(value))) return;
        if (this.state.equalPressed && this.state.isCalculated === false && this.state.operatorPressed === false) {
            this.setState({
                result: '',
                equalPressed: false,
                isCalculated: false
            })
        }
        if (!this.state.isCalculated && this.state.numberPressed &&
            !this.state.operatorPressed) {
            this.setState({
                result: '' + value,
                isCalculated: false
            })
        }
        if (this.state.isCalculated && (!this.state.operatorPressed)) {
            this.setState({
                result: '' + value,
                isCalculated: false
            })
        } 
        if (!this.state.isCalculated && !this.state.equalPressed) {
            this.setState({
                numberPressed: true,
                result: this.state.result + value
            }, function() {   
            });
        }
    }
    
    /**
     * Gets called, when '=' was pressed!
     */
    equalPressed() {
        this.setState({
            equalPressed: true
        })
    }
    
    /**
     * Applied given operator to the state 'oerator' => later for calculation
     * @param {'+', '-', '*', '/'} operator, valid operator 
     */
    pressedOnOperator(operator) {
        if ((operator === '+' ||
                operator === '*' ||
                operator === '-' ||
                operator === '/')) {
                    this.setState({
                        operator: operator,
                        operatorPressed: true,
                        numberPressed: false,
                        isCalculated: false,
                        leftOperand: this.state.result,
                        result: ''
                    })
        } 
    }

    /**
     * Resets the calculator!
     */
    clearCalculator() {
        this.setState({
            leftOperand: '',
            rightOperand: '',
            result: '',
            operator: '',
            operatorPressed: false,
            equalPressed: false, 
            isCalculated: false,
            numberPressed: false
        })
    }

    /**
     * Responsible for calculate two operands, if those two and an operator exits. Get called when '=' is pressed!
     */
    calculateResult() {
        const leftOperand = Number(this.state.leftOperand);
        const rightOperand = Number(this.state.rightOperand);
        switch(this.state.operator) {
            case '+':
                this.setState({
                    result:'' + (leftOperand + rightOperand)
                })
                break;
            case '-':
                this.setState({
                    result: '' + (leftOperand - rightOperand)
                })
                break;
            case '*':
                this.setState({
                    result: '' + (leftOperand * rightOperand)
                })
                break;
            case '/':
                this.setState({
                    result: '' + (leftOperand / rightOperand)
                })
                break;
            default:
                break;
        }
        this.setState({
            rightOperand: '',
            leftOperand: '',
            operator: '',
            equalPressed: false,
            operatorPressed: false,
            isCalculated: true,
            numberPressed: false
        })
    }

    render() {
        return <div onKeyDown={this.onKeyPressed}>
            <ResultPanel calcValue={this.state.result} className="result-panel"/>
            <br/>
            <div className="panel-buttons-grid">
                <Button value={7} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={8} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={9} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={'-'} className="operator-button" onClick={this.handleButtonPressed}/>
                
                <Button value={4} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={5} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={6} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={'+'} className="operator-button" onClick={this.handleButtonPressed}/>
                
                <Button value={1} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={2} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={3} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={'*'} className="operator-button" onClick={this.handleButtonPressed}/>
                
                <Button value={0} className="number-button" onClick={this.handleButtonPressed}/>
                <Button value={'C'} className="operator-button" onClick={this.handleButtonPressed}/>
                <Button value={'/'} className="operator-button" onClick={this.handleButtonPressed}/>
                <Button value={'='} className="operator-button" onClick={this.handleButtonPressed}/>
            </div>
            
        </div>
    }
}

export default Calculator;
