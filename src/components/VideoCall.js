import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const VideoCall = ({ sessionId, isCoach, onCallStarted }) => {
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [canJoin, setCanJoin] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('callStarted', () => {
      setCanJoin(true);
      onCallStarted();
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [onCallStarted]);

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      localVideoRef.current.srcObject = stream;

      const newPeer = new Peer({ initiator: true, trickle: false, stream });
      setPeer(newPeer);

      newPeer.on('signal', data => {
        socket.emit('signal', { sessionId, signal: data });
      });

      newPeer.on('stream', remoteStream => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      socket.on('signal', data => {
        newPeer.signal(data.signal);
      });

      setCallStarted(true);
      socket.emit('callStarted', { sessionId });
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const joinCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      localVideoRef.current.srcObject = stream;

      const newPeer = new Peer({ initiator: false, trickle: false, stream });
      setPeer(newPeer);

      newPeer.on('signal', data => {
        socket.emit('signal', { sessionId, signal: data });
      });

      newPeer.on('stream', remoteStream => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      socket.on('signal', data => {
        newPeer.signal(data.signal);
      });

      setCallStarted(true);
    } catch (error) {
      console.error('Error joining call:', error);
    }
  };

  return (
    <div className="video-call">
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      {isCoach && !callStarted && (
        <button onClick={startCall}>Start Call</button>
      )}
      {!isCoach && canJoin && !callStarted && (
        <button onClick={joinCall}>Join Call</button>
      )}
    </div>
  );
};

export default VideoCall;