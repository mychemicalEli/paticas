import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { AddPaticaRequest } from '../models/add-patica/add-patica.request';
import { auto } from '@popperjs/core';


@Component({
  selector: 'app-add-patica',
  templateUrl: './add-patica.component.html',
  styleUrls: ['./add-patica.component.css']
})
export class AddPaticaComponent implements OnInit {
  maxImages = 3;
  request: AddPaticaRequest = {} as AddPaticaRequest;
  fieldErrors: { [key: string]: boolean } = {};
  form!: FormGroup;
  municipios: string[] = []; // Lista de municipios

  constructor(
    private shelterPaticasService: ShelterPaticasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getMunicipios();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      location: ['', [Validators.required, this.validateLocation.bind(this)]], // Validador personalizado
      species: ['', Validators.required],
      size: ['', Validators.required],
      shelter: ['', Validators.required],
      profileImage: ['', Validators.required],
      description: ['', Validators.required],
      goodWithKids: ['', Validators.required],
      goodWithDogs: ['', Validators.required],
      goodWithCats: ['', Validators.required],
      carouselImages: ['', Validators.required]
    });
  }

  validateLocation(control: any) {
    if (this.municipios.indexOf(control.value) === -1) {
      return { invalidLocation: true };
    }
    return null;
  }

  getMunicipios() {
    this.municipios = [
      "Abanilla", "Abarán", "Águilas", "Albudeite", "Alcantarilla", "Los Alcázares", "Aledo", "Alguazas", "Alhama de Murcia",
      "Archena", "Beniel", "Blanca", "Bullas", "Calasparra", "Campos del Río", "Caravaca de la Cruz", "Cartagena", "Cehegín",
      "Ceutí", "Cieza", "Fortuna", "Fuente Álamo de Murcia", "Jumilla", "Librilla", "Lorca", "Lorquí", "Mazarrón",
      "Molina de Segura", "Moratalla", "Mula", "Murcia", "Ojós", "Pliego", "Puerto Lumbreras", "Ricote", "San Javier",
      "San Pedro del Pinatar", "Santomera", "Torre-Pacheco", "Las Torres de Cotillas", "Totana", "Ulea", "La Unión",
      "Villanueva del Río Segura", "Yecla"
    ];
  }

  validateFields() {
    Object.keys(this.form.controls).forEach((controlName) => {
      const control = this.form.get(controlName);
      this.setFieldError(controlName, control?.invalid || false);
    });
    if (!this.checkErrors()) {
      this.submitForm();
    }
  }

  checkErrors() {
    return Object.values(this.fieldErrors).some(error => error);
  }

  setFieldError(fieldName: string, hasError: boolean) {
    this.fieldErrors[fieldName] = hasError;
  }

  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  stablishRequest(){
    const imagesData: FormData[] = [];
    // Obtener los archivos de la propiedad files del input file
    const files = (document.getElementById('carouselImages') as HTMLInputElement).files;
    if (files) {
      // Convertir los archivos a FormData
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('image', files[i]);
        imagesData.push(formData);
      }
    }
  
    this.request = {
      profileImage: this.form.get('profileImage')?.value,
      name: this.form.get('name')?.value,
      gender: this.form.get('gender')?.value,
      species: this.form.get('species')?.value,
      imageCarousel1: imagesData[0] || null,
      imageCarousel2: imagesData[1] || null,
      imageCarousel3: imagesData[2] || null,
      shelter: this.form.get('shelter')?.value,
      location: this.form.get('location')?.value,
      size: parseInt(this.form.get('size')?.value),
      birthDate: this.form.get('birthDate')?.value,
      description: this.form.get('description')?.value,
      goodWithKids: this.form.get('goodWithKids')?.value,
      goodWithDogs: this.form.get('goodWithDogs')?.value,
      goodWithCats: this.form.get('goodWithCats')?.value,
    };
  }


  submitForm() {
    if (!this.areAllStepsValid()) {
      console.log('Not all steps are valid');
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());
    this.stablishRequest(); 
    console.log('Request stablished...');
    console.log('Request object:', this.request); 
    this.shelterPaticasService.addPatica(this.request)
    .pipe()
      .subscribe({
        next: () => {
          console.log('Patica created...');
          this.router.navigate(['/shelterPaticas']);
        },
        error: (error) => {
          console.error('Error occurred while adding patica:', error);
        },
        complete: () => {
          console.log('Patica added successfully');
        }
      });
  }
  

  

  getMaxDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
  
    if (files && files.length > 0) {
      if (files.length > this.maxImages) {
        alert(`Solo se permiten subir un máximo de ${this.maxImages} imágenes.`);
        return;
      }
  
      const preview = document.getElementById('imagePreview');
      if (preview) {
        preview.innerHTML = ''; // Limpiamos cualquier previsualización anterior
      }
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(img.src); // Liberamos la URL de objeto
          };
          img.src = e.target.result;
          img.classList.add('img-thumbnail', 'm-1');
          img.style.width = '200px';
          img.style.height = 'auto';
          if (preview) {
            preview.appendChild(img);
          }
        };
  
        reader.readAsDataURL(file);
      }
    }
  }
  

}
