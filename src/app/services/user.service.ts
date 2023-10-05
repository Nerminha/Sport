import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userURL: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) {}

  // user = {firstName, lastName, tel, email, pwd}
  signup(user , file:File) {
    let formData=new FormData();
    formData.append("firstName",user.firstName);
    formData.append("lastName",user. lastName);
    formData.append("email",user.email);
    formData.append("pwd",user.pwd);
    formData.append("role",user.role);
    formData.append("img",file);
    return this.http.post<{ msg: boolean }>(this.userURL+"/signup", formData);
  }

  // user = {email, pwd}
  login(user) {
    return this.http.post<{msg: string,token:string}>(this.userURL+"/login", user);
  }

  deleteUserById(id) {
    return this.http.delete(`${this.userURL}/${id}`);
  }

  editUser(user) {
    return this.http.put(this.userURL, user);
  }

  displayProfile(email) {
    return this.http.get(`${this.userURL}/${email}`);
  }

  getAllUsers() {
    return this.http.get(this.userURL);
  }
}
