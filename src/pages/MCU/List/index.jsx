import React, { useState } from 'react';
import { getMCUList } from 'apis/mcu/list';

export default function MCUList() {
  const [response, setResponse] = useState('');
  const handleGetMCUList = async () => {
    const result = await getMCUList();
    setResponse(result);
  };
  return (
    <div>
      MCU List
      <button type="button" onClick={handleGetMCUList}>get mcu list</button>
      {response}
    </div>
  );
}
