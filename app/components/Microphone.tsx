'use client'

import { useState, useEffect, useRef } from 'react'
import { MicrophoneIcon } from '@heroicons/react/24/outline'

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export default function Microphone() {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  const startRecording = () => {
    setIsRecording(true)

    recognitionRef.current = new window.webkitSpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true

    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0]
      console.log(event.results)
      setTranscript(transcript)
    }

    recognitionRef.current.start()
  }

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }
  console.log(transcript)
  return (
    <div className="flex justify-center">
      <p>{transcript}</p>
      <button onClick={handleRecording}>
        {isRecording ? (
          <MicrophoneIcon className="h-10 w-10 text-red-600" />
        ) : (
          <MicrophoneIcon className="h-10 w-10" />
        )}
      </button>
    </div>
  )
}
