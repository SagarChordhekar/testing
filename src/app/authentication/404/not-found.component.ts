import { Component, AfterViewInit , ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotfoundComponent implements AfterViewInit {
  ngAfterViewInit() {}
}
