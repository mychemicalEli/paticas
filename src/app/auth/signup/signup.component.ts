import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../models/create-user.request';
import { sha256 } from 'js-sha256';
import { AuthService } from '../auth-service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; // Declaración del formulario de registro
  showUserFields: boolean = false; // Indicador para mostrar campos de usuario
  showShelterFields: boolean = false; // Indicador para mostrar campos de refugio
  request: CreateUserRequest = {} as CreateUserRequest; // Objeto para almacenar la solicitud de creación de usuario
  roles: string[] = ['user', 'shelter']; // Lista de roles 

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.authService.setIsLoginPage(true); // Establece la página de inicio de sesión como verdadera
    this.createForm(); // Inicializa el formulario al iniciar el componente
  }

  createForm(): void {
    // Crea el formulario de registro con validaciones
    this.signupForm = this.formBuilder.group({
      role: ['', Validators.required], // Campo de selección de rol
      name: [''], // Campo de nombre
      lastName: [''], // Campo de apellido
      cif: [''], // Campo de CIF (solo para refugios)
      location: [''], // Campo de ubicación (solo para refugios)
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico
      password: ['', Validators.required], // Campo de contraseña
      confirmPassword: ['', Validators.required] // Campo de confirmación de contraseña
    }, { validators: this.passwordMatchValidator }); // Validador personalizado para comparar contraseñas
  }


  // Establece los valores del formulario en el objeto de solicitud
  stablishRequest() {
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

  // Verifica si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.signupForm.valid;
  }

  // Método para registrar un usuario
  register() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched(); // Marca todos los campos como "touched" para mostrar errores
      return;
    }

    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid'); // Mensaje de consola si no todos los pasos son válidos
      return;
    }

    this.stablishRequest(); // Establece la solicitud de creación de usuario
    const encryptedPassword = sha256(this.request.password); // Encripta la contraseña usando SHA256
    this.request.password = encryptedPassword; // Asigna la contraseña encriptada
    console.log('User role:', this.request.role); // Muestra el rol del usuario en la consola
    this.userService.register(this.request) // Llama al servicio para registrar al usuario
      .pipe()
      .subscribe(
        (data) => {
          console.log('datos enviados:', this.request); // Muestra la solicitud de registro en la consola
          // Maneja la respuesta del servidor aquí
          console.log(data); // Muestra la respuesta en la consola
          // Establece el rol y redirige a la página correspondiente
          this.userService.setToken(data.token);
          this.userService.setRole(this.request.role);
          if (this.request.role === 'user') {
            this.router.navigateByUrl("/home"); // Redirige a la página de inicio del usuario
          } else if (this.request.role === 'shelter') {
            this.router.navigateByUrl("/shelterPaticas"); // Redirige a la página del refugio
          }
        },
        (error) => {
          // Maneja el error aquí
          console.error(error); // Muestra el error en la consola
        }
      );
  }

  // Función para validar que las contraseñas coincidan
  passwordMatchValidator(signupForm: FormGroup) {
    const password = signupForm.get('password')?.value; // Obtiene el valor del campo de contraseña
    const confirmPassword = signupForm.get('confirmPassword')?.value; // Obtiene el valor del campo de confirmación de contraseña
    if (password !== confirmPassword) { // Comprueba si las contraseñas no coinciden
      signupForm.get('confirmPassword')?.setErrors({ mismatch: true }); // Marca el campo de confirmación como inválido si las contraseñas no coinciden
    } else {
      signupForm.get('confirmPassword')?.setErrors(null); // Elimina los errores si las contraseñas coinciden
    }
    return null; // Retorna null ya que este validador no se utiliza para retornar errores específicos
  }


  // Maneja el cambio en el tipo de usuario en el formulario
  onUserTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value; // Obtiene el valor seleccionado en el campo de selección de rol
    this.showUserFields = value === 'user'; // Actualiza el indicador para mostrar campos de usuario
    this.showShelterFields = value === 'shelter'; // Actualiza el indicador para mostrar campos de refugio
    this.signupForm.get('role')?.setValue(value); // Establece el valor del campo de rol en el formulario

    if (this.showUserFields) {
      // Si el tipo de usuario es "user", establece las validaciones para los campos de nombre y apellido, y elimina las validaciones para los campos de refugio
      this.signupForm.get('name')?.setValidators(Validators.required);
      this.signupForm.get('lastName')?.setValidators(Validators.required);
      this.signupForm.get('cif')?.clearValidators();
      this.signupForm.get('location')?.clearValidators();
    } else if (this.showShelterFields) {
      // Si el tipo de usuario es "shelter", establece las validaciones para los campos de CIF y ubicación, y elimina las validaciones para los campos de nombre y apellido
      this.signupForm.get('cif')?.setValidators([Validators.required, Validators.pattern(/^(\d{8}[a-zA-Z]|\d{1}[a-zA-Z]\d{7}|[a-zA-Z]\d{8}|\d{8}-[a-zA-Z]|\d{1}-[a-zA-Z]\d{7}|[a-zA-Z]-\d{8})$/)]);
      this.signupForm.get('location')?.setValidators(Validators.required);
      this.signupForm.get('name')?.clearValidators();
      this.signupForm.get('lastName')?.clearValidators();
    }

    // Actualiza y valida los campos que no se muestran en función del tipo de usuario seleccionado
    this.signupForm.get('name')?.updateValueAndValidity();
    this.signupForm.get('lastName')?.updateValueAndValidity();
    this.signupForm.get('cif')?.updateValueAndValidity();
    this.signupForm.get('location')?.updateValueAndValidity();
  }

  // Método llamado justo antes de que Angular destruya el componente
  ngOnDestroy(): void {
    this.authService.setIsLoginPage(false); // Establece la página de inicio de sesión como falsa utilizando el servicio de autenticación
  }
}

