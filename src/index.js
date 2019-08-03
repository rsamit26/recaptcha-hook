import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const isReady = () => typeof window !== 'undefined'
    && typeof window.grecaptcha !== 'undefined'
    && typeof window.grecaptcha.render === 'function';

let readyCheck;

function ReCaptcha({
                       siteKey, className = 'g-recaptcha',
                       elementID = 'g-recaptcha',
                       onloadCallback = undefined,
                       onloadCallbackName = 'onloadCallback',
                       verifyCallback = undefined,
                       verifyCallbackName = 'verifyCallback',
                       expiredCallback = undefined,
                       expiredCallbackName = 'expiredCallback',
                       render = 'explicit', theme = 'light',
                       type = 'image', recaptchaVariant = 'normal',
                       tabindex = '0', badge = 'bottomright'
                   }) {

    const [ready, setReady] = useState(isReady());
    let recaptchaWidget;
    if (!ready && typeof window !== 'undefined') {
        readyCheck = setInterval(_updateReadyState, 1000);
    }

    useEffect(() => {
        if (render === 'explicit' && onloadCallback && ready) {
            loadRecaptcha();
        }
        return () => {
            clearInterval(readyCheck);
        }
    }, [loadRecaptcha]);

    function _updateReadyState() {
        if (isReady()) {
            setReady(true);
            clearInterval(readyCheck);
        }
    }

    function loadRecaptcha() {

        recaptchaWidget = window.grecaptcha.render(elementID, {
            sitekey: siteKey,
            callback: (verifyCallback) ? verifyCallback : undefined,
            theme: theme,
            type: type,
            recaptchaVariant: recaptchaVariant,
            tabindex: tabindex,
            badge: badge,
            'expired-callback': (expiredCallback) ? expiredCallback : undefined,
        });
        if (onloadCallback) {
            onloadCallback();
        }
    }

    if (render === 'explicit' && onloadCallback) {
        return (
            <div id={elementID}
                 data-onloadcallbackname={onloadCallbackName}
                 data-verifycallbackname={verifyCallbackName}
            />
        );
    }
    return (
        <div
            id={elementID}
            data-site-key={siteKey}
            data-theme={theme}
            data-variant={recaptchaVariant}
            data-badge={badge}
            className={className}
            data-tabindex={tabindex}
        />
    );
}

ReCaptcha.propTypes = {
    className: PropTypes.string,
    elementID: PropTypes.string,
    onloadCallbackName: PropTypes.string,
    verifyCallbackName: PropTypes.string,
    expiredCallbackName: PropTypes.string,
    onloadCallback: PropTypes.func,
    verifyCallback: PropTypes.func,
    expiredCallback: PropTypes.func,
    siteKey: PropTypes.string,
    type: PropTypes.string,
    tabindex: PropTypes.string,
    render: PropTypes.oneOf(['onload', 'explicit']),
    recaptchaVariant: PropTypes.oneOf(['invisible', 'compact', 'normal']),
    theme: PropTypes.oneOf(['light', 'dark']),
    badge: PropTypes.oneOf(['bottomright', 'bottomleft', 'inline'])
};

export default ReCaptcha;