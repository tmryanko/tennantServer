function errorHandler(error, req, res) {
  console.log(error.status);
  
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'OPPS Something went wrong'
    }
  });
}

module.exports = errorHandler;
