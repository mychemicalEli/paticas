import { Component, Input } from '@angular/core';
import { GetShelterPaticasListItemResponse } from '../models/get-shelter-paticas-list/get-shelter-paticas-list.response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdatePaticaRequest } from '../models/update-patica/update-patica.request';
import { ActivatedRoute, Router } from '@angular/router';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { PaticasService } from '../../paticas/paticas-service/paticas.service';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-edit-patica',
  templateUrl: './edit-patica.component.html',
  styleUrl: './edit-patica.component.css'
})
export class EditPaticaComponent {
  @Input() paticaId!: number;
  userRole: string='';
  patica?: GetShelterPaticasListItemResponse;
  imagePreview: string | FormData | null = null;
  form!: FormGroup;
  request: UpdatePaticaRequest = {} as UpdatePaticaRequest;
  carouselImagePreviews: (string | FormData | null)[] = [];
  defaultCarouselImage = '/assets/img/paticas/defaultIcon.png';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shelterPaticasService: ShelterPaticasService,
    private formBuilder: FormBuilder,
    private paticasService: PaticasService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userRole = this.userService.getRole();
    this.createForm();
  }

  //Inicializar formulario
  createForm() {
    this.form = this.formBuilder.group({
      name: [''],
      gender: [''],
      birthDate: [''],
      location: [''],
      shelter: [''],
      description: [''],
      species: [''],
      size: [''],
      profileImage: [''],
      imageCarousel1: [null],
      imageCarousel2: [null],
      imageCarousel3: [null],
      goodWithKids: [''],
      goodWithDogs: [''],
      goodWithCats: ['']
    });
  
    // Si no se proporciona el ID de la patica, recupera el ID de la ruta
    if (!this.paticaId) {
      this.route.params
        .pipe()
        .subscribe(params => {
          const id = params['id'];
          this.getPaticaDetail(id);
        });
    }
  }

  //Obtener los detalles de la patica que vamos a editar
  private getPaticaDetail(id: number) {
    this.paticasService.getDetail(id)
      .pipe()
      .subscribe({
        next: (response: GetShelterPaticasListItemResponse) => {
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
    if (this.form && this.patica) {
      const formattedBirthDate = new Date(this.patica.birthDate).toISOString().split('T')[0];
      this.form.patchValue({
        name: this.patica.name,
        gender: this.patica.gender,
        birthDate: formattedBirthDate,
        location: this.patica.location,
        species: this.patica.species,
        size: this.patica.size,
        shelter: this.patica.shelter,
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

  //comprobar que son válidos los campos (la location)
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  //formateo de fecha para mostrarla en el formulario
  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  }


  //obtener las imagenes de perfil 
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

  //obtener las imagenes del carousel 
  onSelectCarouselFile(event: any, index: number) {
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

  // Método para eliminar la imagen seleccionada
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


  //recoger valores para enviarlos en la request
  stablishRequest() {
    this.request.name = this.form.get('name')?.value;
    this.request.gender = this.form.get('gender')?.value;
    this.request.birthDate = this.form.get('birthDate')?.value;
    this.request.location = this.form.get('location')?.value;
    this.request.species = this.form.get('species')?.value;
    this.request.size = parseInt(this.form.get('size')?.value);
    this.request.shelter = this.form.get('shelter')?.value;
    this.request.description = this.form.get('description')?.value;
    this.request.profileImage = this.form.get('profileImage')?.value;
    this.request.goodWithKids = this.form.get('goodWithKids')?.value;
    this.request.goodWithDogs = this.form.get('goodWithDogs')?.value;
    this.request.goodWithCats = this.form.get('goodWithCats')?.value;
    this.request.imageCarousel1 = this.carouselImagePreviews[0] !== null ? this.carouselImagePreviews[0] as FormData : null;
    this.request.imageCarousel2 = this.carouselImagePreviews[1] !== null ? this.carouselImagePreviews[1] as FormData : null;
    this.request.imageCarousel3 = this.carouselImagePreviews[2] !== null ? this.carouselImagePreviews[2] as FormData : null;
  }


  //hacer submit de los datos
  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    this.stablishRequest(); // Establece la solicitud de actualización con los datos del formulario

    console.log('Request object:', this.request); // Muestra la solicitud en la consola

    this.shelterPaticasService.updatePatica(this.paticaId, this.request)
      .pipe()
      .subscribe()

    alert("¡Patica actualizada correctamente!");

    console.log("Update made"); // Muestra un mensaje en la consola indicando que se realizó la actualización
    this.router.navigate(['/shelterPaticas']); // Navega de regreso a la lista de voluntarios
  }
}
