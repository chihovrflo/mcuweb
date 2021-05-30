import { useEffect, useRef } from 'react';

export default function useWebSocket({
  onOpen = () => {},
  onClose = () => {},
  onMessage = () => {},
}) {
  const wsRef = useRef();
  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_WS_HOST || 'ws://localhost:5001');
    if (wsRef.current) {
      wsRef.current.onopen = () => onOpen(wsRef.current);
      wsRef.current.onclose = () => onClose(wsRef.current);
      wsRef.current.onmessage = (event) => onMessage(wsRef.current, event);
    }
    return () => wsRef.current.close();
  }, []);

  return {
    wsRef,
  };
}
