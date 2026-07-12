/*
 * SDK module: CMS
 */

import { ClientSDK } from "../../lib/sdks.js";
import { Components } from "./components.js";
import { Content } from "./content.js";
import { ContentTypes } from "./content-types.js";
import { Layouts } from "./layouts.js";
import { Pages } from "./pages.js";
import { Menus } from "./menus.js";

export { Components } from "./components.js";
export { Content } from "./content.js";
export { ContentTypes } from "./content-types.js";
export { Layouts } from "./layouts.js";
export { Pages } from "./pages.js";
export { Menus } from "./menus.js";

export class Cms extends ClientSDK {
    private _components?: Components;
    private _content?: Content;
    private _contentTypes?: ContentTypes;
    private _layouts?: Layouts;
    private _pages?: Pages;
    private _menus?: Menus;

    get components(): Components {
        return (this._components ??= new Components(this._options));
    }

    get content(): Content {
        return (this._content ??= new Content(this._options));
    }

    get contentTypes(): ContentTypes {
        return (this._contentTypes ??= new ContentTypes(this._options));
    }

    get layouts(): Layouts {
        return (this._layouts ??= new Layouts(this._options));
    }

    get pages(): Pages {
        return (this._pages ??= new Pages(this._options));
    }

    get menus(): Menus {
        return (this._menus ??= new Menus(this._options));
    }

    protected override _propagateLanguage(language: string | undefined): void {
        this._components?.setLanguage(language);
        this._content?.setLanguage(language);
        this._contentTypes?.setLanguage(language);
        this._layouts?.setLanguage(language);
        this._pages?.setLanguage(language);
        this._menus?.setLanguage(language);
    }
}
