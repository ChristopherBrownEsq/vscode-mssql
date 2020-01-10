/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
import * as path from 'path';
import * as LocalizedConstants from '../constants/localizedConstants';

/**
 * Empty Node shown when no queries are available
 */
export class EmptyHistoryNode extends vscode.TreeItem {

    private static readonly contextValue = 'emptyHistoryNode';

    constructor() {
        super(LocalizedConstants.msgNoQueriesAvailable, vscode.TreeItemCollapsibleState.None);
        this.contextValue = EmptyHistoryNode.contextValue;
    }
}

/**
 * Query history node
 */
export class QueryHistoryNode extends vscode.TreeItem {

    private static readonly contextValue = 'queryHistoryNode';
    private readonly iconsPath: string = path.join(__dirname, 'icons');
    private readonly successIcon: string = path.join(this.iconsPath, 'status_success.svg');
    private readonly failureIcon: string = path.join(this.iconsPath, 'status_error.svg');
    private _ownerUri: string;
    private _timeStamp: string;
    private _isSuccess: boolean;

    constructor(label: string, tooltip: string, ownerUri: string, isSuccess: boolean) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this._ownerUri = ownerUri;
        this._timeStamp = new Date().toUTCString();
        this._isSuccess = isSuccess;
        this.iconPath = isSuccess ? this.successIcon : this.failureIcon;
        this.tooltip = tooltip;
        this.contextValue = QueryHistoryNode.contextValue;
    }

    /** Getters */
    public get historyNodeLabel(): string {
        return this.label;
    }

    public get ownerUri(): string {
        return this._ownerUri;
    }
}
