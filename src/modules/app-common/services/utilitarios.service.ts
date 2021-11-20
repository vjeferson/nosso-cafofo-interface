import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class Utilitarios {

  public static validateAllFormFields(formGroup: FormGroup | FormArray, prefix: any = null, camposComErro: any = null) {
    let logar = false;
    if (!camposComErro) {
      camposComErro = {};
      logar = true;
    }
    if (!prefix) {
      prefix = '';
    }
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control && control.errors) {
        camposComErro[`${prefix ? prefix + '.' : ''}${field}`] = control;
      }
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control, `${prefix ? prefix + '.' : ''}${field}`, camposComErro);
      }
    });
    if (logar) {
      console.log(camposComErro);
    }
  }

}