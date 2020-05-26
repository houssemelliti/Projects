import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  template: `
<h1>Self-Contained Animation</h1>
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
          <mouse></mouse>
        </div>
    </div>
</div>
`,
  styles: [``]
})

export class ContainedComponent {}
