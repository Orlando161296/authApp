import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/service/validator.service';
import { AuthService } from '../../services/auth.service';
import  Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb          = inject ( FormBuilder );
  private validatorService = inject ( ValidatorService)
  private authService = inject( AuthService)
  private router = inject( Router )

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required ]],
    email:['', [Validators.required, Validators.email ] ],
    password:['',[ Validators.required, Validators.minLength( 6 ) ] ],
    password2:['',[ Validators.required] ],
  }, {
    validators: [
        this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  isValidField( field: string){
    //TODO: obtener validación desde un servicio.
    return this.validatorService.isValidField( this.myForm, field )
  }

  register( ){
    const { name, email, password} = this.myForm.value;
    this.authService.registerUser( name ,email, password )
    .subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: ( message ) => {
        Swal.fire('Error', message, 'error')
      }
    }

    )

  }

}
