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
  @ViewChild('paletteScss') paletteScss: ElementRef;

  ngAfterViewInit() {
    const el = this.styleRef;

    Sass.importer((request, done) => {
      if (request.current === '~@angular/material/theming') {
        done({
          path: '/sass/_theming'
        })
      } else {
        // let libsass handle the import
        done();
      }
    });

    Sass.preloadFiles('./assets/sass', '', ['_theming.scss', 'theme-variables.scss', 'theme-output.scss'], function() {
      Sass.compileFile('theme-output.scss', function(res) {
        el.nativeElement.innerHTML = `<style>${res.text}</style>`;
      });
    });
  }

  changeColor(e: any) {
    const el = this.styleRef;
    const textArea = this.paletteScss;
    const color = e.target.value;
    
    Sass.readFile('theme-variables.scss', function(content) {
      const changed = content.replace(/\$color:[^;]*/, `$color: ${color}`);

      Sass.writeFile('theme-variables.scss', changed, () => {
        Sass.compileFile('theme-output.scss', (res) => {
          textArea.nativeElement.value = changed;
          el.nativeElement.innerHTML = `<style>${res.text}</style>`;
        });
      });
    });
  }
}
