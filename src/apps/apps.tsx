import { App as M2mUsersFrontManageApp } from "./m2m-users-front-manage/src/App";
import { customElement } from "lit-element";
import { rc2wc } from "../rc2wc";

@customElement("m2m-users-front-manage-app")
export class ReactFrame extends rc2wc(M2mUsersFrontManageApp) {}
