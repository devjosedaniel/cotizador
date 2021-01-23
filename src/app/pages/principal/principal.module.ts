import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';
import { ComponentsModule } from '../../components/components.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [PrincipalComponent],
  imports: [PrincipalRoutingModule, CommonModule, ComponentsModule],
  exports: [PrincipalComponent],
})
export class PrincipalModule {}
