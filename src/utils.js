export const handleError = (err) => {
  console.log(err);
  throw new Error(err);
  // throw process.env.ERROR_MESSAGE;
};
export default handleError;
