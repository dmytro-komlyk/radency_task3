const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      note: req.body
    });
    next();
  } catch (err) {
    res.statusCode = 500;
    res.json({ type: err.name, message: err.message });
  }
};

module.exports = validate