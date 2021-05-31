import React, { useState } from 'react';
import { getMCUList } from 'apis/mcu/list';

export default function MCUList() {
  const [response] = useState('');
  const handleGetMCUList = async () => {
    const result = await getMCUList();
    console.log(result);
  };
  return (
    <div>
      MCU List
      <button type="button" onClick={handleGetMCUList}>get mcu list</button>
      {response}
    </div>
  );
}
