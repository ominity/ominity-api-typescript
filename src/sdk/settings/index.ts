/*
 * SDK module: Settings
 */

import { ClientSDK } from "../../lib/sdks.js";
import { Countries } from "./countries.js";
import { SocialProviders } from "./social-providers.js";
import { PaymentMethods } from "./payment-methods.js";
import { CustomerGroups } from "./customer-groups.js";
import { PaymentMethodIssuers } from "./payment-method-issuers.js";
import { ConfiguredLanguages } from "./configured-languages.js";

export { Countries } from "./countries.js";
export { SocialProviders } from "./social-providers.js";
export { PaymentMethods } from "./payment-methods.js";
export { CustomerGroups } from "./customer-groups.js";
export { PaymentMethodIssuers } from "./payment-method-issuers.js";
export { ConfiguredLanguages } from "./configured-languages.js";

export class Settings extends ClientSDK {
    private _countries?: Countries;
    private _socialProviders?: SocialProviders;
    private _paymentMethods?: PaymentMethods;
    private _customerGroups?: CustomerGroups;
    private _paymentMethodIssuers?: PaymentMethodIssuers;
    private _languages?: ConfiguredLanguages;

    get countries(): Countries {
        return (this._countries ??= new Countries(this._options));
    }

    get socialProviders(): SocialProviders {
        return (this._socialProviders ??= new SocialProviders(this._options));
    }

    get paymentMethods(): PaymentMethods {
        return (this._paymentMethods ??= new PaymentMethods(this._options));
    }

    get customerGroups(): CustomerGroups { return (this._customerGroups ??= new CustomerGroups(this._options)); }
    get paymentMethodIssuers(): PaymentMethodIssuers { return (this._paymentMethodIssuers ??= new PaymentMethodIssuers(this._options)); }
    get languages(): ConfiguredLanguages { return (this._languages ??= new ConfiguredLanguages(this._options)); }

    protected override _propagateLanguage(language: string | undefined): void {
        this._countries?.setLanguage(language);
        this._socialProviders?.setLanguage(language);
        this._paymentMethods?.setLanguage(language);
        this._customerGroups?.setLanguage(language);
        this._paymentMethodIssuers?.setLanguage(language);
        this._languages?.setLanguage(language);
    }
}
