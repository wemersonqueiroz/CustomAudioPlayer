import React, { useState, useRef, useEffect } from "react"
import styles from "../styles/AudioPlayer.module.css"
import { FaArrowLeft } from "react-icons/Fa"
import { FaArrowRight } from "react-icons/Fa"
import { FaPlayCircle } from "react-icons/Fa"
import { FaPauseCircle } from "react-icons/Fa"

const AudioPlayer = () => {
  // Music State
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  // References

  // references
  const audioPlayer = useRef() //Reference audio component
  const progressBar = useRef() // Reference progress bar
  const animationRef = useRef()

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = secs => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const PlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30)
    changeRange()
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30)
    changeRange()
  }

  return (
    <div
      className={`flex flex-col-reverse justify-center items-center h-96 max-h-content  w-11/12 px-6 bg-clrLight rounded-xl hover:shadow-xl hover:shadow-clrRed/50 transition-all  ${styles.audioPlayer}`}>
      {/* AUDIO LINK */}
      <audio
        ref={audioPlayer}
        src="https://streamus.1010diy.com/download?url=https%3A%2F%2Frr5---sn-nx5s7n76.googlevideo.com%2Fvideoplayback%3Fexpire%3D1654466549%26ei%3DldOcYsOTDIORsfIPuc262Ao%26ip%3D35.160.149.189%26id%3Do-AFgYHvTdm7fCerdHiG_mU1kxPSrMtccI8VZAcNo4xjm0%26itag%3D140%26source%3Dyoutube%26requiressl%3Dyes%26mh%3Da1%26mm%3D31%252C26%26mn%3Dsn-nx5s7n76%252Csn-o097znsd%26ms%3Dau%252Conr%26mv%3Dm%26mvi%3D5%26pl%3D13%26pcm2%3Dno%26gcr%3Dus%26initcwndbps%3D1092500%26vprv%3D1%26mime%3Daudio%252Fmp4%26gir%3Dyes%26clen%3D6187761%26dur%3D382.293%26lmt%3D1553226952665749%26mt%3D1654444623%26fvip%3D5%26keepalive%3Dyes%26fexp%3D24001373%252C24007246%26c%3DANDROID%26txp%3D5535432%26sparams%3Dexpire%252Cei%252Cip%252Cid%252Citag%252Csource%252Crequiressl%252Cpcm2%252Cgcr%252Cvprv%252Cmime%252Cgir%252Cclen%252Cdur%252Clmt%26sig%3DAOq0QJ8wRAIgUNhhONJPpaAyUxW-4QCJrIpoi2fv6CCX-dcoLUxVF6MCIFETUedudv2OhiRzCjfq0Ulb9_DkJqkdL8z4OkYAPclh%26lsparams%3Dmh%252Cmm%252Cmn%252Cms%252Cmv%252Cmvi%252Cpl%252Cinitcwndbps%26lsig%3DAG3C_xAwRAIgBAnsd6eE1cmT17j7dCLmZo9_rFInp9TujoE0puLZ3TcCIATWz3L9hTC1zWTxMaoK44DU4bAxXZOLNGOJ3QbhGkEy&quality=128k&ext=mp3&title=Ludovico%20Einaudi%20-%20Experience"
        preload="metadata"></audio>

      {/* -------------PLAYER BUTTONS ---------------- */}
      <div className="text-base font-mono flex items-center space-x-2">
        {/* BACK x SEC */}
        <button
          className="bg-none flex items-center border-none hover:text-clrRed transition-all ease-in-out"
          onClick={backThirty}>
          <FaArrowLeft />
          30s
        </button>
        {/* CONDITIONAL PLAY PAUSE  */}
        <button
          className="bg-none flex items-center border-none text-4xl hover:text-clrRed transition-all ease-in-out"
          onClick={PlayPause}>
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
        </button>
        {/* FORWARD x SEC */}
        <button
          className="bg-none flex items-center border-none hover:text-clrRed transition-all ease-in-out"
          onClick={forwardThirty}>
          30s
          <FaArrowRight />
        </button>
      </div>
      {/* ------------PROGRESS BAR----------- */}
      {/* -----------------PROGRESS BAR ----------- */}
      <div>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      <div className="flex space-x-6 flex-row justify-between">
        {/* -----------------CURRENT TIME ----------- */}
        <div className="font-mono text-base">{calculateTime(currentTime)}</div>

        {/* -----------------DURATION----------- */}
        <div className="font-mono text-base">
          {" "}
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
    </div>
  )
}

export { AudioPlayer }
