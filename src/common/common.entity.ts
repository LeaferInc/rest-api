/**
 * @author ddaninthe
 */

import { Column } from "typeorm";

export abstract class CommonEntity {
    @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ default: true })
    enabled: boolean;
}