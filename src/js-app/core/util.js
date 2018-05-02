export default {
  getUrlParams(url = window.location.href) {
    let theRequest = {};
    if (url.indexOf('?') !== -1) {
      let str = url.split('?')[1];
      let strs = str.split('&');
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
      }
    }
    return theRequest;
  },
  isIpad() {
    let agent = navigator.userAgent.toLowerCase().match(/ipad/i);
    if (agent) {
      return agent.length > 0;
    }
    return false;
  }
}
