import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../models/create-user.request';
import { sha256 } from 'js-sha256';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showUserFields: boolean = false;
  showShelterFields: boolean = false;
  request: CreateUserRequest = {} as CreateUserRequest;
  roles: string[] = ['user', 'shelterAdmin']; // Lista de roles 

  constructor(private formBuilder: FormBuilder, public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.formBuilder.group({
      role: ['', Validators.required],
      name: [''],
      lastName: [''],
      cif: [''],
      location: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  stablishRequest(){
    this.request.role = this.signupForm.get('role')?.value;
    this.request.email = this.signupForm.get('email')?.value;
    this.request.password = this.signupForm.get('password')?.value;

    if (this.showUserFields) {
      this.request.name = this.signupForm.get('name')?.value;
      this.request.lastName = this.signupForm.get('lastName')?.value;
    }

    if (this.showShelterFields) {
      this.request.name = this.signupForm.get('name')?.value;
      this.request.cif = this.signupForm.get('cif')?.value;
      this.request.location = this.signupForm.get('location')?.value;
    }
  }

  areAllStepsValid(): boolean {
    return this.signupForm.valid;
  }

  register() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    

    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }

    this.stablishRequest();
    const encryptedPassword = sha256(this.request.password);
    this.request.password = encryptedPassword;
    console.log('User role:', this.request.role);
    this.userService.register(this.request)
    .pipe()
    .subscribe(
      (data) => {
        console.log('datos enviados:', this.request);
        // Maneja la respuesta del servidor aquí
        console.log(data); // Muestra la respuesta en la consola
        // Establece el rol y redirige a la página correspondiente
        this.userService.setToken(data.token);
        this.userService.setRole(this.request.role);
        if (this.request.role === 'user') {
          this.router.navigateByUrl("/home");
        } else if (this.request.role === 'shelterAdmin') {
          this.router.navigateByUrl("/shelterPaticas");
        }
      },
      (error) => {
        // Maneja el error aquí
        console.error(error); // Muestra el error en la consola
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onUserTypeChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.showUserFields = value === 'user';
  this.showShelterFields = value === 'shelterAdmin';
  this.signupForm.get('role')?.setValue(value);

  if (this.showUserFields) {
    this.signupForm.get('name')?.setValidators(Validators.required);
    this.signupForm.get('lastName')?.setValidators(Validators.required);
    this.signupForm.get('cif')?.clearValidators();
    this.signupForm.get('location')?.clearValidators();
  } else if (this.showShelterFields) {
    this.signupForm.get('cif')?.setValidators([Validators.required, Validators.pattern(/^(\d{8}[a-zA-Z]|\d{1}[a-zA-Z]\d{7}|[a-zA-Z]\d{8}|\d{8}-[a-zA-Z]|\d{1}-[a-zA-Z]\d{7}|[a-zA-Z]-\d{8})$/)]);
    this.signupForm.get('location')?.setValidators(Validators.required);
    this.signupForm.get('name')?.clearValidators();
    this.signupForm.get('lastName')?.clearValidators();
  }

  // Resetear las validaciones de los campos que no se muestran
  this.signupForm.get('name')?.updateValueAndValidity();
  this.signupForm.get('lastName')?.updateValueAndValidity();
  this.signupForm.get('cif')?.updateValueAndValidity();
  this.signupForm.get('location')?.updateValueAndValidity();
}


  get form() { return this.signupForm.controls; }
}
