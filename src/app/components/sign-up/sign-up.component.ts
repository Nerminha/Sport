import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { MustMatch } from "src/app/validators/mustMatch";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
  
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  title: string = "Signup";
  errorMsg:string;
  role:string;
  path:string;
  imagePreview:string;
  constructor(private formBuilder: FormBuilder,
    private userService:UserService , 
    private router:Router,
    private route:ActivatedRoute) {}

  ngOnInit() {
    this.path=this.router.url;
    this.signupForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(3)]],
        lastName: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        pwd: [
          "",
          [
            Validators.required,
            Validators.pattern,
            Validators.minLength(5),
            Validators.maxLength(10),
            Validators.pattern(/.*[0-9].*/),
            Validators.pattern(/.*[A-Z].*/),
            Validators.pattern(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/),
          ],
        ],
        confirmPwd: [""],
        img: [""],
      },
      {
        validators: MustMatch("pwd", "confirmPwd"),
      }
    );
  }
  signup() {
    console.log("this ", this.signupForm.value);
    this.signupForm.value.role=(this.path=="/signup")?"user":"admin";
    this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe(
      (response)=>{
        console.log("here response",response);
        if (!response.msg) {
          this.errorMsg="Acount Exists";
        }
        else{
          this.router.navigate(["login"]);
        }
      }
    );
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
