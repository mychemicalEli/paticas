import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShelterPaticasService } from '../shelter-paticas-service/shelter-paticas.service';
import { Router } from '@angular/router';
import { UserService } from '../../auth/user-service/user.service';

@Component({
  selector: 'app-add-patica',
  templateUrl: './add-patica.component.html',
  styleUrls: ['./add-patica.component.css']
})
export class AddPaticaComponent implements OnInit {
  userRole: string = ''; 
  maxImages = 3; 
  form!: FormGroup; 
  imageSelected = false;
  url: any = '';

  constructor(
    private shelterPaticasService: ShelterPaticasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],

      species: ['', Validators.required],
      size: ['', Validators.required],

      description: ['', Validators.required],
      goodWithKids: ['', Validators.required],
      goodWithDogs: ['', Validators.required],
      goodWithCats: ['', Validators.required],
      carouselImages: ['', Validators.required],
      profileImage: [null, Validators.required] 
    }, {
      validator: this.imageValidator('profileImage') 
    });
  }

  imageValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (!control.value || (control.value instanceof FileList && control.value.length === 0)) {
        control.setErrors({ 'required': true });
      }
    };
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageSelected = true;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
      this.form.get('profileImage')?.setValue(file);
    }
  }

  delete() {
    this.url = null;
    this.form.get('profileImage')?.setValue(null);
  }
  
  stablishRequest(): FormData {
    const formData = new FormData();
  
    const file = this.form.get('profileImage')?.value;
    if (file) {
      formData.append('profileImage', file);
    }
  
    formData.append('name', this.form.get('name')?.value);
    formData.append('gender', this.form.get('gender')?.value);
    formData.append('species', this.form.get('species')?.value);
  
    const files = (document.getElementById('carouselImages') as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < Math.min(files.length, this.maxImages); i++) {
        formData.append(`imageCarousel${i + 1}`, files[i]);
      }
    }
  
    formData.append('size', this.form.get('size')?.value);
  
    const birthDate = this.form.get('birthDate')?.value;
    const formattedDate = this.formatDate(birthDate);
    formData.append('birthDate', formattedDate);
  
    formData.append('description', this.form.get('description')?.value);
    formData.append('goodWithKids', this.form.get('goodWithKids')?.value);
    formData.append('goodWithDogs', this.form.get('goodWithDogs')?.value);
    formData.append('goodWithCats', this.form.get('goodWithCats')?.value);
    formData.append('shelterId', '10');
    formData.append('liked', 'false');
  
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    return formData;
  }

  formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  // Verifica si todos los pasos del formulario son válidos
  areAllStepsValid(): boolean {
    return this.form.valid;
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Submitting form...');
    console.log('Are all steps valid:', this.areAllStepsValid());
  
    const formData = this.stablishRequest();
    console.log('Request stablished...');
  
    this.shelterPaticasService.addPatica(formData)
      .subscribe({
        next: () => {
          console.log('Patica created...');
          this.router.navigate(['/shelterPaticas']);
          alert("Patica creada correctamente!");
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
        preview.innerHTML = '';
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(img.src);
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
