/**
 * @author ddaninthe
 */

import { Column } from "typeorm";

export abstract class CommonEntity {
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column({ default: true })
    enabled: boolean;
}