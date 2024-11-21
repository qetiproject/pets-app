import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPet } from '@app/core/models';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent {
  @Input() pettoDelete!: IPet;

  @Output() OnConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  OnConfirmationBtmClicked(value: boolean){
    this.OnConfirmation.emit(value);
  }

}