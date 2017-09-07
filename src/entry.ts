import "core-js";
import "zone.js";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

window.onload = () => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(e => {
        console.error(e);
    });
};
