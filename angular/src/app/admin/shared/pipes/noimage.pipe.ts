import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
  standalone: true
})
export class NoimagePipe implements PipeTransform {

  transform(image: unknown, ...args: unknown[]): unknown {
    if(!image){
      return 'assets/img/noimage.jpg';
    }
    return image;
  }

}