// module.exports = isCorrectPassword = (req, res, next) => {
//   const { password } = req.body;
//   console.log(password.length);
//   const isCorrect = password.length > 3 && password.length < 28;

//   isCorrect
//     ? next()
//     : res.end(
//         "minimum password length is 4 characters and maximum password length is 30 characters"
//       );
// };
