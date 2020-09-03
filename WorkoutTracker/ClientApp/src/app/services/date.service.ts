import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private months = {
    1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun',
    7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
  };

  toShortFormat(dateString: string) {
    let datePortion = dateString.split('T')[0];
    let year = datePortion.split('-')[0];
    let month = this.months[parseInt(datePortion.split('-')[1])];
    let day = datePortion.split('-')[2];
    return `${month} ${day}, ${year}`;
  }

}
