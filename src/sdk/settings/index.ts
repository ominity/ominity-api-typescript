/*
 * SDK module: Settings
 */

import { ClientSDK } from "../../lib/sdks.js";
import { Countries } from "./countries.js";
import { SocialProviders } from "./social-providers.js";
import { PaymentMethods } from "./payment-methods.js";

export { Countries } from "./countries.js";
export { SocialProviders } from "./social-providers.js";
export { PaymentMethods } from "./payment-methods.js";

export class Settings extends ClientSDK {
    private _countries?: Countries;
    private _socialProviders?: SocialProviders;
    private _paymentMethods?: PaymentMethods;

    get countries(): Countries {
        return (this._countries ??= new Countries(this._options));
    }

    get socialProviders(): SocialProviders {
        return (this._socialProviders ??= new SocialProviders(this._options));
    }

    get paymentMethods(): PaymentMethods {
        return (this._paymentMethods ??= new PaymentMethods(this._options));
    }
}
