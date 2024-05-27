import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    ConfirmPopupModule,
    FieldsetModule,
    DividerModule,
    SplitButtonModule,
    TableModule,
    OverlayPanelModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    ImageModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    DialogModule,
    InputTextareaModule,
    InputNumberModule,
    ConfirmPopupModule,
    FieldsetModule,
    DividerModule,
    SplitButtonModule,
    TableModule,
    OverlayPanelModule,
    FormsModule
  ]
})
export class PrimeNGModule { }
