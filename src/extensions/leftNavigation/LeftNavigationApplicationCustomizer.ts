import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import styles from './LeftNavigationApp.module.scss';
import {AddNavigation} from './NavigationStuff'

import * as strings from 'LeftNavigationApplicationCustomizerStrings';

const LOG_SOURCE: string = 'LeftNavigationApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ILeftNavigationApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class LeftNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<ILeftNavigationApplicationCustomizerProperties> {
  private _topPlaceholder: any;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.log("Started");
    console.trace();

    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }
   // Wait for the placeholders to be created (or handle them being changed) and then
    // render.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    //Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    console.trace("HelloWorldApplicationCustomizer._renderPlaceHolders()");

    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
      }
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = "(Top property was not defined.)";
        }
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.top}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"> ${topString}
              </i>
            </div>
          </div>`;
        }
        AddNavigation();
      }

  }

  private _onDispose(): void {
    console.log('[LeftNavigationApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}


