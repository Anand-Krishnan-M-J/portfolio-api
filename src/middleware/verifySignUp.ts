// import {User} from "../models/user.model"

// const checkDuplicateUsernameOrEmail = (req, res, next) => {
//   console.log("ENterde verigication")
//   console.log(User, "userdsdds")
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(user => {
//     console.log("herere")
//     if (user) {
//       res.status(400).send({
//         message: "Failed! Username is already in use!"
//       });
//       return;
//     }
//     User.findOne({
//       where: {
//         email: req.body.email
//       }
//     }).then(user => {
//       if (user) {
//         res.status(400).send({
//           message: "Failed! Email is already in use!"
//         });
//         return;
//       }

//       next();
//     });
//   });
// };

// export const verifySignUp = {
//   checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
// };
