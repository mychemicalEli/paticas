import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { AddPaticaRequest } from '../models/add-patica/add-patica.request';

@Component({
  selector: 'app-add-patica',
  templateUrl: './add-patica.component.html',
  styleUrls: ['./add-patica.component.css']
})
export class AddPaticaComponent implements OnInit {
  maxImages = 3;
  request: AddPaticaRequest= {}  as AddPaticaRequest;
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
    // Aquí deberías obtener la lista de municipios desde tu servicio o de otra fuente de datos
    // Por simplicidad, la inicializaré directamente aquí
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

  submitForm() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Submitting form...');
    console.log('Form value:', this.form.value);
    // Continue with form submission

    this.shelterPaticasService.addPatica(this.request); // Envía la solicitud de creación al servicio
    console.log('patica created...');
    this.router.navigate(['/shelterPaticas']);
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
  
      const imagesArray = this.form.get('carouselImages') as any;
      imagesArray.setValue(files); // Setea el valor del campo con el arreglo de archivos
  
      const preview = document.getElementById('imagePreview');
      if (preview) {
        preview.innerHTML = '';
      }
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const img = document.createElement('img');
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
