// ScreenRecording.jsx
import React from 'react';
import RecordRTC from 'recordrtc';
import ScreenRecordPreviewModal from './ScreenRecordPreviewModal';
import { Button, Row, Col, Container, Card, CardBody } from 'reactstrap';
import Topbar from './Topbar';

let recorder;

class ScreenRecording extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordedVideoUrl: null,
      isOpenVideoModal: false,
      screen: null,
      camera: null,
      recorder: null,
      startDisable: false,
      stopDisable: true,
      loadModal: false,
    };
  }

  captureCamera = (cb) => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false, // make it true for video
    }).then(cb);
  };

  startScreenRecord = async () => {
    await this.setState({ stopDisable: false, startDisable: true });
    this.captureScreen((screen) => {
      this.captureCamera(async (camera) => {
        screen.width = window.screen.width;
        screen.height = window.screen.height;
        screen.fullcanvas = true;
        camera.width = 320;
        camera.height = 240;
        camera.top = screen.height - camera.height;
        camera.left = screen.width - camera.width;
        this.setState({
          screen: screen,
          camera: camera
        });
        recorder = RecordRTC([screen, camera], {
          type: 'video',
        });
        recorder.startRecording();
        recorder.screen = screen;
      });
    });
  };

  captureScreen = (callback) => {
    this.invokeGetDisplayMedia((screen) => {
      this.addStreamStopListener(screen, () => {});
      callback(screen);
    }, (error) => {
      console.error(error);
      alert('Unable to capture your screen. Please check console logs.\n' + error);
      this.setState({ stopDisable: true, startDisable: false });
    });
  };

  stopLocalVideo = async (screen, camera) => {
    [screen, camera].forEach(async (stream) => {
      stream.getTracks().forEach(async (track) => {
        track.stop();
      });
    });
  };

  invokeGetDisplayMedia = (success, error) => {
    var displaymediastreamconstraints = {
      video: {
        displaySurface: 'monitor', // monitor, window, application, browser
        logicalSurface: true,
        cursor: 'always' // never, always, motion
      }
    };
    displaymediastreamconstraints = {
      video: true,
      audio: true,
    };
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    } else {
      navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
  };

  addStreamStopListener = (stream, callback) => {
    stream.addEventListener('ended', () => {
      callback();
      callback = () => {};
    }, false);
    stream.addEventListener('inactive', () => {
      callback();
      callback = () => {};
    }, false);
    stream.getTracks().forEach((track) => {
      track.addEventListener('ended', () => {
        callback();
        callback = () => {};
      }, false);
      track.addEventListener('inactive', () => {
        callback();
        callback = () => {};
      }, false);
    });
    stream.getVideoTracks()[0].onended = () => {
      this.stop();
    };
  };

  stop = async () => {
    await this.setState({ startDisable: true });
    recorder.stopRecording(this.stopRecordingCallback);
  };

  stopRecordingCallback = async () => {
    await this.stopLocalVideo(this.state.screen, this.state.camera);
    let recordedVideoUrl;
    if (recorder.getBlob()) {
      this.setState({
        recordPreview: recorder.getBlob()
      });
      recordedVideoUrl = URL.createObjectURL(recorder.getBlob());
    }
    this.setState({
      recordedVideoUrl: recordedVideoUrl,
      screen: null,
      isOpenVideoModal: true,
      startDisable: false,
      stopDisable: true,
      camera: null,
    });
    recorder.screen.stop();
    recorder.destroy();
    recorder = null;
  };

  videoModalClose = () => {
    this.setState({
      isOpenVideoModal: false
    });
  };

  openModal = async () => {
    await this.setState({ loadModal: false });
  };

  render() {
    window.onbeforeunload = this.openModal;
    return (
      <div>
        <Topbar sr={true} />
        <Container className="pt-3">
          <div className="centerCard">
            <div className="shadow">
              <Card>
                <CardBody>
                  <Row>
                    <Col sm={12}>
                      <h3 className='text-dark pb-2 textShadowHead text-center'>Screen Recording</h3>
                      <h5 className="text-primary my-2">Follow the below steps to do screen recording</h5>
                      <p className="mt-0 mb-1 textShadowPara">*</p>
                      <p className="mt-0 mb-1 textShadowPara pr-1">* To start recording click on start recording</p>
                      <p className="mt-0 mb-1 textShadowPara pl-1">* Select the screen type to start recording</p>
                      <p className="pb-3 mt-0 mb-1 textShadowPara">* To stop recording click on stop recording</p>
                    </Col>
                  </Row>
                  <Col sm={12} className="text-center">
                    <Button color='primary' outline onClick={() => this.startScreenRecord()} disabled={this.state.startDisable}>Start Recording</Button>
                    <Button color='primary' onClick={() => this.stop()} disabled={this.state.stopDisable}>Stop Recording</Button>
                    {this.state.startDisable && <h3 className='text-success pt-2'>Recording..</h3>}
                    {this.state.startDisable && <h3 className='text-warning pt-2'>Please don't refresh the page.</h3>}
                  </Col>
                </CardBody>
              </Card>
            </div>
          </div>
          <ScreenRecordPreviewModal
            isOpenVideoModal={this.state.isOpenVideoModal}
            videoModalClose={this.videoModalClose}
            recordedVideoUrl={this.state.recordedVideoUrl}
            downloadScreenRecordVideo={this.downloadScreenRecordVideo}
            recorder={this.state.recordPreview}
          />
        </Container>
      </div>
    );
  }
}

export default ScreenRecording;
