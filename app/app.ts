///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

@Component({
    selector: 'myapp',
    template: `
        <h1>Angular 2 app inside a desktop app</h1>
        bla bla
        <div class="navbar-collapse collapse navbar-responsive-collapse">
        <ul class="nav navbar-nav">
            <li class="active"><a href="#">Active</a>
            </li>
            <li><a href="#">Link</a>
            </li>
            <li class="disabled"><a href="#">Disabled</a>
            </li>
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    <li><a href="#">Action</a>
                    </li>
                    <li><a href="#">Another action</a>
                    </li>
                    <li><a href="#">Something else here</a>
                    </li>
                    <li class="divider"></li>
                    <li class="dropdown-header">Dropdown header</li>
                    <li><a href="#">Separated link</a>
                    </li>
                    <li><a href="#">One more separated link</a>
                    </li>
                    <li class="disabled"><a href="#">Disabled link</a>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#">username</a>
            </li>
            <li>
                <img src="https://comstrap-cdn.scapp.io/img/default_user.svg" alt="portrait" class="img-circle sc-img-user">
            </li>
        </ul>
    </div>
    `
})

export class AppComponent {}

bootstrap(AppComponent);
