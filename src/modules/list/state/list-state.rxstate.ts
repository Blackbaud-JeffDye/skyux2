import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from 'microedge-rxstate/dist';
import { ListStateAction } from './list-state-action.type';
import { ListItemsLoadAction } from './items/actions';

export class ListStateOrchestrator<T> extends StateOrchestrator<T, ListStateAction> {
}

@Injectable()
export class ListStateDispatcher extends StateDispatcher<ListStateAction> {


}
