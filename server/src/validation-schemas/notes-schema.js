const yup = require("yup");

const noteSchema = yup.object({
  note: yup.object({
    name: yup.string().min(1).required(),
    content: yup.string().min(1).required(),
    category: yup.string().min(1).required(),
  }),
});

module.exports = noteSchema