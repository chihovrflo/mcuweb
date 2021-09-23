export function tempSetup(value) {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'TempSetup',
      data: {
        temp: value,
      },
    },
  };
}
export function fanSetup(value) {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'FanSetup',
      data: {
        temp: value,
      },
    },
  };
}
export function bulbSetup(value) {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'BulbSetup',
      data: {
        temp: value,
      },
    },
  };
}
export function fanOn() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'FanOn',
    },
  };
}
export function fanOff() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'FanOff',
    },
  };
}
export function bulbOn() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'BulbOn',
    },
  };
}
export function bulbOff() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'BulbOff',
    },
  };
}
export function dataRead() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'DataRead',
    },
  };
}
export function configFileRead() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'ConfigFileRead',
    },
  };
}
export function changeMode() {
  return {
    type: 'SOCKET_CMD',
    payload: {
      type: 'ChangeMode',
    },
  };
}
