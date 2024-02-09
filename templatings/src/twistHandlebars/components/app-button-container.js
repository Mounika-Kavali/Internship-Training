import React, { Component } from 'react'
import TwistAppButton from './twist-app-button'

export class TwistAppContainer extends Component {
  render() {
    return (
      <section>
         { !this.props.noTitle ? <div className="twist-app-container-header">What do you want to do?</div> : '' }
        <div>
                { this.makeAppButtons(this.props.appButtons, this.props.children) }
        </div>
      </section>
    )
  }
  makeAppButtons(appList, injectedButtons) {
    let appButtons = [];

    for (let i = 0; i < appList.length; i++) {
        const app = appList[i];
        const button = (<TwistAppButton
            key={ app.label }
            name={ app.name }
            label={ app.label }
            route={ app.route }
            onClick={ app.onClick }/>);

        appButtons.push(button);
    }
    if (injectedButtons) {
        appButtons = appButtons.concat(injectedButtons)
    }
    return appButtons;
    }

}

export default TwistAppContainer