import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorComponent } from './error/error.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NoInternetComponent } from './no-internet/no-internet.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  declarations: [ErrorComponent, NoInternetComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzAlertModule,
    NzResultModule,
    NzIconModule,
  ],
  exports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzAutocompleteModule,
    NzPageHeaderModule,
    NzNotificationModule,
    NzAlertModule,
    ErrorComponent,
    NzTableModule,
    NzDropDownModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NoInternetComponent,
    NzResultModule,
    NzIconModule,
    NzSelectModule,
    NzDividerModule,
    NzInputNumberModule,
    NzBadgeModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzTypographyModule,
    NzTagModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageModule,
    NzCardModule
  ],
})
export class ComponentsModule { }
