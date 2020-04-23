/**
 * @author ddaninthe
 */

import { EventEntity } from "../entity/event.entity";

export class EventDto {
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    price: number;
    maxPeople: number;
    latitude: number;
    longitude: number;
    organizer: number;

    /**
     * Convert the dto the entity
     */
    toEntity(): EventEntity {
        const event: EventEntity = new EventEntity();
        event.name = this.name;
        event.description = this.description;
        event.location = this.location;
        event.startDate = this.startDate;
        event.endDate = this.endDate;
        event.latitude = this.latitude;
        event.longitude = this.longitude;
        event.price = this.price;
        event.maxPeople = this.maxPeople;
        return event;
    }
}