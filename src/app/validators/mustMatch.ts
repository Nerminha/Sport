import { FormGroup } from "@angular/forms";

export function MustMatch(pwd: string, confirmPwd: string) {
  return (formGroup: FormGroup) => {
    const pwdPointer = formGroup.controls[pwd];
    const confirmPwdPointer = formGroup.controls[confirmPwd];
    // set error on matchingControl if validation fails
    if (pwdPointer.value !== confirmPwdPointer.value) {
      confirmPwdPointer.setErrors({ x: true });
    } else {
      confirmPwdPointer.setErrors(null);
    }
  };
}
