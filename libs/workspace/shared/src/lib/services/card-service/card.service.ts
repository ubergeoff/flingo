import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { ICard } from '../../interfaces/card.interface';

@Injectable()
export class CardService {
    private array: ICard[] = [];

    createCard(title) {
        this.array.push({
            id: uuid(),
            title: title
        });
    }

    allCards() {
        return this.array;
    }

    remove(card: any) {
        const index = this.array.indexOf(card);
        if (index > -1) {
            this.array.splice(index, 1);
        }

        return this.array;
    }

    findCard(id: string) {
        return this.array.find((t) => t.id === id);
    }
}
