// ==UserScript==
// @name         secret bathroom time
// @description  poof!
// @namespace    http://tampermonkey.net/
// @version      2026.03.02.2
// @author       You
// @match        https://*/*
// @match        http://*/*
// @icon         https://www.google.com/s2/favicons
// @grant        none
// ==/UserScript==


var DEBUG = 1;
var AGGRESSION = 6;



// SITES

// Adding a new site
//sites.push(new SiteClass('domain', true/false, ['class, id, data-name, element.attribute.value, element.text']) )

const sites = [];

function main (log, level = 0) {
    //sites.push(new SiteClass('domain', false, ['attrib']) )
    sites.push(new SiteClass('picazor.com', false, ['fixed top-0 left-0 right-0 z-[60] border-b dark:border-slate-700','modal-container justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[10002] bg-neutral-800/70 w-full h-full']) )
    sites.push(new SiteClass('xnxx.health', false, ['network']) )
    sites.push(new SiteClass('avday.vip', false, ['video-plan','https://avday.vip/activity']) )
    sites.push(new SiteClass('voyeurhit', false, ['storage.multstorage.com','footer','seo-text','seo-title','fh-wall','trialhd','btn__label','hardlink-btn','nopop','video-tube-friends','video-page__comments','outstream','header__cookie','header__popup','header__network','header__userpanel']) )
    sites.push(new SiteClass('abxxx', false, ['thumb has-video','show-more-link','thumbs-models','poloptrex','video-page-ad','ad__title','gfpl-wrapper','vpaid-frame','wrapper banner',]) )
    sites.push(new SiteClass('fapvid', false, ['w r-t desk type-5 show','desktop-banner','iframe-ht-native-under-player','block-videos-middle','Other free porn sites','tradeindex','uk-visible@l mx-auto mb-5','widget-container','wbar']) )
    sites.push(new SiteClass('liveporn.tv', false, ['Footer-footer-0-2-155 Footer-footer-d0-0-2-161','Footer-footer-0-2-124 Footer-footer-d0-0-2-130','HeaderWithSearch-buttonsWrapper-0-2-236 HeaderWithSearch-rightSideWrapper-0-2-235']) )
    sites.push(new SiteClass('pornhub.com', false, ['pb_top_bar','pb_iframe','resume_button','pb_top_bar','pb_block','mgp_overlayText','IFRAME','headerMenuContainer','extraRelatedVid','globalCookieBanner','sniperModeEngaged alpha','footerContentWrapper','networkBarWrapper','userActions','uploadBtnContent','empty_uBlock','xqrs8r xqrs8u hd clear wide','sideAds','hd clear wide','mgp_overlayText mgp_link mgp_noBorder mgp_closable','mgp_adRollTitle','js_promoItem','emptyBlockSpace','jw2mlosg1f','qkzg4lt7p9gykjuquf','mod1f','h96nxmahdgr72m210uf','wtpjxy9iq25y5rgczrkbf','ngbfuussnwf','hd clear original','sectionWrapper topTrendingPornstars','under-player-comments','headerUpgradePremiumBtn','photoComments','profileStream','customSkin']) )
    sites.push(new SiteClass('pornlib.com', false, ['lc-block','aside_content','lcams2','spot_video_livecams2']) )
    sites.push(new SiteClass('redgifs.com', false, ['cky-consent-bar','adSideBar','Button Button_tertiary Button_s aTab']) )
    sites.push(new SiteClass('xhamster.com', false, ['promo-messages-unpin','video-comments','lv-red','xplayer-ads-block__footer','tv-inner-container','ts-init','video-share-button','report-button','banner-underplayer','promo-messages-wrapper','sponsor-banner','top-menu-container','login-section','cookiesAnnounce','footer-wrapper','under-comments','bottom-widget-section','player-hover-menu','premium-n-overlay','pauseSpotContainer','xp-aftershot','lcplayer']) )
    sites.push(new SiteClass('xvideos', false, ['video-overlay','tabComments','thread-video-comments','thumb-ad','tabComments_bottom_page','video-ad','video-overlay-title','video-sponsor-links','tab-button','live-cams','head__menu-line__main-menu__lvl1 ignore-popunder','botLinks','remove-ads','report-search','slogan','red-ticket','nutaku-games','profileslist','nutaku','livecams','red-videos','premium-free-switch-premium','header-right','tooltip-menu','site-language','site-localisation','site-main-cat','ex-over-top ex-opened','video-title','ad-footer','header-mobile-right','video-right']) )

}




class SiteClass {
    constructor(domain = 'generic', strict_domain_match = true, fuzzy = []) {
        this.domain = domain;
        this.strict_domain_match = strict_domain_match;
        this.fuzzy = fuzzy;
    }

