import { Component, Input } from '@angular/core';
import { GetShelterPaticasListItemResponse } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePaticaRequest } from '../models/update-patica/update-patica.request';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { PaticasService } from '../../paticas/paticas-service/paticas.service';
import { UserService } from '../../auth/user-service/user.service';
import { GetShelterPaticasDetailResponse } from '../models/get-shelter-paticas-detail/get-shelter-paticas-detail.response';

@Component({
  selector: 'app-edit-patica',
  templateUrl: './edit-patica.component.html',
  styleUrl: './edit-patica.component.css'
})
export class EditPaticaComponent {
  userRole: string = ''; // Variable para almacenar el rol del usuario actual
  patica?: GetShelterPaticasDetailResponse; // Variable para almacenar los detalles de la patica a editar
  imagePreview: string | FormData | null = null; // Vista previa de la imagen
  form!: FormGroup; // Formulario de Angular
  request: UpdatePaticaRequest = {} as UpdatePaticaRequest; // Objeto de solicitud para actualizar la patica
  carouselImagePreviews: (string | FormData | null)[] = []; // Arreglo para almacenar las vistas previas de las imágenes del carrusel
  defaultCarouselImage = '/assets/img/paticas/defaultIcon.png'; // Imagen por defecto del carrusel


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelterPaticasService: ShelterPaticasService,
    private formBuilder: FormBuilder,
    private paticasService: PaticasService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userRole = this.userService.getRole(); // Obtiene el rol del usuario actual
    this.createForm(); // Inicializa el formulario
  }

  //Inicializar formulario
  createForm() {
    // Define los campos del formulario y establece las validaciones
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
  
      description: ['', Validators.required],
      species: ['', Validators.required],
      size: ['', Validators.required],
      profileImage: [''],
      imageCarousel1: [null],
      imageCarousel2: [null],
      imageCarousel3: [null],
      goodWithKids: ['', Validators.required],
      goodWithDogs: ['', Validators.required],
      goodWithCats: ['', Validators.required]
    });

    // Suscribe a los cambios en los parámetros de la ruta para obtener los detalles de la patica
    this.route.params
      .subscribe(params => {
        this.getPaticaDetail(params['id']);
      })
  }

  //Obtener los detalles de la patica que vamos a editar
  private getPaticaDetail(id: number) {
    // Llama al servicio para obtener los detalles de la patica por su ID
    this.paticasService.getDetail({ id: id })
      .pipe()
      .subscribe({
        next: (response: GetShelterPaticasDetailResponse) => {
          this.patica = response;
          this.updateFormWithPaticaData();
        },
        error: (error) => {
          console.error('Error al cargar los detalles de la patica:', error);
        }
      });
  }

  // Método para actualizar el formulario con los datos de la patica
  updateFormWithPaticaData() {
    // Actualiza los valores del formulario con los datos de la patica
    if (this.form && this.patica) {
      const formattedBirthDate = new Date(this.patica.birthDate).toISOString().split('T')[0];
      this.form.patchValue({
        name: this.patica.name,
        gender: this.patica.gender,
        birthDate: formattedBirthDate,
      
        species: this.patica.species,
        size: this.patica.size,
      
        description: this.patica.description,
        profileImage: this.patica.profileImage,
        goodWithKids: this.patica.goodWithKids,
        goodWithDogs: this.patica.goodWithDogs,
        goodWithCats: this.patica.goodWithCats,

      });

      if (this.patica.size) {
        this.form.patchValue({
          size: this.patica.size
        });
      }

      if (this.patica.imageCarousel1) {
        this.carouselImagePreviews[0] = this.patica.imageCarousel1;
      }
      if (this.patica.imageCarousel2) {
        this.carouselImagePreviews[1] = this.patica.imageCarousel2;
      }
      if (this.patica.imageCarousel3) {
        this.carouselImagePreviews[2] = this.patica.imageCarousel3;
      }
    }
  }

  // Método para verificar si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  // Método para obtener la fecha máxima para el campo de fecha de nacimiento en el formulario
  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    // Retorna la fecha actual en el formato adecuado para el campo de fecha de nacimiento
    return `${year}-${month}-${day}`;
  }


  // Método para manejar la selección de un archivo de imagen para la imagen de perfil
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

  // Método para manejar la selección de un archivo de imagen para el carrusel de imágenes
  onSelectCarouselFile(event: any, index: number) {
    // Actualiza la vista previa de la imagen en el carrusel y el campo del formulario con el archivo seleccionado
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.carouselImagePreviews[index] = reader.result as string;
        this.form.get(`imageCarousel${index + 1}`)?.setValue(file);
      }
    };
  }

  // Método para eliminar la imagen seleccionada de perfil
  public delete() {
    this.imagePreview = '/assets/img/paticas/defaultIcon.png'; // Establece la imagen por defecto
    this.form.get('profileImage')?.setValue(null); // Establece el valor de la imagen en null
  }

  // Método para eliminar las imagenes del carousel
  deleteAllCarousel() {
    this.carouselImagePreviews = [null, null, null]; // Limpiar las previsualizaciones
    // También limpiar los valores en el formulario
    this.form.get('imageCarousel1')?.setValue(null);
    this.form.get('imageCarousel2')?.setValue(null);
    this.form.get('imageCarousel3')?.setValue(null);
  }


  // Método para establecer los valores de la solicitud de actualización
  stablishRequest() {
    this.request.name = this.form.get('name')?.value;
    this.request.gender = this.form.get('gender')?.value;
    this.request.birthDate = this.form.get('birthDate')?.value;
 
    this.request.species = this.form.get('species')?.value;
    this.request.size = parseInt(this.form.get('size')?.value);

    this.request.description = this.form.get('description')?.value;
    this.request.profileImage = this.form.get('profileImage')?.value;
    this.request.goodWithKids = this.form.get('goodWithKids')?.value;
    this.request.goodWithDogs = this.form.get('goodWithDogs')?.value;
    this.request.goodWithCats = this.form.get('goodWithCats')?.value;
    this.request.imageCarousel1 = this.carouselImagePreviews[0] !== null ? this.carouselImagePreviews[0] as FormData : null;
    this.request.imageCarousel2 = this.carouselImagePreviews[1] !== null ? this.carouselImagePreviews[1] as FormData : null;
    this.request.imageCarousel3 = this.carouselImagePreviews[2] !== null ? this.carouselImagePreviews[2] as FormData : null;
  }


  // Método para enviar el formulario y actualizar la patica
  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }

    this.stablishRequest();

    console.log('Request object:', this.request);
    // Realiza la solicitud de actualización al servicio y redirige al usuario a la página principal 
    this.shelterPaticasService.updatePatica(this.request)
      .pipe()
      .subscribe()

    alert("¡Patica actualizada correctamente!");

    console.log("Update made");
    this.router.navigate(['/shelterPaticas']);
  }
}
