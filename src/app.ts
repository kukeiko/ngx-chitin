import { Component } from "@angular/core";

import "./styles/sandbox.scss";

@Component({
    selector: "app",
    template: require("./app.html")
})
export class App {
    async ngOnInit(): Promise<void> {

    }
}
