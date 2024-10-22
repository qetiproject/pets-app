import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent {
  @Input() title: string = "";
  @Output() deleteConfirmed = new EventEmitter<void>();

  confirmDelete(): void {
    this.deleteConfirmed.emit();
  }

}
