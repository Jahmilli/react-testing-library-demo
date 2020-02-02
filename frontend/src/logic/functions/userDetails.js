export const getUserDetails = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        username: "SebSouthern"
      });
    }, 500);
  });
};
