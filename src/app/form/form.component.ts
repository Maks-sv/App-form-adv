import {  Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../user';
import { emailValidator,observableUrlValidator,rangeValidator } from '../custom-validators';
import { FORM_ERRORS, FORM_LABELS, FORM_PLACEHOLDER, FORM_ROLES, FORM_SUCCESS, FORM_VALIDATION_MESSAGES } from '../form-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formLabels = FORM_LABELS
  formPlaceholder = FORM_PLACEHOLDER
  formSuccess = FORM_SUCCESS
  formErrors: any = FORM_ERRORS
  validationMessages : any = FORM_VALIDATION_MESSAGES
  roles: string[] = FORM_ROLES

  userForm!: FormGroup;
  private user:User = new User( 1,null,null,null,null,null,null);

  constructor(private fb: FormBuilder) { }

  get form ():{[key: string]:AbstractControl}{
    return this.userForm.controls
  }
  ngOnInit(): void {
 this.biuldForm()
  }
  onSubmit(): void {
    console.log('Form Submited');
    console.log(this.userForm.value);
   }
   private biuldForm(): void {
      this.userForm = this.fb.group({
      name:[this.user.name,[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      password:[this.user.password,[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      email:[this.user.email,[Validators.required,emailValidator]],
      age:[this.user.age,[Validators.required,rangeValidator(1,122)]],
      site:[this.user.site,[Validators.required],[observableUrlValidator]],
      role:[this.user.role,[Validators.required]]
      })
      this.userForm.valueChanges.subscribe(() => this.onValueChanged())
   }
     public onValueChanged():void{
   const form = this.userForm
    
   Object.keys(this.formErrors).forEach(field => {
    this.formErrors[field] = ''
     const control  = form.get(field)
     
     if((control?.dirty ||control?.touched) && control?.invalid){
      const messages = this.validationMessages[field]

      Object.keys(control.errors as ValidationErrors).some(key => { this.formErrors[field] = messages[key]
      })
     }
   })
 }
}
//  roles: string[]= ['Гость' ,'Модератор' ,'Администратор']
//  user:User = new User( 1,null,null,null);

//  formErrors: any = {
//   name: '',
//   age : ''
//  }

//  validationMessages : any = {
//   name: {
//      required: 'Имя обязательно',
//      minlength:'Имя должно содержать минимум 4 символа'
//    },
//    age:{
//     required:'Возраст обязателен:'
//    }
//  }

//  @ViewChild('userForm')userForm!: NgForm

//   constructor() { }

//   ngOnInit(): void {
//   }
//   ngAfterViewInit(): void {
//   this.userForm?.valueChanges?.subscribe(data => this.onValueChanged())
//   }
    
//   onSubmit(): void {
//   console.log('Form Submited');
//   }
//   private onValueChanged():void{
//    const form = this.userForm.form
    
//    Object.keys(this.formErrors).forEach(field => {
//     this.formErrors[field] = ''
//      const control  = form.get(field)
     
//      if(control && control.dirty && control.invalid){
//       const messages = this.validationMessages[field]

//       Object.keys(control.errors as ValidationErrors).forEach(key => { 
//         console.log(messages[key]);
//       this.formErrors[field] += messages[key] + ' '
//       })
//      }
//    })
//   }

// }
