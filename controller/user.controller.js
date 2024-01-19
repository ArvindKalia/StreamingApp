import "../module/db.module";
import userSchema from "../schema/user.schema";
import { decrypt } from "../module/bcrypt.module";
import { adminMiddleware } from "../middleware/admin.middleware";

export const login = async (request) => {
  const { searchParams } = new URL(request.url);
  // console.log(searchParams.get("email"))
  // console.log(searchParams.get("password"))
  const query = {};
  for (const [key, value] of searchParams) {
    query[key] = value;
  }
  //email match
  const userData = await userSchema.findOne({ email: query.email });
  if (userData) {
    //delete password from response
    const loginData = userData.toObject();
    delete loginData.password;
    //password match
    const login = await decrypt(query.password, userData.password);
    if (login) {
      return {
        data: {
          user: loginData,
        },
        status: 200,
      };
    } else {
      return {
        data: {
          message: "LoginFailed",
        },
        status: 401,
      };
    }
  } else {
    return {
      data: {
        message: "LoginFailed",
      },
      status: 401,
    };
  }
};

export const signup = async (request) => {
  try {
    const data = await request.json();
    try {
      await adminMiddleware(request);
      data["role"] = "ADMIN";
    } catch (error) {
      data["role"] = "USER";
    }
    const newUser = await new userSchema(data).save();
    const newData = newUser.toObject();
    delete newData.password;
    return {
      data: newData,
      status: 200,
    };
  } catch (error) {
    return {
      data: error,
      status: 424,
    };
  }
};
