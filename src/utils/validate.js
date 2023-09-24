export const checkValidateData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPassValid = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(password);

  if (!isEmailValid) return "Email id is not valid";
  if (!isPassValid) return "Password is not valid";

  return null;
};
