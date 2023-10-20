import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public isValidField( form: FormGroup, field: string){
    return form.controls[field].errors &&
    form.controls[field].touched
  }


  isFieldOneEqualFieldTwo( field1: string, field2: string){

    return ( formGroup: AbstractControl<any, any> ): ValidationErrors | null => {
        const fieldValue1 = formGroup.get( field1 )?.value;
        const fieldValue2 = formGroup.get( field2 )?.value;

      if( fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ noEqual: true})
        return { noEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }



}
