import { Component, OnInit, ViewChild } from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';

@Component({
  selector: 'app-popper',
  templateUrl: './popper.component.html',
  styleUrls: ['./popper.component.css']
})
export class PopperComponent implements OnInit {

  @ViewChild('popper') popper;

  popperInstance: Instance = null;
  message: string = "";

  constructor() {
  }

  ngOnInit() {
  }

  create(target, message): void {
    if (this.popperInstance) {
      return;
    }

    this.message = message;
    setTimeout(() => {
      this.popper.nativeElement.setAttribute('data-show', '');
      this.popperInstance = createPopper(target, this.popper.nativeElement, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    }, 100);
    setTimeout(() => { this.destroy(); }, 3000);
  }

  destroy(): void {
    if (!this.popperInstance) {
      return;
    }

    this.popper.nativeElement.removeAttribute('data-show');
    setTimeout(() => {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }, 300);
  }
}
