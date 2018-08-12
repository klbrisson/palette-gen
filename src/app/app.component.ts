import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var Sass: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'palette-gen';
  @ViewChild('styleRef') styleRef: ElementRef;

  ngAfterViewInit() {
    const el = this.styleRef;

    Sass.importer((request, done) => {

      if (request.path) {
        // Sass.js already found a file,
        // we probably want to just load that
        done();
      } else if (request.current === '~@angular/material/theming') {
        done({
          path: '/sass/_theming'
        })
      } else {
        // let libsass handle the import
        done();
      }
    });

    Sass.preloadFiles('./assets/sass', '', ['_theming.scss', 'theme-input.scss'], function() {
      Sass.listFiles(function(files) {
        console.log('list after preload files', files);
      });

      Sass.compileFile('theme-input.scss', function(res) {
        el.nativeElement.innerHTML = `<style>${res.text}</style>`;
      });
    });
  }

  changeColor(e: any) {
    const el = this.styleRef;
    const color = e.target.value;
    
    Sass.readFile('theme-input.scss', function(content) {
      const changed = content.replace(/\$color:[^;]*/, `$color: ${color}`);
      Sass.compile(changed, (res) => {
        el.nativeElement.innerHTML = `<style>${res.text}</style>`;
      });
    });
  }
}