    async hide_fuzzy() {

        function attributesContainsString(tag, string) {
            // check the element.attributes if it contains the string //

            var attributes = tag.attributes;
            if (attributes === undefined) {return false;}

            var attrList = Array.from(attributes);
            for (var attrItem in attrList) {

                var attr = attrList[attrItem];
                var value = attr.value;
                debug(`[tampermonkey] :: hide_fuzzy :: attributesContainsString :: value :: ${tag.attributes} :: ${value}`, 4);

                if (typeof(value) === undefined) {continue;}

                if (value.includes(string)) {
                    debug(`[tampermonkey] :: hide_fuzzy :: attributesContainsString :: FOUND :: ${string} :: ${value}`, 3);
                    return true;}}

            return false;}


        function textContainsString(tag, string) {
            // check the element.text if it contains the string //

            var check_text = tag.text;
            var check_innerText = tag.innerText;
            var check_textContent = tag.textContent;
            var check_simpleText = tag.simpleText;

            let textCheck = [
                check_text,
                check_simpleText,
                check_textContent,
                check_innerText,
            ]

            var foundText = undefined;
            for (var check of textCheck) {
                if (check !== undefined) {
                    foundText = check;
                    break;
                }
            }

            if (foundText === undefined) {return false;}

            if (foundText === string) {
                debug(`[tampermonkey] :: hide_fuzzy :: textContainsString :: FOUND :: ${string} :: ${foundText}`, 3);
                return true;}

            return false;}


        function styleContainsString(tag, string) {
            // check the element.style if it contains the string //

            var check_cssText = tag.style.cssText;

            if (check_cssText === "") {return false;}

            if (typeof(check_cssText) === 'string') {
                if (check_cssText.includes(string)) {
                    debug(`[tampermonkey] :: hide_fuzzy :: styleContainsString :: FOUND :: ${string} :: ${check_cssText}`, 3);
                    return true;}
            }

            return false;}

       function clearEventListeners(tag) {
            // Create a deep copy that is clean of addEventListener bindings
            const cleanClone = tag.cloneNode(true);
            // Replace the old element in the DOM with the new, clean one
            tag.parentNode.replaceChild(cleanClone, tag);

            debug(`[tampermonkey] :: hide_fuzzy :: clearEventListeners :: cleared :: ${tag.localName}`, 4);
            return cleanClone;
       }


        // this does the removing //
        if (this.fuzzy.length > 0) {
            const allTags = Array.from(document.body.getElementsByTagName("*"));
            const checkPromises = [];

            for (const tag of allTags) {

                //    We wrap the inner loop logic here
                const tagCheckOperation = async () => {

                    //const tagClean = clearEventListeners(tag);
                    const tagClean = tag;

                    for (const fuzzyName of this.fuzzy) {
                        if (attributesContainsString(tagClean, fuzzyName) || textContainsString(tagClean, fuzzyName) || styleContainsString(tagClean, fuzzyName)) {
                            debug(`[tampermonkey] :: ${ this.domain } :: removed :: ${tagClean.localName} :: ${fuzzyName}`, 1);
                            tagClean.remove();
                            // Optional: Break the inner loop as soon as we find a match for this tag
                            break;
                        }
                    }
                };

                checkPromises.push(tagCheckOperation());
            }

            await Promise.all(checkPromises);
        }

    }


    hide() {
        debug(`[tampermonkey] :: hide :: started`, 4);

        if (this.strict_domain_match) {
            if (! document.domain.includes(this.domain)) {
                return;}
        }

        this.hide_fuzzy();
    }

}



function debug (log, level = 0) {
    if (level <= DEBUG) {
        console.log(`${log}`)}}


(function() {
    'use strict';

    main();

    // Periodically call hide() on each SiteClass instance
    async function hideAllSites(sites) {
        await Promise.all(sites.map(site => site.hide()));
    }

    if (AGGRESSION === 1) {
        hideAllSites(sites).catch(console.error);
    }

    if (AGGRESSION === 2) {
        window.navigation.addEventListener("navigate", () => {
            hideAllSites(sites).catch(console.error);
        });

        window.addEventListener('scroll', function() {
            hideAllSites(sites).catch(console.error);
        });
    }

    if (AGGRESSION === 5) {
        const intervalId = setInterval(() => {
            hideAllSites(sites).catch(console.error);
        }, 2000);
        setTimeout(() => {
            clearInterval(intervalId);
            debug(`[tampermonkey] :: done`)
        }, 8000);
    }

    if (AGGRESSION === 6) {

        window.addEventListener('scroll', function() {
            hideAllSites(sites).catch(console.error);
        });

        window.navigation.addEventListener("navigate", () => {
            hideAllSites(sites).catch(console.error);
        });

        const intervalId = setInterval(() => {
            hideAllSites(sites).catch(console.error);
        }, 2000);
        setTimeout(() => {
            clearInterval(intervalId);
            debug(`[tampermonkey] :: done`)
        }, 4000);
    }

    if (AGGRESSION === 7) {
        setInterval(() => {
            hideAllSites(sites).catch(console.error);
            debug(`[tampermonkey] :: done`)
        }, 5000);
    }

    if (AGGRESSION === 8) {
        setInterval(() => {
            hideAllSites(sites).catch(console.error);
            debug(`[tampermonkey] :: done`)
        }, 1000);
    }

    if (AGGRESSION === 10) {
        const observer = new MutationObserver(function(mutationsList, observer) {
            hideAllSites(sites).catch(console.error);
            debug(`[tampermonkey] :: done`)
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (AGGRESSION === 11) {
        setInterval(() => {
            hideAllSites(sites).catch(console.error);
        }, 250);
    }

    if (AGGRESSION === 12) {
        const intervalId = setInterval(() => {
            hideAllSites(sites).catch(console.error);
        }, 250);
        setTimeout(() => {
            clearInterval(intervalId);
            debug(`[tampermonkey] :: done`)
        }, 8000);
    }

})();
