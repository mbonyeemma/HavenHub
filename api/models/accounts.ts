import Model from "../helpers/model";
import jwt from "jsonwebtoken";
import crypto from "crypto";

class Accounts extends Model {
  constructor() {
    super();
  }

  private hashPassword(password: string) {
    const hash = crypto.createHash("sha256");
    return hash.update(password).digest("hex");
  }

  async login(data: any) {
    const { email, password } = data;
    const hashPassword = this.hashPassword(password);

    try {
      const users: any = await this.callQuery(`select * from users where email = '${email}' and password='${hashPassword}'`);
      const user = users.length > 0 ? users[0] : null;

      if (users.length === 0) {
        return this.makeResponse(404, "User not found");
      }
      let user_id = user.user_id;
      const jwts: any = process.env.JWT_SECRET;
      const token = jwt.sign({ user_id }, jwts, {
        expiresIn: 86400,
      });
      const response = { ...user, jwt: token };
      return this.makeResponse(200, "Login successful", response);
    } catch (error) {
      console.error("Error in login:", error);
      return this.makeResponse(500, "Error logging in");
    }
  }

  async getUserByPhoneNumber(phone: any) {
    const existingUsersPhone = await this.getUserByPhone(phone);
    return this.makeResponse(200, "Success", existingUsersPhone);
  }

  async countries() {
    const existingUsersPhone = await this.selectDataQuery(`countries`);
    return this.makeResponse(200, "Success", existingUsersPhone);
  }

  async industries() {
    const existingUsersPhone = await this.selectDataQuery(`industries`);
    return this.makeResponse(200, "Success", existingUsersPhone);
  }

  async signup(data: any) {
    try {
      const { firstName, lastName, email, password, phone } = data;
      const existingUsers = await this.getUserByEmail(email);
      const existingUsersPhone = await this.getUserByPhone(phone);
      if (existingUsers.length > 0) {
        return this.makeResponse(400, "Email already exists");
      }
      if (existingUsersPhone.length > 0) {
        return this.makeResponse(400, "Phone number already exists");
      }
      if (password.length < 7) {
        return this.makeResponse(400, "Weak password");
      }

      const hashPassword = this.hashPassword(password);
      const user_id = "U" + this.getRandomString();
      const newUser = { user_id, email, password: hashPassword, phone };
      const insertedUser = await this.insertData("users", newUser);
      const newProfile = { user_id };
      await this.insertData("users_profile", newProfile);

      const otp = await this.getOTP(email);
      this.sendEmail("SIGNUP", email, "", otp);
      this.sendEmail("SIGNUP", phone, "", otp);

      const responseObject = {
        user_id,
        phone,
        first_name: firstName,
        last_name: lastName,
      };

      return this.makeResponse(200, "Signup successful, please verify your account", responseObject);
    } catch (error) {
      console.error("Error in signup:", error);
      return this.makeResponse(500, "Error signing up");
    }
  }

  async updateProfile(data: any) {
    try {
      const { firstName, country_id, industry_id, address, dob, bio, lastName, email, phone } = data;

      const existingUsers = await this.getUserByEmail(email);
      const existingUsersPhone = await this.getUserByPhone(phone);

      if (existingUsers.length > 0) {
        return this.makeResponse(400, "Email already exists");
      }
      if (existingUsersPhone.length > 0) {
        return this.makeResponse(400, "Phone number already exists");
      }

      const user_id = "U" + this.getRandomString();

      const newUser: any = {};
      if (firstName) newUser.first_name = firstName;
      if (lastName) newUser.last_name = lastName;
      if (bio) newUser.bio = bio;
      if (country_id) newUser.country_id = country_id;
      if (address) newUser.address = address;
      if (dob) newUser.dob = dob;
      if (industry_id) newUser.industry_id = industry_id;

      await this.updateData("users_profile", `user_id='${user_id}'`, newUser);

      const otp = await this.getOTP(email);
      this.sendEmail("UPDATE_ACCOUNT", email, "", otp);

      return this.makeResponse(200, "Profile updated successfully, please verify your account", newUser);
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return this.makeResponse(500, "Error updating profile");
    }
  }

