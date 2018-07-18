module.exports =
  process.env.NODE_ENV === 'development' // development or production
    ? require('./dev.config').default
    : require('./prod.config').default