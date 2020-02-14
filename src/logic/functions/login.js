// export const login = async (username, password) => {
//   return new Promise((resolve, reject) =>
//     setTimeout(() => {
//       if (username === "sebsouthern" && password === "secure123") {
//         resolve(true);
//       } else {
//         reject();
//       }
//     }, 20)
//   );
// };

export const login = (username, password) => {
  return username === "sebsouthern" && password === "secure123";
};
