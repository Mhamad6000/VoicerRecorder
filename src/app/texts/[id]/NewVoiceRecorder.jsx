import React, { useState, useEffect, useRef } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { AudioVisualizer, LiveAudioVisualizer } from "react-audio-visualize";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { RiLoader4Line, RiSendPlane2Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export const hasAudioSupport = () => {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.mediaDevices !== "undefined" &&
    typeof navigator.mediaDevices.getUserMedia !== "undefined"
  );
};

const RecordMp3 = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const recorderControls = useAudioRecorder();
  const divRef = useRef(null);

  const start = () => {
    if (!hasAudioSupport()) {
      return;
    }

    if (isBlocked) {
    } else {
      Mp3Recorder?.start()
        ?.then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    if (!hasAudioSupport()) {
      return;
    }

    Mp3Recorder?.stop()
      ?.getMp3()
      ?.then(([buffer, blob]) => {
        setIsRecording(false);
        onSave(blob);
      })
      ?.catch((e) => console.log(e));
  };

  const deleteMp3 = () => {
    if (!hasAudioSupport()) {
      return;
    }

    Mp3Recorder?.stop();
    setIsRecording(false);
    recorderControls.stopRecording();
  };

  useEffect(() => {
    if (divRef.current) {
      setVisualizerWidth(divRef.current.offsetWidth);
    }
  }, []);

  const [visualizerWidth, setVisualizerWidth] = useState(200); // Set an initial width

  return (
    <div
      ref={divRef}
      className={` ${
        isRecording
          ? "absolute left-0 top-0 h-16 w-full bg-gray-100 flex justify-center sm:justify-between items-center z-30"
          : " relative "
      }`}
    >
      {/* {isRecording ? <MicrophoneWave /> : null} */}

      <button
        type="button"
        onClick={() => {
          deleteMp3();
        }}
        className={`${
          isRecording
            ? "absolute bg-red-500 pt-4 sm:relative sm:top-auto bg-transparent text-error border-0 sm:left-auto sm:translate-y-0 top-1/2  inline-flex justify-center items-center -translate-y-1/2 left-5 p-3 rounded-full "
            : "hidden"
        }`}
      >
        <MdDelete className="text-3xl" />
      </button>
      <div className="">
        {recorderControls.mediaRecorder && (
          <LiveAudioVisualizer
            mediaRecorder={recorderControls.mediaRecorder}
            width={visualizerWidth - 250}
            height={60}
            barWidth={2}
            gap={2}
            barColor={"#000000"}
          />
        )}
      </div>
      {/* <button
          type="button"
          className="audio-recorder__button"
          onClick={isRecording ? stop : start}
        ></button> */}
      <button
        type="button"
        className={`bg-brand-500 ${
          isRecording
            ? "absolute sm:relative sm:top-auto sm:right-auto sm:translate-y-0 top-1/2 w-[46px] h-[46px] inline-flex justify-center items-center -translate-y-1/2 right-5 p-3 rounded-full text-white"
            : "relative inline-flex  justify-center items-center p-3 rounded-full text-white "
        }`}
        onClick={() => {
          if (isRecording) {
            recorderControls.stopRecording();
            stop();
          } else {
            recorderControls.startRecording();
            start();
          }
        }}
      >
        {isRecording ? (
          <RiSendPlane2Line className="text-xl rtl:rotate-180" />
        ) : (
          <FaMicrophone className="text-xl " />
        )}
      </button>
    </div>
  );
};

export default RecordMp3;
