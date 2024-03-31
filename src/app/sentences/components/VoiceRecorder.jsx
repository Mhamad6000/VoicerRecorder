"use client";
import { useEffect, useState } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { globalEndpoits } from "@/app/lib/endpoints";
import MicRecorder from "mic-recorder-to-mp3";
import { hasAudioSupport } from "./hasAudioSupport";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const VoicerRecorder = ({ sentenceId }) => {
  // Initialize the recorder controls using the hook
  const [mp3audio, setMp3audio] = useState(null);
  const queryClient = useQueryClient();
  const { recordedBlob, ...recorderControls } = useVoiceVisualizer();
  const postSentenceMutation = useMutation({
    mutationFn: globalEndpoits.postSentence,
  });
  const {
    // ... (Extracted controls and states, if necessary)
    error,
    audioRef,
    isAvailableRecordedAudio,
    startRecording,
    stopRecording,
    isRecordingInProgress,
    clearCanvas,
    isPausedRecordedAudio,
    togglePauseResume,
  } = recorderControls;

  // Get the recorded audio blob
  useEffect(() => {
    if (!recordedBlob) return;
  }, [recordedBlob, error]);
  const start = () => {
    if (!hasAudioSupport()) {
      return;
    } else {
      Mp3Recorder?.start()
        ?.then(() => {})
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
        setMp3audio(blob);
      })
      ?.catch((e) => console.log(e));
  };

  const deleteMp3 = () => {
    if (!hasAudioSupport()) {
      return;
    }
    setMp3audio(null);
    Mp3Recorder?.stop();

    recorderControls.stopRecording();
  };

  // Get the error when it occurs
  useEffect(() => {
    if (!error) return;

    console.error(error);
  }, [error]);
  function postSentenceFunction(values, { resetForm }) {
    const file = new File([recordedBlob], "file.mp3");

    postSentenceMutation.mutate(
      {
        file: file,
        sentenceId: sentenceId,
      },
      {
        onError: (err) => {
          console.log(err);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "!bg-secondary",
            transition: Bounce,
          });
        },
        onSuccess: () => {
          resetForm();
          toast.success("User created successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "!bg-secondary",
            transition: Bounce,
          });
          router.push("/auth/login");
          queryClient?.invalidateQueries("sentences");
        },
      }
    );
  }
  return (
    <div className="">
      <VoiceVisualizer ref={audioRef} controls={recorderControls} />
      <div className="flex justify-center items-center gap-5">
        {isAvailableRecordedAudio && (
          <button
            className="rounded-full bg-quaternary h-14 w-14 flex justify-center items-center text-white "
            onClick={togglePauseResume}
          >
            {isPausedRecordedAudio ? (
              <FaPlay className="text-xl" />
            ) : (
              <FaStop className="text-xl" />
            )}
          </button>
        )}

        {!isRecordingInProgress && !isAvailableRecordedAudio && (
          <button
            className="rounded-full bg-quaternary h-14 w-14 flex justify-center items-center text-white "
            onClick={() => {
              startRecording();
              start();
            }}
          >
            <MdKeyboardVoice className="text-3xl" />
          </button>
        )}
        {isRecordingInProgress && (
          <button
            className="rounded-full bg-quaternary h-14 w-14 flex justify-center items-center text-white "
            onClick={() => {
              stopRecording();
              stop();
            }}
          >
            <FaStop className="text-xl" />
          </button>
        )}
        <button
          className="rounded-full bg-quaternary h-14 w-14 flex justify-center items-center text-white "
          onClick={() => {
            clearCanvas();
            deleteMp3();
          }}
        >
          <FaTrash className="text-xl" />
        </button>
      </div>

      <Formik
        initialValues={{
          file: "",
          sentenceId: "",
        }}
        onSubmit={postSentenceFunction}
      >
        <Form className="mt-5 flex justify-center items-center">
          <div className="">
            {isAvailableRecordedAudio && (
              <button
                type="submit"
                className="bg-quaternary text-primary py-2 px-10 rounded-md "
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default VoicerRecorder;
