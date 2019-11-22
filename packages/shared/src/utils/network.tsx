export function GuidGeneratorService() {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export const CLIENT_HEADER = {
  id: 'user.web.frtl.def',
  dtype: 'phone',
  metric: '1',
  ccode: 'USD',
  lang: 'en_US',
  locale: 'en_US',
  os: '',
  osv: '',
  did: 'DEVELOPMENT',
  dname: '',
  decsep: '.',
  csymbol: '.',
  //@ts-ignore
  net: (navigator.connection || navigator.mozConnection || navigator.webkitConnection || {}).type,
  screen: `${window.screen.width}x${window.screen.height}`,
  timezone: window.Intl ? window.Intl.DateTimeFormat().resolvedOptions().timeZone : '',
  push: Number('PushManager' in window && Notification.permission === 'granted'),
  buildv: '0.0.1'
};

export const fetchQuery = async body => {
  const apiUrl = 'https://devapi.foretell.net/graphql';
  const request = await fetch(apiUrl, {
    method: 'post',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      CLIENT: JSON.stringify(CLIENT_HEADER)
    },
    body: JSON.stringify(body)
  });
  if (request.status === 0) {
    throw new Error('Network request failed');
  }
  if (request.status !== 200) {
    //@ts-ignore
    throw new Error(request.message);
  }
  const response = await request.json();
  if (response.errors) {
    throw new Error(response.errors[0].message);
  }
  return response.data;
};
