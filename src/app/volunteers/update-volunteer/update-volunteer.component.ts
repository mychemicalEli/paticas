import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetVolunteerListItemResponse } from '../models/get-volunteers-list/get-volunteers-list.response'; // Importa la interfaz de respuesta de la lista de voluntarios
import { VolunteerService } from '../volunteers-service/volunteers.service'; // Importa el servicio de voluntarios
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router para manejar la navegación y los parámetros de ruta
import { volunteerAvailability } from '../models/volunteer-availability.enum'; // Importa el enum de disponibilidad de voluntarios
import { UpdateVolunteerRequest } from '../models/update-volunteer/update-volunteer.request'; // Importa la interfaz de solicitud de actualización de voluntarios
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-update-volunteer',
  templateUrl: './update-volunteer.component.html',
  styleUrls: ['./update-volunteer.component.css']
})
export class UpdateVolunteerComponent implements OnInit {
  @Input() volunteerId!: number; // Recibe el ID del voluntario como entrada
  userRole: string='';
  volunteer?: GetVolunteerListItemResponse; // Almacena la información del voluntario
  imagePreview: string | FormData | null = null; // Almacena la vista previa de la imagen
  form!: FormGroup; // Representa el formulario de actualización de voluntarios
  request: UpdateVolunteerRequest = {} as UpdateVolunteerRequest; // Almacena la información para la solicitud de actualización

  constructor(
    private router: Router, // Inyecta el enrutador
    private route: ActivatedRoute, // Inyecta la ruta activada
    private volunteerService: VolunteerService, // Inyecta el servicio de voluntarios
    private formBuilder: FormBuilder, // Inyecta el constructor de formularios
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userRole = this.userService.getRole();
    // Inicializa el formulario y sus controles
    this.form = this.formBuilder.group({
      fullName: [''], // Control para el nombre completo
      availability: [''], // Control para la disponibilidad
      phone: [''], // Control para el teléfono
      email: [''], // Control para el correo electrónico
      profileImage: [''] // Control para la imagen de perfil
    });

    // Si no se proporciona el ID del voluntario, recupera el ID de la ruta
    if (!this.volunteerId) {
      this.route.params.subscribe(params => {
        const id = params['id']; // Obtiene el ID de los parámetros de la ruta
        this.getVolunteerDetails(id); // Llama al método para obtener los detalles del voluntario
      });
    } else {
      this.getVolunteerDetails(this.volunteerId); // Si se proporciona el ID del voluntario, obtiene los detalles del voluntario
    }
  }

  // Método para obtener los detalles del voluntario
  private getVolunteerDetails(id: number) {
    this.volunteerService.getId(id).subscribe({
      next: (response: GetVolunteerListItemResponse) => {
        this.volunteer = response; // Almacena la respuesta en la variable volunteer
        this.updateFormWithVolunteerData(); // Actualiza el formulario con los datos del voluntario
      },
      error: (error) => {
        console.error('Error al cargar los detalles del voluntario:', error); // Muestra un mensaje de error en la consola si hay un error
      }
    });
  }

  // Método para actualizar el formulario con los datos del voluntario
  updateFormWithVolunteerData() {
    if (this.form && this.volunteer) {
      this.form.patchValue({
        fullName: this.volunteer.fullName, // Actualiza el control del nombre completo
        phone: this.volunteer.phone, // Actualiza el control del teléfono
        email: this.volunteer.email, // Actualiza el control del correo electrónico
        profileImage: this.volunteer.profileImage, // Actualiza el control de la imagen de perfil
        availability: this.volunteer.availability
      });

      this.imagePreview = this.volunteer.profileImage; // Actualiza la vista previa de la imagen con la imagen del voluntario
    }
  }

  // Método para manejar la selección de un archivo de imagen
  onSelectFile(event: any) {
    const file = event?.target?.files?.[0]; // Obtiene el archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Crea un lector de archivos
      reader.readAsDataURL(file); // Lee el archivo como una URL
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Actualiza la vista previa de la imagen con la URL del archivo
        // Actualiza el campo del formulario con el archivo seleccionado
        this.form.get('profileImage')?.setValue(file);
      };
    }
  }

  // Método para eliminar la imagen seleccionada
  public delete() {
    this.imagePreview = '/assets/img/volunteer/defaultIconProfile.png'; // Establece la imagen por defecto
    this.form.get('profileImage')?.setValue(null); // Establece el valor de la imagen en null
  }



  // Método para establecer la solicitud de actualización con los datos del formulario
  stablishRequest(){
    this.request.fullName = this.form.get('fullName')?.value; // Establece el nombre completo
    this.request.availability = parseInt(this.form.get('availability')?.value); // Establece la disponibilidad
    this.request.phone = this.form.get('phone')?.value; // Establece el teléfono
    this.request.email = this.form.get('email')?.value; // Establece el correo electrónico
    this.request.profileImage = this.form.get('profileImage')?.value; // Establece la imagen de perfil
  }

  // Método para enviar el formulario de actualización
  submitForm() {
    this.stablishRequest(); // Establece la solicitud de actualización con los datos del formulario

    console.log('Request object:', this.request); // Muestra la solicitud en la consola

    this.volunteerService.updateVolunteer(this.volunteerId, this.request)
    .pipe()
    .subscribe()
    
    console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
    this.router.navigate(['/volunteers']); // Navega de regreso a la lista de voluntarios
  }
}
