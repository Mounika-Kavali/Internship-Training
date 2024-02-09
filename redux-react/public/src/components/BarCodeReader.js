import React, { Component } from 'react'

export class BarCodeReader extends Component {
    constructor() {
        super();
        this.dispatchManualBarcode = this.dispatchManualBarcode.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        
        // this.state = {
        //     inputValue:'',
        // }
    }

    componentWillMount() {
        this.setState({ inputValue: '' });
    }

    componentWillUnmount() {
        this.setState({ inputValue: '' });
    }


    
    inputChangeHandler(event) {
        this.setState({ inputValue: event.target.value });
       
    }
    dispatchManualBarcode() {
        this.props.onScan(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

  render() {
    return (
      <>
        <div className="manual-barcode-reader">
            <span>Enter barcode text then click Apply:</span> <br/>
            <input type="text"
                   onChange={this.inputChangeHandler}
                   placeholder="Manual Barcode"
                   name="inputValue"
                   value={ this.state.inputValue }/>
            <button color="link" onClick={ this.dispatchManualBarcode }>Apply</button>
        </div>
      </>
    )
  }
}

export default BarCodeReader