import usersModel from "./users-model.js";
export const findAllUsers = () => usersModel.find();
export const findUserById = (uid) => usersModel.findById(uid);
export const findUserByEmail = (email) => usersModel.findOne({ email: email });
export const findUsersByNickname = (nickname) =>
  usersModel.find({ nickname: { $regex: nickname, $options: "i" } });
export const findUsersByAddresses = (body) => {
  const queries = [];
  Object.keys(body).forEach(function (key) {
    if (key === "state") {
      queries.push({ state: { $regex: body[key], $options: "i" } });
    }
    else if (key === "city") {
      queries.push({ city: { $regex: body[key], $options: "i" } });
    }
    else if (key === "address1") {
      queries.push({ address1: { $regex: body[key], $options: "i" } });
    }
    else if (key === "address2") {
      queries.push({ address2: { $regex: body[key], $options: "i" } });
    }
    else if (key === "zip") {
      queries.push({ zip: { $regex: body[key], $options: "i" } });
    }
  });
  return usersModel.find({ $and: queries });
};
export const findUsersByBirth = (birth) => usersModel.find({ birthday: birth });
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.findByIdAndDelete(uid);
export const updateUser = (uid, user) =>
  usersModel.findByIdAndUpdate(uid, { $set: user });
