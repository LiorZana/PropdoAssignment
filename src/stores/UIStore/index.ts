import { Theme } from '@emotion/react';
// import { Breakpoint } from '@mui/material';
import { makeAutoObservable } from 'mobx';

class UIStore {
  private _theme: Theme = {} as Theme;
  constructor() {
    makeAutoObservable(this);
  }

  public get breakpoints() {
    return this._theme.breakpoints;
  }
  public setTheme(theme: Theme) {
    this._theme = theme;
  }
}

export default UIStore;
