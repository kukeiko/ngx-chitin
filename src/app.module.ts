import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { splitIntoModuleFriendly } from "utils";
import { App } from "./app";

// import * as CORE from "./core";

const ALL = splitIntoModuleFriendly([
    // ...Object.values(CORE)
]);

@NgModule({
    id: "APP",
    imports: [
        // ngx modules
        BrowserModule,
        CommonModule,
        RouterModule,

        // routes
        RouterModule.forRoot([], { useHash: true }),

        // our modules
        ...ALL.modules
    ],
    declarations: [App],
    bootstrap: [App]
})
export class AppModule { }