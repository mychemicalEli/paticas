import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetVolunteerListItemResponse } from '../models/get-volunteers-list/get-volunteers-list.response'; // Importa la interfaz de respuesta de la lista de voluntarios
import { VolunteerService } from '../volunteers-service/volunteers.service'; // Importa el servicio de voluntarios
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router para manejar la navegación y los parámetros de ruta
import { volunteerAvailability } from '../models/volunteer-availability.enum'; // Importa el enum de disponibilidad de voluntarios
import { UpdateVolunteerRequest } from '../models/update-volunteer/update-volunteer.request'; // Importa la interfaz de solicitud de actualización de voluntarios
import { UserService } from '../../auth/user-service/user.service';
import { GetVolunteerByIdResponse } from '../models/get-volunteer-by-id/get-volunteer-by-id.response';

@Component({
  selector: 'app-update-volunteer',
  templateUrl: './update-volunteer.component.html',
  styleUrls: ['./update-volunteer.component.css']
})
export class UpdateVolunteerComponent implements OnInit {
  @Input() volunteerId!: number; // Recibe el ID del voluntario como entrada
  userRole: string='';
  volunteer?: GetVolunteerByIdResponse; // Almacena la información del voluntario
  imagePreview: string | FormData | null = null; // Almacena la vista previa de la imagen
  form!: FormGroup; // Representa el formulario de actualización de voluntarios
  request!: FormData; // Almacena la información para la solicitud de actualización
  id:number = 0;

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
    this.route.params
    .subscribe(params=>{
      this.id=params['id'];
      this.getVolunteerDetails(params['id']);
    })
  }

  // Método para obtener los detalles del voluntario
  private getVolunteerDetails(id: number) {
    this.volunteerService.getId(id).subscribe({
      next: (response: GetVolunteerByIdResponse) => {
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
        fullName: this.volunteer.fullName,
        phone: this.volunteer.phone,
        email: this.volunteer.email,
        availability: this.volunteer.availability
      });
  
      // Asignamos la imagen de la respuesta a imagePreview para mostrarla en la página
      this.imagePreview = this.volunteer.profileImage;
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
  stablishRequest() {
    this.request = new FormData();
  
    this.request.append('fullName', this.form.get('fullName')?.value);
    this.request.append('availability', this.form.get('availability')?.value);
    this.request.append('phone', this.form.get('phone')?.value);
    this.request.append('email', this.form.get('email')?.value);

    // Verificamos si se ha seleccionado un nuevo archivo de imagen
    const selectedFile = this.form.get('profileImage')?.value as File;
    if (selectedFile) {
      // Si se ha seleccionado un nuevo archivo, lo agregamos al FormData
      this.request.append('profileImage', selectedFile, selectedFile.name);
    } else {
      // Si no se ha seleccionado un nuevo archivo, usamos la imagen existente
      const existingImage = this.volunteer?.profileImage;
      if (existingImage && typeof existingImage === 'string') {
        // Verificamos que existingImage sea una cadena antes de agregarla al FormData
        this.request.append('profileImage', existingImage);
      }
    }
}

  

  
  
  
  
  

  // Método para enviar el formulario de actualización
  submitForm() {
    this.stablishRequest();
    
    if (this.volunteer && this.volunteer.id && this.volunteer.shelterId) {
      const updateRequest = new FormData();
    
      updateRequest.append('id', this.volunteer.id.toString());
      updateRequest.append('shelterId', this.volunteer.shelterId.toString());
      updateRequest.append('fullName', this.form.get('fullName')?.value);
      updateRequest.append('availability', this.form.get('availability')?.value);
      updateRequest.append('phone', this.form.get('phone')?.value);
      updateRequest.append('email', this.form.get('email')?.value);
    
      // Usa la imagen recuperada de la respuesta del servidor en lugar de la imagen del formulario
      const profileImage = this.form.get('profileImage')?.value;
      if (profileImage) {
        updateRequest.append('profileImage', profileImage);
      }
    
      this.volunteerService.updateVolunteer(this.id, updateRequest)
        .subscribe(() => {
          alert("¡Voluntario actualizado correctamente!");
          console.log("Update made");
          this.router.navigate(['/volunteers']);
        });
    } else {
      console.error('No se puede actualizar el voluntario: ID o shelterId indefinidos.');
      // Puedes mostrar un mensaje de error o manejar esta situación de otra manera
    }
  }
  
  
}