  async changePassword(data: any) {
    const { oldPassword, staff_id, newPassword } = data;
    const hashedOldPassword = this.hashPassword(oldPassword);
    const hashedNewPassword = this.hashPassword(newPassword);

    const existingUser = await this.getLoggedInUser(staff_id, hashedOldPassword);
    if (existingUser.length === 0) {
      return this.makeResponse(401, "Auth error");
    }
    const email = existingUser[0].email;
    const user_id = existingUser[0].user_id;
    const first_name = existingUser[0].first_name;

    await this.updateData("users", `user_id = '${user_id}'`, { password: hashedNewPassword });
    this.sendEmail("CHANGE_PASSWORD", email, first_name);

    return this.makeResponse(200, "Password changed successfully");
  }

  async resetPasswordRequest(data: any) {
    try {
      const { email } = data;

      const existingUser = await this.getUserByEmail(email);
      if (existingUser.length === 0) {
        return this.makeResponse(404, "Email not found");
      }

      const first_name = existingUser[0].name;
      const otp = await this.getOTP(email);
      this.sendEmail("RESET_PASSWORD_REQUEST", email, first_name, otp);

      return this.makeResponse(200, "Reset password request sent");
    } catch (err) {
      console.log(err);
      return this.makeResponse(500, "Error processing request");
    }
  }

  async resetPassword(data: any) {
    try {
      const { otp, email, newPassword } = data;
      const hashedNewPassword = this.hashPassword(newPassword);

      const otpRs = await this.selectDataQuery("user_otp", `email = '${email}' AND otp = ${otp} `);
      if (otpRs.length === 0) {
        return this.makeResponse(400, "Invalid OTP");
      }
      const user_id = otpRs[0]["user_id"];

      await this.updateData("company_accounts", `company_id = '${user_id}'`, { password: hashedNewPassword });
      this.sendEmail("RESET_PASSWORD_COMPLETE", email, "");

      return this.makeResponse(200, "Password reset successful");
    } catch (err) {
      console.log(err);
      return this.makeResponse(500, "Error processing request");
    }
  }

  async verifyEmail(data: any) {
    try {
      const { email, otp } = data;
      const users = await this.selectDataQuery("user_otp", `account_no='${email}' and otp='${otp}'`);
      if (users.length === 0) {
        return this.makeResponse(400, "Invalid OTP");
      }

      await this.updateData("users", `email='${email}'`, { emailVerified: true });
      return this.makeResponse(200, "Email verified successfully");
    } catch (error) {
      console.error("Error in verifyEmail:", error);
      return this.makeResponse(500, "Error verifying email");
    }
  }

  async verifyPhone(data: any) {
    try {
      const { phone, otp } = data;
      const users = await this.selectDataQuery("user_otp", `account_no='${phone}' and otp='${otp}'`);
      if (users.length === 0) {
        return this.makeResponse(400, "Invalid OTP");
      }

      await this.updateData("users", `phone='${phone}'`, { phoneVerified: true });
      return this.makeResponse(200, "Phone verified successfully");
    } catch (error) {
      console.error("Error in verifyPhone:", error);
      return this.makeResponse(500, "Error verifying phone");
    }
  }

  async sendEmailOTP(data: any) {
    try {
      const { email } = data;
      const otp = await this.getOTP(email);
      this.sendEmail("RESET_PASSWORD_REQUEST", email, "", otp);
      return this.makeResponse(200, "OTP sent successfully");
    } catch (err) {
      console.log(err);
      return this.makeResponse(500, "Error processing request");
    }
  }

  async sendPhoneOTP(data: any) {
    try {
      const { phone } = data;
      const otp = await this.getOTP(phone);

      return this.makeResponse(200, "OTP sent successfully");
    } catch (err) {
      console.log(err);
      return this.makeResponse(500, "Error processing request");
    }
  }
}

export default Accounts;
