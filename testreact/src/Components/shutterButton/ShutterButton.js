import React, { Component } from 'react';
import AudioPlayer from 'react-audio-player';

class ShutterButton extends Component {
  handleButtonClick = () => {
    // Play the shutter sound when the button is clicked
    this.audioPlayer.audioEl.current.play();
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Take Photo</button>
        <AudioPlayer
          ref={(element) => {
            this.audioPlayer = element;
          }}
          src={['camera-capture.mp3']} // Use a relative path
          autoPlay={false}
          controls={false}
        />
      </div>
    );
  }
}

export default ShutterButton;
