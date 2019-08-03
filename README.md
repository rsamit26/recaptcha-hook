# recaptcha-hook ![Language](https://img.shields.io/npm/v/recaptcha-hook)

[`recaptcha-hook`](https://www.npmjs.com/package/recaptcha-hook) is a JavaScript library that lets you easily integrate google recaptcha. `recaptcha-hook` uses react hook to create recaptcha component.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save recaptcha-hook


## Get reCAPTCHA sitekey 
Go to [`reCAPTCHA`](https://www.google.com/recaptcha/intro/v3.html) and click on `Admin console` and configure your requirements. After saving all information
you will get `sitekey` and `secret key`. Copy the `site key` and use in the recaptcha-hook component.


```js
// using ES6
import ReCaptcha from 'recaptcha-hook';

<ReCaptcha
        elementID={'je'}
        siteKey={'xxxxxxxx'}
        verifyCallback={verifyCallback}
        onloadCallback={() => console.log('loaded')}
          />
```
