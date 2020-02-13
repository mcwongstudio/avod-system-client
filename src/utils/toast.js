const TOAST = {
  success: (that, title, message, position='top-left', timeout=4500) => {
    that.$notify({
      title,
      message,
      position,
      timeout,
      type: 'success'
    });
  },

  error: (that, title, message, position='top-left', timeout=4500) => {
    that.$notify.error({
      title,
      message,
      position,
      timeout
    });
  },

  warning: (that, title, message, position='top-left', timeout=4500) => {
    that.$notify({
      title,
      message,
      position,
      timeout,
      type: 'warning'
    });
  },
}

export default TOAST