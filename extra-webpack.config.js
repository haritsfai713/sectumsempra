module.exports = {
  resolve: {
    fallback: {
      "timers": require.resolve("timers-browserify"),
      "stream": require.resolve("stream-browserify"),
      "fs": require.resolve("browserify-fs")
    }
  }
}
