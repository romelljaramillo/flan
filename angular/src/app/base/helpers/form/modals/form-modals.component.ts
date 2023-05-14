import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-modals',
  styles: [''],
  template: `<div
    class="modal fade"
    id="form"
    tabindex="-1"
    aria-labelledby="formLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog  modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">formulario</h4>
          <button
            #Modal
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div class="modal-body">
          <app-form-fields></app-form-fields>
        </div>
      </div>
    </div>
  </div>`,
})
export class FormModalsComponent implements OnInit {
  @ViewChild('Modal') Modal!: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.Modal.nativeElement.click();
  }
}
