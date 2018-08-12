import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var Sass: any;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private compiledThemeSource = new BehaviorSubject<string>('');
  private themeVariablesSource = new BehaviorSubject<string>('');
  private variablesMapSource = new BehaviorSubject<{ [key: string]: string }>({});
  $compiledTheme = this.compiledThemeSource.asObservable();
  $themeVariables = this.themeVariablesSource.asObservable();
  $variablesMap = this.variablesMapSource.asObservable();

  constructor() {
    this.mapImports();
    this.loadFiles();
  }

  loadFiles() {
    Sass.preloadFiles('./assets/sass', '', ['_theming.scss', 'theme-variables.scss', 'theme-output.scss'], function() {
      Sass.compileFile('theme-output.scss', function(res) {
        //el.nativeElement.innerHTML = `<style>${res.text}</style>`;
        this.compiledThemeSource.next(res.text);
      });
    });
  }

  setScssVariables(variableMap: { [key: string]: string }) {
    this.variablesMapSource.next(variableMap);
    this.modifyTheme(variableMap);
  }

  private modifyTheme(variableMap: { [key: string]: string }) {
    //const color = e.target.value;
    
    Sass.readFile('theme-variables.scss', function(content) {
      //const changed = content.replace(/\$color:[^;]*/, `$color: ${color}`);
      let changed = content;

      for (let scssVar in variableMap) {
        const regex = new RegExp(`\\$${scssVar}:[^;]*`);
        changed = changed.replace(regex, `$${scssVar}: ${variableMap[scssVar]}`);
      }

      Sass.writeFile('theme-variables.scss', changed, () => {
        Sass.compileFile('theme-output.scss', (res) => {
          this.themeVariablesSource.next(changed);
          this.compiledThemeSource.next(res.text);
          // textArea.nativeElement.value = changed;
          // el.nativeElement.innerHTML = `<style>${res.text}</style>`;
        });
      });
    });
  }

  private mapImports() {
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
  }
}
