let filters = {
  filters: {
    sizeTo (val) {
      if (val >= 1024 * 1024 ) {
        return `${(val / (1024 * 1024)).toFixed(1)}M`
      }else if (val >= 1024) {
        return `${(val / 1024).toFixed()}KB`
      } else {
        return `${val}B`
      }
    },
  },
}

export default {
  filters,
}
