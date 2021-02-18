import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  empresaForm: FormGroup;
  correoForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })
    this.correoForm = this.fb.group({
      puerto: ['', [Validators.required]],
      host: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  guardarEmpresa() {
    if (this.empresaForm.invalid) {
      // tslint:disable-next-line: forin
      for (const i in this.empresaForm.controls) {
        this.empresaForm.controls[i].markAsDirty();
        this.empresaForm.controls[i].updateValueAndValidity();
      }
      return;
    }
  }
  guardarConfigCorreo() {
    if (this.correoForm.invalid) {
      // tslint:disable-next-line: forin
      for (const i in this.correoForm.controls) {
        this.correoForm.controls[i].markAsDirty();
        this.correoForm.controls[i].updateValueAndValidity();
      }
      return;
    }
  }
}
