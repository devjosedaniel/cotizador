import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.cargarRecuerdame();
  }
  usuario = new Usuario();
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usuario: [this.usuario.usuario, [Validators.required]],
      password: [this.usuario.password, [Validators.required]],
      recuerdame: [this.usuario.recuerdame],
    });
  }
  submitForm(): void {
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.usuario = this.validateForm.value;
    this.recuerdame();
  }
  async recuerdame() {
    const res = this.validateForm.value.recuerdame;
    await localStorage.removeItem('recuerdame');
    if (res) {
      await localStorage.setItem('recuerdame', JSON.stringify(this.usuario));
    } else {
      await localStorage.setItem(
        'recuerdame',
        JSON.stringify({ recuerdame: false })
      );
    }
  }
  async cargarRecuerdame() {
    this.usuario =
      JSON.parse(await localStorage.getItem('recuerdame')) || new Usuario();
  }
}
